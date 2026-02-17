// កូដសម្រាប់ Upload រូបភាពទៅ Cloudinary
export const uploadImageToCloudinary = async (file) => {
  // 1. យកឈ្មោះ Cloud Name និង Preset ពី .env (ត្រូវប្រាកដថាអ្នកបានកំណត់ក្នុង .env ហើយ)
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary configuration is missing in .env file");
  }

  // 2. រៀបចំទិន្នន័យសម្រាប់ផ្ញើ
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    // 3. ផ្ញើទៅ Cloudinary API
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return data.secure_url; // ទទួលបាន Link រូបភាពមកវិញ
  } catch (error) {
    console.error("Upload Error:", error);
    throw error;
  }
};