import { db } from '$lib/server/database/index';
import {jornada,tipoEvento,lugares,eventos,imagen} from '$lib/server/database/schema'
import { fail } from "@sveltejs/kit";
import { LibsqlError } from '@libsql/client';
import { eq, and, like } from "drizzle-orm";

export const load = async () => {
    const consulta = await db
    .select({
        idevento: eventos.idEvento,
        nomevento: eventos.tituloEvento,
        descevento: eventos.descEvento,
        fechaevento: eventos.fecEvento,
        idtipoevento: eventos.idTipoEvento,
        nomtipoevento: tipoEvento.desTipoEvento,
        idlugar: eventos.idLugar,
        nomlugar:lugares.nomLugar,
        idjornada: eventos.idJornada,
        nomjornada:jornada.nomJornada,
        idimagen:imagen.idImagen,
        urlimagen:imagen.URLImagen
    })
    .from(eventos)
    .leftJoin(tipoEvento, eq(eventos.idTipoEvento, tipoEvento.idTipoEvento))
    .leftJoin(lugares, eq(eventos.idLugar,lugares.idLugar))
    .leftJoin(jornada, eq (eventos.idJornada,jornada.idJornada))
    .leftJoin(imagen, eq (eventos.idImagen,imagen.idImagen))
    return {consulta}
};