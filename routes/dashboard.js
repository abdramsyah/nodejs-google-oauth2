const express = require("express");
const router = express.Router();
const { Products, Users } = require("../models"); // Adjust the path as needed
const Op = require("sequelize").Op;

// Get list of products
router.get("/", async function (req, res, next) {
  try {
    const totalProducts = await Products.count();
    const totalProductsActive = await Products.count({
      where: { status: "ACTIVE" },
    });
    const totalUsers = await Users.count();
    const totalUsersActive = await Users.count({ where: { status: "ACTIVE" } });

    return res.status(200).json({
      code: 200,
      message: "Get list product success",
      data: {
        totalProducts,
        totalProductsActive,
        totalUsers,
        totalUsersActive,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
});

// Add a new product
router.post("/add", async function (req, res, next) {
  const { name, price, description } = req.body;

  try {
    const newProduct = await Products.create({ name, price, description });
    return res
      .status(201)
      .json({ message: "Product added successfully", data: newProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Edit an existing product
router.put("/edit/:id", async function (req, res, next) {
  const { id } = req.params;
  const { name, price, description } = req.body;

  try {
    const product = await Products.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product attributes
    product.name = name;
    product.price = price;
    product.description = description;

    await product.save();

    return res
      .status(200)
      .json({ message: "Product updated successfully", data: product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Soft delete a product
router.delete("/soft-delete/:id", async function (req, res, next) {
  const { id } = req.params;

  try {
    const product = await Products.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Soft delete by setting a flag
    product.deleted = true;

    await product.save();

    return res
      .status(200)
      .json({ message: "Product soft-deleted successfully", data: product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
