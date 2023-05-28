const db = require('../models/index');
const Customer = db.customer;


class UsersDataAccessor{

//checked👍
logIn=async(user_name)=>{
    return await Customer.findOne({where:{user_name:user_name}})

}

// getPasssword=async(email)=>{//לשאול את המורה איך להחזיר
//     return await Customer.find({
//         where: {
//             email: email    
//         }
//     }) 
// }

//checked👍
register=async(first_name,last_name,user_name,password,email,phone_number1,phone_number2,address)=>{
    return await Customer.create({
        first_name:first_name,
        last_name:last_name,
        user_name:user_name,
        password:password,
        email:email,
        phone_number1:phone_number1,
        phone_number2:phone_number2,
        address: address
    })
}
getPersonalDetails=async(customer_id)=>{
    return await Customer.findOne({where:{customer_id:customer_id}}
)}
//checked👍
checkIfExists=async(user_name)=>{
    return await Customer.findOne({where:{user_name:user_name}})
}


//checked 👍
updatePersonalDetails=async(customer_id,detailsToUpdate)=>{
    await Customer.update(detailsToUpdate,{
        where:{customer_id:customer_id}}
)}

}



const usersDataAccessor = new UsersDataAccessor();
module.exports = usersDataAccessor;