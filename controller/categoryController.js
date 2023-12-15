const Category = require("../models/categoryModel");

const createCategoryController = async (req, res) => {
  let { name, description } = req.body;

  let duplicateCategory = await Category.find({ name });

  if (duplicateCategory.length > 0) {
    return res.send({ error: "alredy exit this category" });
  }

  let category = new Category({
    name,
    description,
  });
  category.save();
  res.send({ Success: "category created succefully" });

  console.log(name, description);
};

const categoryStatusController = async (req, res) => {
  let { name, status } = req.body;

  let existCategory = await Category.find({ name });

  if (existCategory.length > 0) {
    if (status == "rejected" || status == "waiting") {
      await Category.findOneAndUpdate(
        { name },
        { $set: { isActive: false, status } },
        { new: true }
      );
      res.send({ Success: `Change status : ${status}` });
    } else if (status == "approved") {
      await Category.findOneAndUpdate(
        { name },
        { $set: { isActive: true, status } },
        { new: true }
      );
      res.send({ Success: `Change status : ${status}` });
    }
  } else {
    res.send({ error: "data not found" });
  }
};

module.exports = { createCategoryController, categoryStatusController };
