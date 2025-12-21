const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI;
const dbname = "care_xyz";

export const collections = {
  SERVICES: "services",
  USERS: "users",
  BOOKINGS: "bookings",
};

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
