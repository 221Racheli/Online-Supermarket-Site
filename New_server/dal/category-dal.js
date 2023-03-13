const db = require('../models/index');
const Category = db.category;
const subCategory = db.subcategory;



class CategoryDataAccessor{
    
//checked 👍
    getAllCategories=async()=>{
        return await Category.findAll({});
    }

 //checked 👍
    getAllSubCategories=async(categoryId)=>{
        console.log(categoryId);
        var subCategories = await subCategory.findAll({where:{category_id: categoryId}});
        return subCategories;
    }


}

const categoryDataAccessor = new CategoryDataAccessor();
module.exports = categoryDataAccessor;