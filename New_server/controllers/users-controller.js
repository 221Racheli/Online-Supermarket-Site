const usersDal = require("../dal/users-dal");
const mail = require("../utils/email");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
class UsersContoller {

    logIn = async (req, res) => {
        const { user_name, password } = req.body
        if (!user_name || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        const foundUser = await usersDal.logIn(user_name);
        if (!foundUser /*|| !foundUser.active*/) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const match = await bcrypt.compare(password, foundUser.password)
        if (!match) return res.status(401).json({ message: 'Unauthorized' })
        const userInfo = { customer_id: foundUser.customer_id, user_name: foundUser.user_name, first_name: foundUser.first_name, last_name: foundUser.last_name, email: foundUser.email, address: foundUser.address,phone_number1:foundUser.phone_number1,phone_number2:foundUser.phone_number2 }
        const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
        res.json({ accessToken: accessToken })

    }

    // getPasssword=async(req,res)=>{
    //     var email=req.query.email;
    //     var password=await usersDal.getPasssword(email);
    //     res.send(password)

    // }
    register = async (req, res) => {
        // try{
        const { first_name, last_name, user_name, password, email, phone_number1, phone_number2, address } = req.body;
        if (!first_name || !last_name || !user_name || !password || !email || !phone_number1 || !address)
            return res.status(400).json({ message: 'All fields are required' })
        else {
            const duplicate = await usersDal.checkIfExists(user_name)
            if (duplicate) {
                return res.status(409).json({ message: "Duplicate user_name !!!!" })
            }
            else {
                const hashedPwd = await bcrypt.hash(password, 10);
                const addedUser = await usersDal.register(first_name, last_name, user_name, hashedPwd, email, phone_number1, phone_number2, address)
                console.log(addedUser);
                if (addedUser) {
                    mail.sentMail(`hi ${JSON.stringify(addedUser.first_name)}! \n Account added succefully! `, 'Sending Email using Node.js server - Your user', addedUser.email);
                    const userInfo = { customer_id: addedUser.customer_id, user_name: addedUser.user_name, first_name: addedUser.first_name, last_name: addedUser.last_name, email: addedUser.email, address: addedUser.address ,phone_number1:addedUser.phone_number1,phone_number2:addedUser.phone_number2}
                    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
                    return res.status(201).json({ accessToken: accessToken });
                }
                else {
                    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                    return res.status(400).json({ message: 'Invalid user data received' })
                }
            }
        }
        // }
        // catch(error){
        //     if(error.name=="SequelizeUniqueConstraintError"){
        //         res.status(400).json({ message: `duplicate ${error.errors.message}`})
        //     }
        //     else
        //     res.status(500).json({ message: error })
        // }

    }

    getPersonalDetails = async (req, res) => {
        res.send(req.user);
    }

    updatePersonalDetails = async (req, res) => {
        const { first_name, last_name, user_name, email, phone_number1, phone_number2, address } = req.body;
        const detailsToUpdate = { first_name, last_name, user_name, email, phone_number1, phone_number2, address }
        await usersDal.updatePersonalDetails(req.user.customer_id, detailsToUpdate);
        res.send("updated successfully");
    }

}

const usersContoller = new UsersContoller();
module.exports = usersContoller;
