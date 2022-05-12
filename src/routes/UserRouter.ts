import express from 'express'
import {UserBusiness} from "../business/UserBusiness"
import {UserController} from "../controller/UserController"
import {UserDatabase} from "../data/UserDatabase"
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export const userRouter = express.Router()
const userBusiness = new UserBusiness( 
    new UserDatabase(),
    new Authenticator(),
    new HashManager(),
    new IdGenerator()
)

const userController = new UserController(
    userBusiness 
)
