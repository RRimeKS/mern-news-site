const News = require("../models/News.models");
const Category = require("../models/Category.models");

const slugify = require("slugify");
const cloudinary = require("cloudinary").v2;
const CatchAsyncHandler = require("../middlewares/CatchAsyncHandler");
const ErrorHandler = require("../utils/ErrorHandler");
const APIFilter = require("../utils/ApiFilter");

exports.getNews = CatchAsyncHandler(async (req, res, next) => {
  let apiFilter = new APIFilter(News, req?.query).search();
  const news = await apiFilter.query
    .sort({ createdAt: -1 })
    .populate("category");
  res.status(200).json({ count: news?.length, news });
});
exports.getNewsDetails = CatchAsyncHandler(async (req, res, next) => {
  const { slug } = req?.params;

  let news = await News.findOne({ slug }).populate("category");
  if (!news) return next(new ErrorHandler("Haber Bulunamadı.", 404));

  if (!req.cookies[`viewed_${news?._id}`]) {
    await news.updateOne({ $inc: { viewCount: 1 } });
    await news.save();

    // Tarayıcıya bu haberin görüntülendiğini kaydetmek için cookie gönder
    return res
      .status(200)
      .cookie(`viewed_${news?._id}`, true, { maxAge: 24 * 60 * 60 * 1000 })  // 1 gün geçerli cookie
      .json({ news });
  }

  res.status(200).json({ news });
});
exports.getNewsCategory = CatchAsyncHandler(async (req, res, next) => {
  const { category } = req.params;
  const categoryData = await Category.findOne({slug: category});
  
  if (!categoryData) {
    return next(new ErrorHandler("Kategori bulunamadı", 404));
  }

  const news = await News.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $match: {
        "category.slug": category,
      },
    },
  ]);
  
  res.status(200).json({ news });
});
exports.getPopularNews = CatchAsyncHandler(async (req, res, next) => {
 const news = await News.find().sort({viewCount: -1}).limit(8).populate("category");
  res.status(200).json({ news });
});

//ADMIN
exports.getNewsAdmin = CatchAsyncHandler(async (req, res, next) => {
  const resPerPage = 10;
  const page = req?.query?.page || 1;
  const skip = resPerPage * (page - 1);
  try {
    const totalCount = await News.countDocuments();
    let apiFilter = new APIFilter(
      News.find().limit(resPerPage).skip(skip).populate("category"),
      req?.query
    ).search();
    const news = await apiFilter.query;
    res.status(200).json({ page, totalCount, pageCount: news.length, news });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
});
exports.createNews = async (req, res, next) => {
  const { title, subtitle, content, images, category, tags } = req?.body;

  let news = await News.create({
    title,
    subtitle,
    content,
    category,
    tags,
  });

  if (images) {
    const uploadCloudinary = await cloudinary.uploader.upload(images, {
      folder: "news",
      format: "jpg",
    });

    const cloudUrl = uploadCloudinary.url.toString();
    const [left, right] = cloudUrl.split("/upload");
    let url = `${left}/upload/h_1080,w_1920${right}`;

    await news.images.push({ public_id: uploadCloudinary.public_id, url: url });
    await news.save();
  }
  res.json({ message: "Haber eklendi", news });
};
exports.updateNews = CatchAsyncHandler(async (req, res, next) => {
  const { id } = req?.params;
  const { title, subtitle, content, images, category, tags } = req?.body;
  let news = await News.findById(id);
  if (!news) return next(new ErrorHandler("Haber Bulunamadı.", 404));

  if (images !== news?.images[0]?.url) {
    await cloudinary.uploader.destroy(news?.images[0]?.public_id);

    const uploadCloudinary = await cloudinary.uploader.upload(images, {
      folder: "news",
      format: "jpg",
    });
    const cloudUrl = uploadCloudinary.url.toString();
    const [left, right] = cloudUrl.split("/upload");
    let url = `${left}/upload/h_1080,w_1920${right}`;

    news.images = { public_id: uploadCloudinary.public_id, url };
    await news.save();
  }

  news = await News.findByIdAndUpdate(id, {
    title,
    subtitle,
    content,
    category,
    tags,
  });

  await news.save();
  res.status(200).json({ news });
});
exports.deleteNews = CatchAsyncHandler(async (req, res, next) => {
  const { id } = req?.params;

  let news = await News.findById(id);
  if (!news) return next(new ErrorHandler("Haber Bulunamadı.", 404));

  await news.deleteOne();
  res.status(200).json({ news });
});
