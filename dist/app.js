import express from "express";
import { userRouter } from "./user/user.routes.js";
const app = express();
app.use(express.json());
app.use("/api/users", userRouter);
app.use((req, res) => {
    res.status(404).send({ message: "Resource not found" });
});
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/");
});
//# sourceMappingURL=app.js.map