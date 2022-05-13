import express from 'express'
import { UserBusiness } from "../business/UserBusiness"
import { UserController } from "../controller/UserController"
import { UserDatabase } from "../data/UserDatabase"

export const userRouter = express.Router()
const userBusiness = new UserBusiness(
    new UserDatabase(),
)

const userController = new UserController(
    userBusiness
)

userRouter.post("/signup", userController.signup)