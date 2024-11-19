import { sqliteTable, integer, foreignKey, text, numeric } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const jornada = sqliteTable("jornada", {
	idJornada: integer().primaryKey(),
	nomJornada: text({ length: 255 }),
});

export const tipoEvento = sqliteTable("tipoEvento", {
	idTipoEvento: integer().primaryKey(),
	desTipoEvento: text({ length: 255 }),
});

export const lugares = sqliteTable("lugares", {
	idLugar: integer().primaryKey(),
	nomLugar: text({ length: 255 }),
});

export const admin = sqliteTable("admin", {
	idAdmin: integer(),
	"contraseña": integer("contraseña"),
});

export const eventos = sqliteTable("eventos", {
	idEvento: integer().primaryKey({ autoIncrement: true }),
	tituloEvento: text(),
	descEvento: text(),
	fecEvento: numeric(),
	idTipoEvento: integer().references(() => tipoEvento.idTipoEvento),
	idLugar: integer().references(() => lugares.idLugar),
	idJornada: integer().references(() => jornada.idJornada),
	idImagen: numeric().references(() => imagen.idImagen),
});

export const imagen = sqliteTable("imagen", {
	idImagen: integer().primaryKey({ autoIncrement: true }),
	urlImagen: text("URLImagen"),
});

