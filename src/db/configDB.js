import mongoose from "mongoose"

const URI = "mongodb+srv://mongoDBAtlas:CZK39urZQ0G2UOv9@mycluster.ovaat6g.mongodb.net/session?retryWrites=true&w=majority"

mongoose
    .connect(URI)
    .then(() => console.log("Conectado a la bd."))
    .catch(error => console.log("No conectado a la bd. ",error))


