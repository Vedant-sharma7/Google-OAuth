require("dotenv").config();

module.exports = {

    mongoDB:{
        MONGODB_URI: process.env.MONGODB_URI
    },

    google:{
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },

    session:{
        cookieKey: process.env.SESSION_SECRET
    }

};