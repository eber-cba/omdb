const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "por favor, agregue un nombre"],
      trim: true,
      unique: false,
      maxlength: [30, "los nombres solo pueden tener hasta 30 caracteres"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "por favor, agregá una contraseña."],
      unique: false,
    },
    email: {
      type: String,
      required: [true, "por favor agrega un email"],
      unique: [true, "ya existe una cuenta con este mail"],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "por favor, verifica un mail correcto",
      ],
    },
    creationDate: {
      type: Date,
    },
    salt: { type: String, default: "" },
  },
  { versionKey: false }
);
UserSchema.static("hash", function (password, salt) {
  return bcrypt.hash(password, salt);
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
