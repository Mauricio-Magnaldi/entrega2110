import { Router } from "express"

const router = Router()

router.get('/', (request,response) => {
    response.render("login")
})

router.get('/signup', (request,response) => {
    response.render("signup")
})

router.get('/home', (request,response) => {
    console.log("Objeto request", request)
    const { email, first_name } = request.session
    response.render("home", {email, first_name})
})

export default router