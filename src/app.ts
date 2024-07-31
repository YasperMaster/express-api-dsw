import express, { NextFunction, Request, Response } from "express";
import { User } from "./user/user.entity.js";

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

function sanitizeUserInput(req: Request, res: Response, next: NextFunction) {

    req.body.sanitizeUserInput = {
        name: req.body.name,
        email: req.body.email,
        pass: req.body.pass,
        birthdate: req.body.birthdate,
    }
    //faltan validaciones

    Object.keys(req.body.sanitizeUserInput).forEach(key => {
        if(req.body.sanitizeUserInput[key] === undefined){
        delete req.body.sanitizeUserInput[key]
        }
    })
    next()
}

app.get("/api/users", (req, res) => {
    res.json({data: users})
})

app.get("/api/users/:id", (req, res) => {
    const user = users.find((user) => user.id === req.params.id)
    if(!user){
       return res.status(404).send({ message:"User not found" })
    }
    res.json({data: user})
})

app.post("/api/users", sanitizeUserInput, (req, res) => {
    const input = req.body.sanitizeUserInput

    const user = new User (
        input.name, 
        input.email, 
        input.pass, 
        input.birthdate)

    users.push(user)
    return res.status(201).send({ message: "User created", data: user })
})

app.put("/api/users/:id", sanitizeUserInput, (req, res) => {
    const userIdx = users.findIndex((user) => user.id === req.params.id)
    
    if(userIdx === -1){
        return res.status(404).send({ message: "User not found" })
    }
    
    users[userIdx] = {...users[userIdx], ...req.body.sanitizeUserInput}

    return res.status(200).send({ message: "User updated succesfully" ,data: users[userIdx] })
})

app.patch("/api/users/:id", sanitizeUserInput, (req, res) => {
    const userIdx = users.findIndex((user) => user.id === req.params.id)
    
    if(userIdx === -1){
        return res.status(404).send({ message: "User not found" })
    }
    
    Object.assign (users[userIdx] , req.body.sanitizeUserInput)

    return res.status(200).send({ message: "User updated succesfully" ,data: users[userIdx] })
})

app.delete("/api/users/:id", (req, res) => {
    const userIdx = users.findIndex((user) => user.id === req.params.id)

    if(userIdx === -1){
        res.status(404).send({ message: "User not found" })
    }else {
    users.splice(userIdx, 1)
    res.status(200).send({ message: "User deleted succesfully" })
    }
})

app.use((req, res) => {
    res.status(404).send({ message: "Resource not found" })
})

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/")
})