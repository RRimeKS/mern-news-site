const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Ad Soyad"],
    },
    email: {
      type:String,
      unique: true,
      require: true
    },
    password: {
      type: String,
      require:true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  { timestamps: true }
);

//Parolayı hashle
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 10);
});
//Parolayı çöz
UserSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}
//JWT oluştur
UserSchema.methods.getJWToken = async function() {
  const token = jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {expiresIn: "7"});
  return token;
}
module.exports = mongoose.model("User", UserSchema);
