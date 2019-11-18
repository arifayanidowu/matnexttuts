const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Name is Required"
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email is required"
    },
    avatar: {
      type: String,
      required: "Avatar is required",
      default: "/images/profile-image.jpg"
    },
    following: [{ type: ObjectId, ref: "User" }],
    followers: [{ type: ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

const autoPopulateFollowingAndFollowers = function(next) {
  this.populate("following", "_id name avatar");
  this.populate("followers", "_id name avatar");
  next();
};

userSchema.pre("findOne", autoPopulateFollowingAndFollowers);

/* passportLocalMongoose takes our User schema and sets up a passport "local" authentication strategy using our email as the username field */
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

/* The MongoDBErrorHandler plugin gives us a better 'unique' error, rather than: "11000 duplicate key" */
userSchema.plugin(mongodbErrorHandler);

module.exports = User = mongoose.model("User", userSchema);
