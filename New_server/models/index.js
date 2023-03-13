const {Sequelize} = require('sequelize');
const {sequelize} = require('./sequelize');
const { applyExtraSetup } = require('./extra_setup');

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.category = require('./category')
db.customer = require('./customer')
db.order = require('./order')
db.orderProducts = require('./orderProducts')
db.product = require('./product')
db.review = require('./review')
db.subcategory = require('./subcategory')

applyExtraSetup();

db.sequelize.sync({alter:true, force: false })
.then(() => {
    console.log('yes re-sync done!')
})

module.exports = db