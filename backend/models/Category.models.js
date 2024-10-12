const mongoose = require("mongoose");
const slugify = require("slugify");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Kategori adı"],
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);

CategorySchema.pre("save", async function (next) {
  if (!this.isModified("name")) next();

  this.slug = slugify(this.name).toLowerCase();
});

module.exports = mongoose.model("Category", CategorySchema);
