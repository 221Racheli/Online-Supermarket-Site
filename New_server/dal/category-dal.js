const db = require('../models/index');
const Category = db.category;
const subCategory = db.subcategory;



class CategoryDataAccessor {

    //checked 👍
    getAllCategories = async () => {
        console.log("getAllCategories ❤");
        const categories = await Category.findAll({
            include: { model: subCategory, as: 'subcategory' }
        });
        console.log(JSON.stringify(categories, null, 2));
        return categories;
    }

    //checked 👍
    getAllSubCategories = async (categoryId) => {
        console.log(categoryId);
        var subCategories = await subCategory.findAll({ where: { category_id: categoryId } });
        return subCategories;
    }

}

const categoryDataAccessor = new CategoryDataAccessor();
module.exports = categoryDataAccessor;