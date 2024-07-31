import express from "express";
import { User } from "./user/user.entity.js";
import { UserRepository } from "./user/user.repository.js";
const app = express();
app.use(express.json());
const repository = new UserRepository();
const users = [
    new User('Tomas Yasparra', "tomas@gmail.com", "01/05/2001", "contrasenia123", 'a02b91bc-3769-4221-beb1-d7a3aeba7dad'),
];
function sanitizeUserInput(req, res, next) {
    req.body.sanitizeUserInput = {
        name: req.body.name,
        email: req.body.email,
        pass: req.body.pass,
        birthdate: req.body.birthdate,
    };
    //faltan validaciones
    Object.keys(req.body.sanitizeUserInput).forEach(key => {
        if (req.body.sanitizeUserInput[key] === undefined) {
            delete req.body.sanitizeUserInput[key];
        }
    });
    next();
}
app.get("/api/users", (req, res) => {
    res.json({ data: repository.findAll() });
});
app.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const user = repository.findOne({ id });
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    res.json({ data: user });
});
app.post("/api/users", sanitizeUserInput, (req, res) => {
    const input = req.body.sanitizeUserInput;
    const userInput = new User(input.name, input.email, input.pass, input.birthdate);
    const user = repository.add(userInput);
    return res.status(201).send({ message: "User created", data: user });
});
app.put("/api/users/:id", sanitizeUserInput, (req, res) => {
    req.body.sanitizeUserInput.id = req.params.id;
    const user = repository.update(req.body.sanitizeUserInput);
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({ message: "User updated succesfully", data: users });
});
app.patch("/api/users/:id", sanitizeUserInput, (req, res) => {
    req.body.sanitizeUserInput.id = req.params.id;
    const user = repository.update(req.body.sanitizeUserInput);
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({ message: "User updated succesfully", data: users });
});
app.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const user = repository.delete({ id });
    if (!user) {
        res.status(404).send({ message: "User not found" });
    }
    else {
        res.status(200).send({ message: "User deleted succesfully" });
    }
});
app.use((req, res) => {
    res.status(404).send({ message: "Resource not found" });
});
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/");
});
//# sourceMappingURL=app.js.map