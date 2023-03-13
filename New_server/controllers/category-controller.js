const categoryDal=require("../dal/category-dal");


class CategoryContoller{

    //checked!
    getAllCategories=async(req,res)=>{
        var categories=await categoryDal.getAllCategories();
        if(categories.length > 0)
            res.send(categories);
        else
            return res.status(400).json({ message: `No Categories` })
        }

     //checked!
    getAllSubCategories=async(req,res)=>{
        var categoryId=req.params.categoryId;
        var subCategories=await categoryDal.getAllSubCategories(categoryId);
        console.log(subCategories.length);
        if(subCategories.length > 0 )
            res.send(subCategories);
        else
            return res.status(400).json({ message: `No subCategories to Category ${categoryId}` })
    }
}



const categoryContoller = new CategoryContoller();
module.exports = categoryContoller;