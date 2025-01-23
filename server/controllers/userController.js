const userModel = require("../models/userModel");

// Login user
const loginController = async (req, res) => {
  try {
    //const { userId, password } = req.body;
    const userId = req.body.email;
    const password = req.body.password;
    console.log(req.body)

    if (!userId || !password) {
      return res.status(400).json({
        success: false,
        message: "User ID and password are required.",
      });
    }

    const user = await userModel.findOne({ userId, password, verified: true });

    if (user) {
      res.status(200).json({
        success: true,
        message: "Login successful.",
        data: user,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid credentials or account not verified.",
      });
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while logging in.",
    });
  }
};

// Register user
const registerController = async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({
        success: false,
        message: "User ID and password are required.",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ userId });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username already taken.",
      });
    }

    // Create new user
    const newUser = new userModel({ ...req.body, verified: true });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "New user added successfully!",
      data: newUser,
    });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred during registration.",
    });
  }
};

module.exports = {
  loginController,
  registerController,
};
