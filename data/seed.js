require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const { MongoClient } = require('mongodb');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// AWS S3 설정
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;


// 이미지 파일을 S3에 업로드하는 함수
const uploadImageToS3 = async (filePath, fileName) => {
  const fileContent = fs.readFileSync(filePath);
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    const imageUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
    return imageUrl;
  } catch (error) {
    console.error('s3 업로드 중 오류 발생:', error);
  }
};

// MongoDB에 데이터 삽입하는 함수
const insertDataIntoMongoDB = async (data) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const result = await collection.insertOne(data);
    console.log(`MongoDB에 데이터가 성공적으로 삽입되었습니다. ID: ${result.insertedId}`);
  } catch (error) {
    console.error('MongoDB에 데이터 삽입 중 오류 발생:', error);
  } finally {
    await client.close();
  }
}

// CSV 파일을 처리하고 이미지 업로드 및 데이터베이스에 데이터 삽입
const processCSVAndUploadToDB = async () => {
  const parser = fs.createReadStream(path.join(__dirname, '/teenieping.csv')).pipe(parse({
    columns: true,
    delimiter: ',',
  }));

  for await (const row of parser) {
    try {
      const uploadResult = await uploadImageToS3(`images/${row.name}.png`, `${row.name}.png`);
      row.imageUrl = uploadResult;
      await insertDataIntoMongoDB(row);
    } catch (error) {
      console.error('데이터 처리 중 오류 발생:', error);
    }
  }

  console.log('CSV 파일 파싱 완료');
};

processCSVAndUploadToDB();
