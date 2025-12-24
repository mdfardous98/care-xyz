import dbConnect from "@/lib/mongoose";
import Service from "@/models/Service";

export async function getAllServices() {
  await dbConnect();

  const services = await Service.find({}).lean();
  return JSON.parse(JSON.stringify(services));
}

export async function getServiceById(id) {
  await dbConnect();

  const service = await Service.findOne({ _id: id }).lean();
  return service ? JSON.parse(JSON.stringify(service)) : null;
}
