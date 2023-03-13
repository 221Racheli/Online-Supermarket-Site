const productsDal=require("../dal/products-dal");


class ProductsContoller{

    getProducts=async(req,res)=>{
        const subCategoryId=req.params.subCategoryId;
        const productsBySubCategory=await productsDal.getProducts(subCategoryId);
        if (productsBySubCategory.length >0 )
            res.send(productsBySubCategory);
        else
            return res.status(400).json({massage:`No products for this ${subCategoryId} subCategory`})
    }

    getProductsById=async(req,res)=>{
        const orderId=req.query.orderId;
        const productsById=await productsDal.getProductsById(orderId);
        if (orderId.length>0)
            res.send(productsById);
        else
            return res.status(400).json({message:`No product with id ${productId}`});
    }

    getProductsBySearch=async(req,res)=>{
        const keyWord=req.query.keyWord;
        console.log(keyWord);
        const productsFromSearch = await productsDal.getProducstBySearch(keyWord);
        if (productsFromSearch.length >0)
            res.send(productsFromSearch)
        else
            return res.status(400).json({massage:`No products were found for your search, please try again`})
    }

    getSaleProducts=async(req,res)=>{
        var productsOnSale=await productsDal.getSaleProducts();
        if (productsOnSale.length>0)
            res.send(productsOnSale);
        else
            return res.status(400).json({message:`Sorry we have no products on sale`});

    }


}

const productsContoller = new ProductsContoller();
module.exports = productsContoller;
