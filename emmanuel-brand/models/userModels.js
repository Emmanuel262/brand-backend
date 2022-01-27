import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please enter full names"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    // validate: [validator.isEmail(), "Please enter a valid email."],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 character"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 character"],
  },
});

// fire a function before doc saved to d

userSchema.pre("save", async function (next) {
  // const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect Email or password");
  }
  throw Error("incorrect email or password");
};

const User = mongoose.model("User", userSchema);
export default User;
