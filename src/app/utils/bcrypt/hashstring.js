import bcrypt from "bcryptjs"
import { BcryptSaltRounds } from "../setvalues"

export default function HashString(text) {
    const salt = bcrypt.genSaltSync(BcryptSaltRounds)
    return bcrypt.hashSync(text, salt)
}