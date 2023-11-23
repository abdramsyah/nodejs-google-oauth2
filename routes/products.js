const express = require("express");
const router = express.Router();
const { Products } = require("../models"); // Adjust the path as needed
const Op = require("sequelize").Op;

// Get list of products
router.get("/get-list", async function (req, res, next) {
  try {
    console.log("++++++++++++++++++");
    // Ambil nilai parameter query, jika tidak ada, default ke nilai tertentu
    const take = parseInt(req.query.take) || 10;
    const skip = parseInt(req.query.skip) || 0;
    const search = req.query.search || "";
    console.log(search);
    console.log("++++++++++++++++++");
    const filter = {
      where: {
        deleted_at: null,
      },
      limit: take,
      offset: skip,
    };

    if (search) {
      filter.where.product_name = {
        [Op.iLike]: `%${search}%`,
      };
    }

    const data = await Products.findAll(filter);

    return res.status(200).json({
      code: 200,
      message: "Get list product success",
      data,
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
