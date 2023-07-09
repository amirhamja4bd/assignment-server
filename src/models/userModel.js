const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema(
    {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: [true, 'Email Required'], 
          unique: true,
        },
        password: {
          type: String,
          required: true,
        },
        photo: {
          type: String,
          default: 'https://i.ibb.co/pLPLX44/avataaars.png'
        },
        role:{
          type: Number,
          default: 0,
        },
    }, {timestamps: true , versionKey: false}
);

const User = mongoose.model("User", userSchema);
module.exports =User;