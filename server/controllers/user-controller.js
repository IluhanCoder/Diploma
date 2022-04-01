const userService = require('../service/user-service')
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/api-error')
const Uuid = require('uuid')
const fs = require('fs')
const userModel = require('../models/user-model')
const multer = require('multer')
const tokenService = require('../service/token-service')
const { contextsKey } = require('express-validator/src/base')

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Помилка валідації', errors.array()))
            }
            const {login, email, password, birthday, cell, city, gender } = req.body
            const userData = await userService.registration(login, email, password, birthday, cell, city, gender)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.status(200).json(userData)
        } catch (error) {
            next(error)
        }
    }

    async loginF(req, res, next) {
        try {
            const { email, password } = req.body
            const userData = await userService.loginF( email, password )
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.status(200).json(userData)
        } catch (error) {
            next(error)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (error) {
            next(error)
        }
    }

    async activate(req, next, res) {
        try {

        } catch (error) {
            next(error)
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers()
            return res.json(users)
        } catch (error) {
            next(error)
        }
    }
    
    async setAvatar(req, res, next){
        try {
            const tokenBearer = (req.headers["authorization"]).split(" ")
            const token = tokenBearer[1]
            const file = req.file
            if(req.file) {
                const user = tokenService.validateAccessToken(token)
                userService.setAvatar(file.path, user)
                res.json(file)
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({message: 'Set avatar error'})
        }
    }
    
    async deleteAvatar(req, res){
        try {
            console.log(req.body)
            const user = await userModel.findById(req.id)
            fs.unlinkSync(AVATAR_FILE_PATH + "\\" + avatarName)
            user.avatar = null
            await user.save()
            return res.json(user)
        } catch (error) {
            console.log(error)
            return res.status(400).json({message: 'Delete avatar error'})
        }
    }
    
    async deleteUser(req, res, next){
        try {
            const id = req.params.id
            userService.deleteUserById(id)
            return res.status(200)
        } catch (error) {
            next(error)
        }
    }
    
    async update(req, res, next){
        try {
            const tokenBearer = (req.headers["authorization"]).split(" ")
            const token = tokenBearer[1]
            const user = tokenService.validateAccessToken(token)
            const {login, email, cell, city, gender} = req.body
            userService.update(user, login, email, cell, city, gender)
        } catch (error) {
            next(error)
        }
    }
    
    async eventInvite(req, res, next){
        try {
            const {userId, eventName} = req.body
            userService.eventInvite(userId, eventName)
        } catch (error) {
            next(error)
        }
    }
    
    async getById(req, res, next){
        try {
            const userId = req.params.id
            const user = await userService.getById(userId)
            return res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()