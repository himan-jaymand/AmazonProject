// server/controllers/userController.js

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc    ثبت نام کاربر جدید
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res
      .status(400)
      .json({ message: "کاربری با این ایمیل از قبل وجود دارد." });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    // 🌟 ثبت نام موفق: ارسال اطلاعات کاربر و JWT 🌟
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id), // صدور توکن JWT
    });
  } else {
    res.status(400).json({ message: "داده‌های نامعتبر کاربر." });
  }
};
