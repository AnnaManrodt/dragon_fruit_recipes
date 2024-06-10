// Requring in models, bcrypt, jwt, path, and dotenv
const {User, Recipe, Review} = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require('path');
require("dotenv").config({path: path.join(__dirname, "../.env")})

// Function to create a token
async function createToken(user) {
  const tokenData = {email: user.email};
  const token = await jwt.sign(tokenData, process.env.TOKEN_ENCRYPT_KEY);
  return token;
};

// Exporting
module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const user = await User.find()
        .populate({path: "createdRecipes"})
        .populate({path: "savedRecipes"})
        .populate({path: "reviews"});
      res.status(200).json(user);
    } catch(err) {
      res.status(500).json({msg: "Get users: " + err.message});
    };
  },

  // Get single user
  async getUser(req, res) {
    try {
      const user = await User.findOne({_id: req.params.userId})
        .populate({path: "createdRecipes"})
        .populate({path: "savedRecipes"})
        .populate({path: "reviews"});
      if(!user) {
        return res.status(404).json({msg: "No user found with that ID"});
      };
      res.status(200).json(user);
    } catch(err) {
      res.status(500).json({msg: "Get user: " + err.message});
    };
  },

  // Get all saves
  async getSaves(req, res) {
    try {
      const user = await User.find({_id: req.params.userId})
        .populate({path: "savedRecipes"})
        .select("-_id savedRecipes");
      if(!user) {
        return res.status(404).json({msg: "No user found with that ID"});
      };
      res.status(200).json(user);
    } catch(err) {
      res.status(500).json({msg: "Get saves: " + err.message});
    };
  },

  // Get single save
  async getSave(req, res) {
    try {
      const user = await User.findOne({_id: req.params.userId})
        .populate({path: "savedRecipes", match: { _id: req.params.savedId }})
        .select("-_id savedRecipes");
      if(!user) {
        return res.status(404).json({msg: "No saved recipe found with that ID"});
      };
      res.status(200).json(user);
    } catch(err) {
      res.status(500).json({msg: "Get save: " + err.message});
    };
  },

  // Get all creates
  async getCreates(req, res) {
    try {
      const user = await User.findOne({_id: req.params.userId})
        .populate({path: "createdRecipes"})
        .populate({path: "reviews"})
        .select("-_id createddRecipes");
      if(!user) {
        return res.status(404).json({msg: "No user found with that ID"});
      };
      res.status(200).json(user);
    } catch(err) {
      res.status(500).json({msg: "Get creates: " + err.message});
    };
  },

  // Get single create
  async getCreate(req, res) {
    try {
      const user = await User.findOne({_id: req.params.userId})
        .populate({path: "createdRecipes"})
        .populate({path: "reviews"})
        .select("-_id createddRecipes");
      if(!user) {
        return res.status(404).json({msg: "No created recipe found with that ID"});
      };
      res.status(200).json(user);
    } catch(err) {
      res.status(500).json({msg: "Get create: " + err.message});
    };
  },

  // Create user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      const token = await createToken(user);
      res
        .status(200)
        .cookie("auth-cookie", token, {
          maxAge: 86400 * 1000, // 24 hour token
          httpOnly: false,
          secure: process.env.NODE_ENV === "production"
        })
        .json({user: user, status: "success"});
    } catch(err) {
      console.log(err)
      res.status(500).json({msg: "Create user: " + err.message});
    };
  },

  // Update user
  async updateUser(req, res) {
    try {
      let user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$set: req.body},
        {runValidators: true, new: true}
      );
      if(!user) {
        return res.status(404).json({msg: "No user found with that ID"});
      };
      if(req.body.password){
        user = await user.save();
      }
      res.status(200).json(user);
    } catch(err) {
      res.status(500).json({msg: "Update user: " + err.message});
    };
  },

  // Delete user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({_id: req.params.userId});
      if(!user) {
        return res.status(404).json({msg: "No user found with that ID"});
      };
      await Recipe.deleteMany({_id: {$in: user.createdRecipes}});
      await Review.deleteMany({_id: {$in: user.reviews}});
      await Recipe.findOneAndUpdate(
        {_id: req.params.userId},
        {$pull: user.savedRecipes},
        {runValidators: true, new: true}
      );
      res.status(200).json({msg: "User successfully deleted"})
    } catch(err) {
      res.status(500).json({msg: "Delete user: " + err.message});
    };
  },

  // Login user
  async loginUser(req, res) {
    try {
      let user = await User.findOne({username: req.body.username});
      if(!(await bcrypt.compare(req.body.password, user.password))) throw new Error();
      const token = await createToken(user);
      res
        .status(200)
        .cookie("auth-cookie", token, {
          maxAge: 86400 * 1000, // 24 hour token
          httpOnly: false,
          secure: process.env.NODE_ENV === "production"
        })
        .json({user: user, status: "success"})
    } catch(err) {
      res.status(500).json({msg: "Login user: " + err.message});
    };
  },

  // Verify user
  async verifyUser(req, res) {
    const cookie = req.cookies["auth-cookie"];
    if(!cookie) {
      return res.status(500).json({msg: "Could not authenticate user"});
    };
    const decryptedCookie = jwt.verify(cookie, process.env.TOKEN_ENCRYPT_KEY)
    const user = await User.findOne({email: decryptedCookie.email});
    if(!user) {
      return res.status(500).json({msg: "Could not authenticate user"});
    }
    res.status(200).json({msg: "Successfully verified", results: user});
  },

  // DELETE ALL USERS/RECIPES/REVIES
  async deleteAll(req, res) {
    try {
      await User.deleteMany({});
      await Recipe.deleteMany({});
      await Review.deleteMany({});
      res.status(200).json({ msg: "All users, recipes, and reviews successfully deleted" });
    } catch(err) {
      res.status(500).json({ msg: "Delete all: " + err.message });
    }
  }
};