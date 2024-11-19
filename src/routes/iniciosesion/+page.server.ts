import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/database/index';
import type { Actions } from './$types';
import { admin } from '$lib/server/database/schema';
import { eq } from "drizzle-orm";
export const actions: Actions = {
	crear: async ({ request }) => {
		const formData = await request.formData();
		const contraseña = formData.get('contraseña') ;

		if(!contraseña || contraseña === null) return  fail(400,{message: 'La contraseña debe ser un número'});
    const cadena = parseInt(contraseña as string, 10);
    if (isNaN(cadena)) return fail(400,{message: 'La contraseña debe ser un número'});
    console.log(cadena )

		const cofre = await db.select({ contraseña: admin.contraseña }).from(admin).where(eq(admin.contraseña, cadena));
    if (cofre.length === 0) return fail(400, { message: 'Contraseña incorrecta' });
    console.log(cofre.length)
		redirect(303, '/publicacion')
	}
}
