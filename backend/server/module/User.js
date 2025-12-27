// backend/server/module/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // ایمیل باید منحصر به فرد باشد
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // فیلدهای createdAt و updatedAt
  }
);

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});                     


// 🌟 منطق مقایسه رمز عبور 🌟
// یک متد برای مقایسه رمز عبور وارد شده توسط کاربر با رمز هش شده در دیتابیس
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;
