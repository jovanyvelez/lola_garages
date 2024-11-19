import { uploadImage } from '$lib/server/cloudinary';

export const actions = {
	crearUsuario: async ({ request }:{request:Request}) => {
		const data = Object.fromEntries(await request.formData());
		const imagen = await uploadImage(data.send_image as File);
		const datos = imagen.secure_url
        
		return;
	}
}