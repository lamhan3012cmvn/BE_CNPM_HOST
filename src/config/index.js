require('dotenv').config()
const configEnv = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  JWT_KEY: process.env.JWT_KEY,
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT
}


module.exports = configEnv