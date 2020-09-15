import dotenv from 'dotenv'

// Fetch the enviroments variables from the file and set them into the code 
dotenv.config()

export default {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/little-shop',
    JWT_SECRET: process.env.JWT_SECRET || 'bPZNXWT1NMfltdVsh8770MCxq0edknt57RIeDcbF',
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
    ADMIN_USER_NAME: process.env.ADMIN_USER_NAME || 'Admin',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@admin.com',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "abcdefg",
    AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID || 'AWS_S3_ACCESS_KEY_ID',
    AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY || 'AWS_S3_SECRET_ACCESS_KEY',
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || 'AWS_S3_BUCKET_NAME'
}