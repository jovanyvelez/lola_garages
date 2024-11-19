import { db } from '$lib/server/database/index';
import { jornada, tipoEvento, lugares, eventos, imagen } from '$lib/server/database/schema';
import { fail } from '@sveltejs/kit';
import { LibsqlError } from '@libsql/client';
import { uploadImage } from '$lib/server/cloudinary';

export const load = async () => {
	const jornadas = await db
		.select({
			idjornada: jornada.idJornada,
			nomjornada: jornada.nomJornada
		})
		.from(jornada);

	const tipo_evento = await db
		.select({
			idtipoevento: tipoEvento.idTipoEvento,
			nomtipoevento: tipoEvento.desTipoEvento
		})
		.from(tipoEvento);

	const lugar = await db
		.select({
			idlugar: lugares.idLugar,
			nomlugar: lugares.nomLugar
		})
		.from(lugares);

	const imagenes = await db
		.select({
			idimagen: imagen.idImagen,
			urlimagen: imagen.URLImagen
		})
		.from(imagen);

	return { jornadas, tipo_evento, lugar, imagenes };
};

export const actions = {
	subir: async ({ request }: { request: Request }) => {
		const data = Object.fromEntries(await request.formData());
		const ima = data.send_image as string;

		if (ima.length < 200) return fail(400, { message: 'No se envió ninguna imagen' });
		if (!data.send_image) return fail(400, { message: 'No se envió ninguna imagen' });
		console.log(data.send_image);
		const imagenes = await uploadImage(data.send_image as File);
		const datos = imagenes.secure_url;
		const imgid = imagenes.id;
		let img;
		try {
			img = await db
				.insert(imagen)
				.values({
					idImagen: imgid,
					URLImagen: datos
				})
				.returning();

			console.log(img);
			await db.insert(eventos).values({
				tituloEvento: data.tit as string,
				descEvento: data.desc as string,
				fecEvento: data.fecha as string,
				idTipoEvento: parseInt(data.tipoevento as string),
				idJornada: parseInt(data.jornada as string),
				idLugar: parseInt(data.lugar as string),
				idImagen: img[0].idImagen
			});
		} catch (error) {
			if (error instanceof LibsqlError) {
				console.log(error);
			}
			return console.log('pito');
		}

		return { success: true };
	}
};
