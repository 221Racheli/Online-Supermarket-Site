const db = require('../models/index');
const Review = db.review;

class ReviewsDataAccessor{


//checked 👍   
addReview=async(customer_id,content)=>{
    return await Review.create({
        customer_id:customer_id,
        content:content,
        status:"handling"
    });
}

//checked 👍  
getAllReviews=async(customer_id)=>{
    return await Review.findAll({
        where:{
            customer_id:customer_id
        }
    })
}

//checked 👍  
getReviewById=async(review_id)=>{
    return await Review.findOne({
        where:{
            review_id:review_id
        }
    })
}
}



const reviewsDataAccessor = new ReviewsDataAccessor();
module.exports = reviewsDataAccessor;