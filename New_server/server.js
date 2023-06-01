require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 3600

const usersRouter=require('./routes/users-router')
const ordersRouter=require('./routes/orders-router')
const productsRouter=require('./routes/products-router')
const categoryRouter=require('./routes/category-router')
const reviewsRouter=require('./routes/reviews-router')
// const authenticationRouter=require('./routes/authRoutes')

console.log(process.env.NODE_ENV)
app.use(cors(corsOptions))
app.use(express.urlencoded());
app.use(express.json())
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname,'public')))
//app.use('/', require('./routes/root'))

//returns home page
// app.use("/", (req, res) => {
    
//     res.send("response from helo app");
// });

app.use("/users",usersRouter );
app.use("/orders",ordersRouter );
app.use("/products",productsRouter);
app.use("/category",categoryRouter);
app.use("/reviews",reviewsRouter );
//app.use("/auth",authenticationRouter);

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('json')) 
    {
        res.json({ message: '404 Not Found' })
    } 
    else
    {
        res.type('txt').send('404 Not Found')
    }
})
    
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
