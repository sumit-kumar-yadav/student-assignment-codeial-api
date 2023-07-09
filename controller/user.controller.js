import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

const signUpController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send("Error signing up");
  }
};

const signInController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).send("Incorrect Credentials");
    } else {
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        "jwt_secret_key",
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).send(token);
    }
  } catch (error) {
    res.status(500).send("Error signing in");
  }
};

export { signUpController, signInController };
