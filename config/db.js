require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB URI
const uri = process.env.MONGODB_URI;

// 데이터베이스 연결 함수
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB에 연결되었습니다.');
  } catch (error) {
    console.error('MongoDB 연결 오류:', error);
    process.exit(1);
  }
};

// 연결 함수 export
module.exports = { connectDB };
