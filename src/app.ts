import express from "express";
import { User } from "./user.js";

const app = express()

const users = [
    new User(
        'Tomas Yasparra',
        "tomas@gmail.com",
        "01/05/2001",
        "pass123",
        'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
    ),
]

app.get("/api/users", (req, res) => {
    res.json(users)
})


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/")
})