import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    ResetpasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  {
    timestamps: true, //it will give you 2 field updatedAt, createdAt.
  }
);

//basically a middleware which runs before save.
//flag --> next() , it indicates the function is completed proceed
UserSchema.pre("save", async function (next) {
  //we don't write arrow function here

  // const hashedPass = await bcrypt.hash(this.password,10);

  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
