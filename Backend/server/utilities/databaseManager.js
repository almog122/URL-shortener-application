const mongoose = require("mongoose");
const CONSTANTS = require("../config");

const connectToDb = function(){
    mongoose.connect(`${CONSTANTS.MONGO_DB_URL}${CONSTANTS.COLLECTION_NAME}`);
}

module.exports = {connectToDb}