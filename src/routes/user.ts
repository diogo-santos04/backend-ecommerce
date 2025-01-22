import express from "express";
import { createUser, deleteUser, getAllUsers, getUserData } from "../services/userServices";
import * as ApiController from "../../controllers/authApiController";
import { authenticateToken } from "../../middlewares/authMiddleware";
import { Auth } from "../../middlewares/auth";

const router = express.Router();

router.get("/ping", (req, res) => {
  res.json({ pong: true });
});

router.post("/register",  ApiController.register);
router.post("/login", ApiController.login);
router.get("/list",Auth, ApiController.list);
router.get("/getUser", authenticateToken, getUserData)

router.delete("/delete/:id", async (req, res) => {
  const id = Number(req.params.id);
  const deletedUser = await deleteUser(id);
  res.status(200).json(deletedUser);
});

export default router;
