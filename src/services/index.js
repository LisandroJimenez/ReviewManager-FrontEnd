export * from './api.js';

export const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ReviewManager"); 

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/LisandroJV/image/upload`, 
            {
                method: "POST",
                body: formData,
            }
        );
        
        const data = await response.json();
        return data.secure_url; 
    } catch (e) {
        console.error("Error en la subida:", e);
        return null;
    }
};