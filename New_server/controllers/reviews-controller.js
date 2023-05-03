const reviewsDal=require("../dal/reviews-dal");


class ReviewsContoller{


    addReview=async(req,res)=>{
        console.log(req.user);
        const {content,status,dateOfCare}=req.body;
        const{customer_id:customer_id}=req.user;
        if (!customer_id || !content)
            return res.status(400).json({ message: 'All fields are required' })
        const newReview = await reviewsDal.addReview(customer_id,content);
        console.log(newReview);
        if(newReview)
            return res.status(201).json({ message: 'New review added',data:newReview});
        else
            return res.status(400).json({ message: 'Invalid review data received' });
    }

    getAllReviews=async(req,res)=>{
        const{customer_id:customer_id}=req.user;
        const reviews=await reviewsDal.getAllReviews(customer_id);
        if(reviews)
            res.send(reviews)
        else
            return res.status(400).json({ message: 'No reviews' });
    }

    getReviewsById=async(req,res)=>{
        const reviewId=req.params.id;
        const review=await reviewsDal.getReviewById(reviewId);
        if(review)
            res.send(review)
        else
            return res.status(400).json({ message: 'No reviews' }); 
    }
 }
    

const reviewsContoller = new ReviewsContoller();
module.exports = reviewsContoller;
