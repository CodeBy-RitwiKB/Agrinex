import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { quality, format } from '@cloudinary/url-gen/actions/delivery';

// Initialize Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
});

/**
 * Generates an optimized Cloudinary URL for a given public ID.
 * @param {string} publicId - The public ID of the resource on Cloudinary.
 * @param {object} options - Optional transformations.
 * @param {boolean} isVideo - Whether the resource is a video.
 * @returns {string} The optimized URL.
 */
export const getCloudinaryUrl = (publicId, options = {}, isVideo = false) => {
  if (!publicId) return '';
  
  // Create a new instance (image or video)
  const resource = isVideo ? cld.video(publicId) : cld.image(publicId);

  // Apply default optimizations: auto format and auto quality
  resource.delivery(format('auto')).delivery(quality('auto'));

  // Apply custom transformations if needed
  if (options.width) {
    resource.resize(auto().width(options.width));
  }
  if (options.height) {
    resource.resize(auto().height(options.height));
  }

  return resource.toURL();
};

/**
 * Handles image upload to Cloudinary (Placeholder for your future backend).
 * Currently, this points to the Cloudinary Upload API for testing.
 */
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  return await response.json();
};
