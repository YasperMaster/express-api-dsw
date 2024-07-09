import express from "express";
import { User } from "./user.js";

const app = express()
app.use(express.json())

const users = [
    new User(
        'Tomas Yasparra',
        "tomas@gmail.com",
        "01/05/2001",
        "contrasenia123",
        'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
    ),
]

app.get("/api/users", (req, res) => {
    res.json({data: users})
})

app.get("/api/users/:id", (req, res) => {
    const user = users.find((user) => user.id === req.params.id)
    if(!user){
        res.status(404).send({ message:"User not found" })
    }
    res.json({data: user})
})

app.post("/api/users", (req, res) => {
    const { name, email, pass, birthdate } = req.body

    const user = new User (name, email, pass, birthdate)

    users.push(user)
    res.status(201).send({ message: "User created", data: user })
})

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/")
})