const db = require('../models/index');
const Product = db.product;
const SubCategory = db.subcategory;
const OrderProducts = db.orderProducts
const { Op } = require('sequelize')


class ProductsDataAccessor {

    //checked 👍
    getProducts = async (subCategoryId) => {
        return await Product.findAll({
            where: {
                subCategory_id: subCategoryId
            }
        });
    }

    //checked 👍
    getProductsById = async (order_id) => {
        return await OrderProducts.findAll({
            where: {
                order_id: order_id
            }
        })
    }
    //checked 👍
    getProducstBySearch = async (keyWord) => {
        const res = await Product.findAll({
            where: {
                [Op.or]: [{ name: { [Op.like]: `%${keyWord}%` } },
                { company: { [Op.like]: `%${keyWord}%` } }]
            }
            // ,
            // include: {
            //     model: SubCategory,
            //     as: 'subcategory',
            //     where: {
            //       name: {
            //         [Op.like]: `%${keyWord}%`
            //       }
            //     }
            //   }
        })
        // res.push(
        //     await Product.findAll({
        //         include: [
        //             { model: SubCategory, as: 'subcategory', where: { name: { [Op.like]: `%${keyWord}%` } }, attributes: [] }
        //         ]
        //     }))
        console.log("*******************************************************************");
        console.log(res);
        return res;
    }

    //checked 👍
    getSaleProducts = async () => {
        return await Product.findAll({
            where: {
                sale: { [Op.gt]: 0 }
            }
        });
    }

    deleteProduct = async (productToDelete) => {
        return await Product.update({
            amount: productToDelete.quantity
        }, {
            where :{product_id: productToDelete.product_id},
        });

    }

    findAvailableAmountOfProducts = async (product_id) => {
        return await Product.findOne({
            attributes: ['amount'],
            where: {
                product_id: product_id
            }

        });
    }
}

const productsDataAccessor = new ProductsDataAccessor();
module.exports = productsDataAccessor;