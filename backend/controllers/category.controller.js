const Category = require("../models/Category.models");

const slugify = require("slugify");
const CatchAsyncHandler = require("../middlewares/CatchAsyncHandler");
const ErrorHandler = require("../utils/ErrorHandler");

exports.createCategory = async (req, res, next) => {
  const { name } = req?.body;
  let category = await Category.create({ name });

  res.json({ message: "Kategori eklendi", category });
};
exports.getCategory = CatchAsyncHandler(async (req, res, next) => {
  const category = await Category.find();
  res.json({ category });
});
exports.updateCategory = CatchAsyncHandler(async (req, res, next) => {
  const { id } = req?.params;
  const { name } = req?.body;

  let category = await Category.findById(id);
  if (!category) return next(new ErrorHandler("Kategori Bulunamadı.", 404));

  await category.updateOne({name, slug: slugify(name).toLowerCase()});
  await category.save();

  res.status(200).json({ category });
});
exports.deleteCategory = CatchAsyncHandler(async (req, res, next) => {
  const { id } = req?.params;

  let category = await Category.findById(id);
  if (!category) return next(new ErrorHandler("Kategori Bulunamadı.", 404));

  await category.deleteOne();
  res.status(200).json({ category });
});