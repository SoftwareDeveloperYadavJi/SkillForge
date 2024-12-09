import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload Large Video to Cloudinary
 * @param {string} file - The path or URL to the video file
 */
export const uploadVideo = async (file) => {
  try {
    const result = await cloudinary.uploader.upload_large(file, {
      resource_type: "video",
      chunk_size: 6000000, // 6MB chunks (adjust as needed for your server's memory limits)
    });
    return result;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw new Error("Failed to upload video.");
  }
};

/**
 * Upload Thumbnail or Image to Cloudinary
 * @param {string} file - The path or URL to the image file
 */
export const uploadeThumbMail = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "image", // Explicitly setting to image
    });
    return result;
  } catch (error) {
    console.error("Error uploading thumbnail:", error);
    throw new Error("Failed to upload thumbnail.");
  }
};
