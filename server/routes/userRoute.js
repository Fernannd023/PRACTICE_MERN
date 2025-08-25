import express from "express";
import { getAllUsers, create, getUserById, updateUser, deleteUser } from "../controller/userController.js";

// Crear router
const route = express.Router();

route.post("/user", create);
route.get("/users", getAllUsers);
route.get("/user/:id", getUserById);
route.put("/update/user/:id", updateUser);
route.delete("/delete/user/:id", deleteUser);


export default route;