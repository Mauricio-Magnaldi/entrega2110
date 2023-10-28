import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt'

export const __dirname = dirname(fileURLToPath(import.meta.url));

//Utilizada en el registro
export const hashData = async (data) => {
    const hash = await bcrypt.hash(data, 10)
    return hash
}

//Utilizada en el login
export const compareData = async (data, hashData) => {
    return bcrypt.compare(data, hashData)
}