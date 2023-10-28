import { Router } from "express"
import { usersManager } from '../managers/usersManager.js'
import { compareData, hashData } from "../utils.js"

const router = Router()

/*
la forma en la cual se recibe desde el body el email y el password, luego se almacena el email en un archivo. File System 
*/ 
// router.post('/', (request, response) => {
//     const { email, password } = request.body
//     request.session["email"] = email
//     response.send("Usuario logueado.")
// })

//MongoDB

router.post('/login', async (request, response) => {
    const { email, password } = request.body
    const userDB = await usersManager.findByEmail(email)
    if(!userDB) {
        return response.json({error: 'Este email no existe'})
    }
    const comparePassword = await compareData(password, userDB.password)
    if(!comparePassword) {
        return response.json({error: "El email o el password no coinciden."})
    }
    request.session["email"] = email
    request.session["first_name"] = userDB.first_name
    request.session["isAdmin"] = email === "adminCoder@coder.com" && password === "adminCod3r123" ? true : false
    response.redirect("/home")
})

router.post('/signup', async (request, response) => {
    const { password } = request.body
    const hashedPassword = await hashData (password)
    const createdUser = await usersManager.createOne({...request.body, password: hashedPassword})
    response.status(200).json({mensaje: "Usuario creado", createdUser}) 
})

router.get('/logout', async (request, response) => {
    request.session.destroy(() => {
        response.redirect("/")
    })
})

export default router