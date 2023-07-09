import express from "express";
import { body } from "express-validator";
import {
  signUpController,
  signInController,
} from "../controller/user.controller.js";
import validateRoute from "../middleware/validation.js";

const router = express.Router();

// Sign-up route
router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
    body("avatar").optional().isURL().withMessage("Invalid avatar URL"),
  ],
  validateRoute,
  signUpController
);

// Sign-in route
router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRoute,
  signInController
);

export default router;
