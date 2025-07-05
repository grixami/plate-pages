import bcrypt from "bcryptjs"

const saltRounds = 10

export default function HashString(text) {
    const salt = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(text, salt)
}