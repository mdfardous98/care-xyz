import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbname = "care_xyz";

export const collections = {
  SERVICES: "services",
  USERS: "users",
  BOOKINGS: "bookings",
};

// Check if URI exists 
if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const dbConnect = (cname) => {
  return client.db(dbname).collection(cname);
};
