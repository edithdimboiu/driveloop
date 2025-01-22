import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    username: {
      type: String,
      unique: [true, "Username already exists"],
      required: [true, "Username is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);
export default User;
