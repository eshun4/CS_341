const dotenv = require("dotenv");
dotenv.config({ path: '../../.env' });


const ENVIRONMENT_VARIABLES = {
    Database_Name:process.env.DB_NAME,
    Database_URI:process.env.DB_URI,
    Database_Collection_1:process.env.DB_COLLECTION_1,
    Database_Collection_2:process.env.DB_COLLECTION_2,
    Database_Collection_3:process.env.DB_COLLECTION_3,
    Database_Collection_4:process.env.DB_COLLECTION_4,
    Database_Collection_5:process.env.DB_COLLECTION_5,
    Database_PORT:process.env.PORT,
    Database_SECRET:process.env.SECRET,
    Database_SALT_ROUNDS:process.env.SALT_ROUNDS,
    Database_GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    Database_GOOGLE_PROJECT_ID:process.env.GOOGLE_PROJECT_ID,
    Database_GOOGLE_REDIRECT_URI:process.env.GOOGLE_REDIRECT_URI,
    Database_GOOGLE_JAVASCRIPT_ORIGINS:process.env.GOOGLE_JAVASCRIPT_ORIGINS,
    Database_GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
    Database_GOOGLE_AUTH_URI:process.env.GOOGLE_AUTH_URI,
    dATABASE_GOOGLE_AUTH_PROVIDER_X509_CERT_URL:process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
    Database_GOOGLE_AUTH_TOKEN_URI:process.env.GOOGLE_AUTH_TOKEN_URI,
};

module.exports = ENVIRONMENT_VARIABLES;

