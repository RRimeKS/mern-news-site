const slugify = require("slugify");
class APIFilter {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.aranan
      ? {
          $or: [
            {
              title: {
                $regex: slugify(this.queryStr.aranan, {
                  remove: /[*+~.()'"!:@]/g,
                  lower: true,
                  replacement: "-",
                }),
                $options: "i",
              },
            },
            {
              slug: {
                $regex: slugify(this.queryStr.aranan, {
                  remove: /[*+~.()'"!:@]/g,
                  lower: true,
                  replacement: "-",
                }),
                $options: "i",
              },
            },
            {
              fullname: {
                $regex: slugify(this.queryStr.aranan, {
                  remove: /[*+~.()'"!:@]/g,
                  lower: true,
                  replacement: "-",
                }),
                $options: "i",
              },
            },
          ],
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFilter;
