import express from "express"
import cookieParser from "cookie-parser"
import handlebars from "express-handlebars"
import { __dirname } from "./utils.js"
import usersRouter from "./router/users.router.js"
import viewsRouter from "./router/views.router.js"
import session from "express-session"
import FileStore from "session-file-store"
import mongoStore from "connect-mongo"
import "./db/configDB.js"

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

//session file
// const fileStore = FileStore(session)
// app.use(
//     session({
//     secret: 'SESSIONSECRETKEY',
//     cookie: {
//         maxAge: 60 * 60 * 1000,
//     }, 
//     /* Si lo dejo hasta este renglon, la información se guardara solo en memoria */
//     /* A partir de store, guardare la información en archivo */
//     store: new fileStore(
//         {
//             path: __dirname + "/sessions",
//         })  
// }))

//session mongo
const URI = "mongodb+srv://mongoDBAtlas:CZK39urZQ0G2UOv9@mycluster.ovaat6g.mongodb.net/session?retryWrites=true&w=majority"

app.use(
     session({
     secret: 'SESSIONSECRETKEY',
     cookie: {
        maxAge: 60 * 60 * 1000,
     }, 
     // No utilizo con fileStore sino que con mongoStore
        store: new mongoStore(
         {
            mongoUrl: URI,
         })  
 }))



app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", __dirname + "/views")

app.use("/", viewsRouter)
app.use("/api/users", usersRouter)

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}.`)
})

