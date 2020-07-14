const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      res.status(400).json({
        error: "Category not found in DB",
      });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err || !category) {
      res.status(400).json({
        error: "Not able to save in DB ",
      });
    }
    res.json(category);
  });
};

exports.getAllCategories = (req, res) => {
  Category.find().exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "No Categories found",
      });
    }
    res.json(category);
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, updatedCategory) => {
    if (err || !category) {
      res.status(400).json({
        error: "Category not found in DB",
      });
    }
    return res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if (err) {
      res.status(400).json({
        error: "Failed to delete this category",
      });
    }
    res.json({
      message: " Seccessfully deleted " + category.name,
    });
  });
};
