const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const Op = require("sequelize").Op;

router.post("/login", async function (req, res, next) {
  const { identifier, password } = req.body;

  try {
    const user = await Users.findOne({
      where: {
        [Op.or]: [{ full_name: identifier }, { phone: identifier }],
      },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    user.is_login = true;
    await user.save();

    req.person = {
      id: user.id,
      full_name: user.full_name,
      status: user.status,
      is_login: user.is_login,
    };

    return res
      .status(200)
      .json({ message: "Login successful", data: req.person });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/logout/:userId", async function (req, res, next) {
  const userId = req.params.userId;

  try {
    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.is_login = false;
    await user.save();

    return res.status(200).json({
      message: "Logout successful",
      data: {
        id: user.id,
        full_name: user.full_name,
        status: user.status,
        is_login: user.is_login,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
