"use server";
import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const getServices = async () => {
  const data = await dbConnect(collections.SERVICES).find().toArray();
  return data.map((d) => ({ ...d, _id: d._id.toString() }));
};

export const getSingleService = async (id) => {
  if (id.length !== 24) return null;
  const service = await dbConnect(collections.SERVICES).findOne({
    _id: new ObjectId(id),
  });
  return service ? { ...service, _id: service._id.toString() } : null;
};
