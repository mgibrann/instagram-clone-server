import bcrypt from "bcryptjs";
import UserModel from "../models/user.js";

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
    if (!passwordCorrect)
      return res.status(404).json({ message: "Password Incorrect!" });

    res.status(200).json({ result: oldUser });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};

export const signup = async (req, res) => {
  try {
    const dataForm = req.body;
    const oldUser = await UserModel.findOne({ email: dataForm.email });
    if (oldUser)
      return res.status(404).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(dataForm.password, 12);

    const result = await UserModel.create({
      email: dataForm.email,
      password: hashedPassword,
    });
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong!" });

    console.log(error);
  }
};
