const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')
const userModel = require('../models/user-model')

class UserService {
    async registration(login, email, password, birthday, cell, city, gender) {
        const candidate = await UserModel.findOne({ email })
        if (candidate != null) {
            throw ApiError.BadRequest('Користувач з адресом електроної пошти ' +
                email + ' вже існує')
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await UserModel.create({ login: login, email, password: hashPassword, birthday, cell, city, gender })
            // await mailService.sendActivationMail(email, process.env.API_URL + '/api/activate/' + activationLink)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async loginF(email, password) {
        const user = await UserModel.findOne({ email })
        if (!user) {
            throw ApiError.BadRequest('Користувач з даним email не був знайденим')
        }
        const isEquals = await bcrypt.compare(password, user.password)
        if (!isEquals) {
            throw ApiError.BadRequest('Неправильний пароль')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto })

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto })

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers() {
        const users = await UserModel.find()
        return users
    }
    
    async setAvatar(filePath, userData) {
        const filter = { _id: userData.id };
        let fileStr = filePath.replace("images\\", "")
        const updateDocument = {
           $set: {
              avatar: fileStr,
           },
        };
        const result = await UserModel.updateOne(filter, updateDocument);
        return result
    }
    
    async deleteUserById(userId) {
        userModel.deleteOne({ _id: userId })
    }
    
    async update(userData, login, email, cell, city, gender) {
        // userData.updateOne({login, email, cell, city, gender})
        const filter = { _id: userData.id };
        const updateDocument = {
           $set: {
              login,
              email,
              cell, 
              city,
              gender
           },
        };
        const result = await UserModel.updateOne(filter, updateDocument);
    }
    
    async getById(id) {
        const user = userModel.findOne({_id: id})
        return user
    }
}

module.exports = new UserService()