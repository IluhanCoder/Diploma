const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");
const userModel = require("../models/user-model");
const eventService = require("./event-service");
const eventModel = require("../models/event-model");

class UserService {
  async registration(
    login,
    name,
    surname,
    email,
    password,
    birthday,
    cell,
    city,
    gender
  ) {
    const mailCandidate = await UserModel.findOne({ email });
    if (mailCandidate != null) {
      throw ApiError.BadRequest(
        "Користувач з адресом електроної пошти " + email + " вже існує"
      );
    }
    const loginCandidate = await UserModel.findOne({ login });
    if (loginCandidate != null) {
      throw ApiError.BadRequest("Користувач з логіном " + login + " вже існує");
    }
    const phoneCandidate = await UserModel.findOne({ cell });
    if (phoneCandidate != null) {
      throw ApiError.BadRequest(
        "Користувач з таким номером телефону вже існує"
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      login: login,
      name,
      surname,
      email,
      password: hashPassword,
      birthday,
      cell,
      city,
      gender,
    });
    // await mailService.sendActivationMail(email, process.env.API_URL + '/api/activate/' + activationLink)
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async loginF(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Користувач з даним email не був знайденим");
    }
    const isEquals = await bcrypt.compare(password, user.password);
    if (!isEquals) {
      throw ApiError.BadRequest("Неправильний пароль");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData._id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto._id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async setAvatar(filePath, userData) {
    const filter = { _id: userData._id };
    let fileStr = filePath.replace("images\\", "");
    const updateDocument = {
      $set: {
        avatar: fileStr,
      },
    };
    const result = await UserModel.updateOne(filter, updateDocument);
    return result;
  }

  async deleteUserById(userId) {
    await userModel.deleteOne({ _id: userId });
  }

  async update(
    userId,
    name,
    surname,
    login,
    email,
    cell,
    city,
    gender,
    desc,
    birthday
  ) {
    const filter = { _id: userId };
    const updateDocument = {
      $set: {
        name,
        surname,
        login,
        email,
        cell,
        city,
        gender,
        desc,
        birthday,
      },
    };
    const result = await UserModel.updateOne(filter, updateDocument);
  }

  async getById(id) {
    const user = userModel.findOne({ _id: id });
    return user;
  }

  async getAvatar(id) {
    const avatar = userModel.findOne({ _id: id }).select("avatar -_id");
    return avatar;
  }

  async getPropositions(propositions) {
    let proposData = [];
    propositions.map((proposition) => {
      const user = this.getById(proposition.userId);
      const event = eventService.getById(proposition.eventId);
      proposData.push({ user, event });
    });
    return proposData;
  }
}

module.exports = new UserService();
