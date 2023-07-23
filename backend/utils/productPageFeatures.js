class ProductPageFeatures {
  constructor(query, queryStr) {
    this.query = query; // Pass the Mongoose Model instance to the instance
    this.queryStr = queryStr;
  }
 
  search() {
      const keyword = this.queryStr.keyword
        ? {
            name: {
              $regex: this.queryStr.keyword,
              $options: "i",
            },
          }
        : {};

      console.log(keyword);
  
      this.query = this.query.find({ ...keyword });
      return this;
    }

    filter() {
      const queryCopy = { ...this.queryStr };
      console.log(queryCopy);
      //   Removing some fields for category
      const removeFields = ["keyword", "page", "limit"];
  
      removeFields.forEach((key) => delete queryCopy[key]);
      console.log(queryCopy);
  
      // Filter For Price and Rating
  
      let queryStr = JSON.stringify(queryCopy);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
     
  
      this.query = this.query.find(JSON.parse(queryStr));
      console.log(queryStr);
  
      return this;
    }

  
    pagination(productPerPage)
    {
      const activePage = Number(this.queryStr.page) || 1
       const skipProductsNo = productPerPage * (activePage - 1);

       // 6 *(2-1) = 6 skip hojain gi 

       //limit sets the limit like in controller jo set ki hai 
       this.query = this.query.limit(productPerPage).skip(skipProductsNo);
       

       return this;
    }
}
module.exports = ProductPageFeatures;
