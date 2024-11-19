-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `jornada` (
	`idJornada` integer PRIMARY KEY,
	`nomJornada` text(255)
);
--> statement-breakpoint
CREATE TABLE `tipoEvento` (
	`idTipoEvento` integer PRIMARY KEY,
	`desTipoEvento` text(255)
);
--> statement-breakpoint
CREATE TABLE `lugares` (
	`idLugar` integer PRIMARY KEY,
	`nomLugar` text(255)
);
--> statement-breakpoint
CREATE TABLE `admin` (
	`idAdmin` integer,
	`contraseña` integer
);
--> statement-breakpoint
CREATE TABLE `imagen` (
	`idImagen` numeric PRIMARY KEY,
	`URLImagen` text
);
--> statement-breakpoint
CREATE TABLE `eventos` (
	`idEvento` integer PRIMARY KEY AUTOINCREMENT,
	`tituloEvento` text,
	`descEvento` text,
	`fecEvento` numeric,
	`idTipoEvento` integer,
	`idLugar` integer,
	`idJornada` integer,
	`idImagen` numeric,
	FOREIGN KEY (`idTipoEvento`) REFERENCES `tipoEvento`(`idTipoEvento`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`idLugar`) REFERENCES `lugares`(`idLugar`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`idJornada`) REFERENCES `jornada`(`idJornada`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`idImagen`) REFERENCES `imagen`(`idImagen`) ON UPDATE no action ON DELETE no action
);

*/