import { CreateThreadDto } from "../dto/threads-dto";
import { v2 as cloudinary } from "cloudinary";

class CloudinaryLibs {
  async uploadImage(dto: CreateThreadDto) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const upload = await cloudinary.uploader.upload(dto.image, {
      upload_preset: "circle-app",
    });
  }
}
