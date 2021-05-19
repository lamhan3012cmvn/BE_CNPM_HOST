require('dotenv').config()
const configEnv = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  JWT_KEY: process.env.JWT_KEY,
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET
}


module.exports = configEnv