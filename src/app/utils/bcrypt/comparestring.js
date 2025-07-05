import bcrypt from "bcryptjs"

export default function CompareString(text, hash) {
    return bcrypt.compareSync(text, hash)
}