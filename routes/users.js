const express = require("express");
const router = express.Router();
const { Users } = require("../models");

// Get list of users
router.get("/get-list", async function (req, res, next) {
  try {
    const userList = await Users.findAll();
    return res
      .status(200)
      .json({ message: "Get list of users success", data: userList });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Add a new user
router.post("/add", async function (req, res, next) {
  const { full_name, email, phone, status, password } = req.body;

  try {
    const newUser = await Users.create({
      full_name,
      email,
      phone,
      status,
      password,
    });
    return res
      .status(201)
      .json({ message: "User added successfully", data: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Edit an existing user
router.put("/edit/:userId", async function (req, res, next) {
  const userId = req.params.userId;
  const { full_name, email, phone, status, password } = req.body;

  try {
    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user attributes
    user.full_name = full_name;
    user.email = email;
    user.phone = phone;
    user.status = status;
    user.password = password;

    await user.save();

    return res
      .status(200)
      .json({ message: "User updated successfully", data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get details of a user
router.get("/detail/:userId", async function (req, res, next) {
  const userId = req.params.userId;

  try {
    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User details retrieved successfully", data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/delete/:userId", async function (req, res, next) {
  const userId = req.params.userId;

  try {
    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = "INACTIVE";
    user.deleted_at = new Date();

    await user.save();

    return res
      .status(200)
      .json({ message: "User soft-deleted successfully", data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
