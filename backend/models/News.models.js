const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Haber başlığı"],
    },
    slug: {
      type: String,
    },
    subtitle: {
      type: String,
      required: [true, "Haber altbaşlığı"],
    },
    content: {
      type: String,
      required: [true, "Haber içeriği"],
    },
    images: [{
      public_id: {
        type: String,
        required: [true, "Haber resmi"],
      },
      url: {
        type: String,
        required: [true, "Haber resmi"],
      },
    }],
    viewCount: { type: Number, default: 0 },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Haber kategorisi"],
    },
    tags: String,
  },
  { timestamps: true }
);

NewsSchema.pre("save", async function (next) {
  if (!this.isModified("title")) next();

  this.slug = slugify(this.title, { remove: /[*+~.()'"!:@]/g, lower: true, replacement: "-" });
});

module.exports = mongoose.model("News", NewsSchema);
