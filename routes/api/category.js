const express = require("express");
const {
  createCategoryController,
  categoryStatusController,
} = require("../../controller/categoryController");
const router = express.Router();

router.use("/createCategory", createCategoryController);
router.use("/statusCategory", categoryStatusController);

module.exports = router;
