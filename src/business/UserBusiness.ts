import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "../error/CustomError";
import { SignupInputDTO, User } from "../model/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { USER_ROLES } from "../types/USER_ROLES";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase
    ) { }

    public signup = async (input: SignupInputDTO): Promise<string> => {
        const { name, email, password, role } = input

        const emailRegistered = await this.userDatabase.getUserByEmail(email)

        if (emailRegistered) {
            throw new CustomError(409, "Email já cadastrado")
        }

        if (email.indexOf("@") < 2) {
            throw new CustomError(422, "Email inválido")
        }

        if (!name || !email || !password || !role) {
            throw new CustomError(422, "Um ou mais campos vazios")
        }

        if (role !== USER_ROLES.NORMAL && role !== USER_ROLES.ADMIN) {
            throw new CustomError(422, "Campo 'role' deve ser ADMIN ou NORMAL")
        }

        const id: string = IdGenerator.generateId()

        const cypherPassword: string = HashManager.createHash(password)

        const user: User = new User(id, name, email, cypherPassword, role)

        await this.userDatabase.insertUser(user)

        const token: string = Authenticator.generateToken({ id, role })

        return token
    }
}