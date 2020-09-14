import dotenv from 'dotenv'

// Fetch the enviroments variables from the file and set them into the code 
dotenv.config()

export default {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/little-shop',
    JWT_SECRET: process.env.JWT_SECRET || 'bPZNXWT1NMfltdVsh8770MCxq0edknt57RIeDcbF',
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb'
}