import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.js";

const secret = "secret";

export const signin = async (req, res) => {
  const dataForm = req.body;
  try {
    const oldUser = await UserModel.findOne({ email: dataForm.email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const passwordCorrect = await bcrypt.compare(
      dataForm.password,
      oldUser.password
    );
    if (!passwordCorrect) {
      return res.status(404).json({ message: "Password Incorrect!" });
    }

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};

export const signup = async (req, res) => {
  const dataForm = req.body;
  console.log(dataForm);
  try {
    const oldUserByEmail = await UserModel.findOne({ email: dataForm.email });
    const oldUserByUsername = await UserModel.findOne({
      username: dataForm.username,
    });

    const message = {
      message: `${oldUserByEmail ? "Email" : "Username"} already exist!`,
    };
    if (oldUserByEmail || oldUserByUsername)
      return res.status(404).json(message);

    const hashedPassword = await bcrypt.hash(dataForm.password, 12);
    const result = await UserModel.create({
      username: dataForm.username,
      email: dataForm.email,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: dataForm.email, id: "13123" }, "secret", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong!" });
    console.log(error);
  }
};
