import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_LOCAL_URL);
    console.log(`connectd to Mogodb Database ${mongoose.connection.host}`);
    //mongoose.connection.host => it will show cluster(on cloud) or localhost (on local)
  } catch (error) {
    console.log(`MongoDb error ${error}`);
  }
};

export default connectDb;
