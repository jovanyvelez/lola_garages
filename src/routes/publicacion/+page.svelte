<div class="salida">
    <a href="../"><img src="https://res.cloudinary.com/donhib3cp/image/upload/v1724352997/images%20pagina/c0tqayrqkh5ulx2xqedz.jpg" class="logoinicio"alt=logolola/></a>
    <h1 class="inicio">inicio</h1>
</div>

<script lang="ts">
    import "../../app.css"
    let {data} = $props()

	let input: HTMLInputElement | undefined = $state(undefined);

	let new_image_url = '';

	let WITH = 900

	let image: { id: number; secureUrl: string } = $state({ id: 0, secureUrl: '' });

	let showImage = $state(false);

	async function onChange() {
		if (!input) return;
		showImage = true;
		const file = input.files ? input.files[0] : null;

		if (file) {
			console.log('ingreso al evento de cambio de imagen');
			showImage = true;
			const reader = new FileReader();
			let modificar = false;

			reader.addEventListener('load', function () {
				const new_image = document.createElement('img');
				if (reader.result !== null) {
					new_image.setAttribute('src', reader.result as string);
					new_image_url = reader.result as string;
				}

				new_image.onload = async (e) => {
					let w_image = WITH;
					let h_image = WITH;
					if (e.target !== null) {
						const imageElement = e.target as HTMLImageElement;
						w_image = imageElement.width ? imageElement.width : 300;
						h_image = imageElement.height ? imageElement.height : 300;
					}
					let ratio;
					let canvas = document.createElement('canvas');
					if (w_image >= h_image && WITH / w_image < 1) {
						ratio = WITH / w_image;
						canvas.width = WITH;
						canvas.height = h_image * ratio;
						modificar = true;
					} else if (w_image < h_image && WITH / h_image < 1) {
						ratio = WITH / h_image;
						canvas.height = WITH;
						canvas.width = w_image * ratio;
						modificar = true;
					}
					if (modificar) {
						const context = canvas.getContext('2d');
						if (context) {
							context.drawImage(new_image, 0, 0, canvas.width, canvas.height);
							new_image_url = context.canvas.toDataURL('image/jpeg', 100);
						}
					}
					image = { secureUrl: new_image_url, id: Date.now() };
					canvas.remove();
				};
				new_image.remove();
			});

			reader.readAsDataURL(file);
			return;
		}
		showImage = false;
	}
</script>
<div class="publi">
    <div  class="cuadropubli">
    
        <h2>PUBLICACIÓN</h2>

<input
	name="laImagen"
	bind:this={input}
	onchange={() => onChange()}
	type="file"
	accept=".jpg, .jpeg, .png, .svg"
/>

<div class="flex justify-center items-center p-2 flex-wrap">
	{#if showImage}
		<div class="p-2 main relative">
			<img src={image.secureUrl} alt="{image.id}}" class="mx-2 rounded-xl" />
		</div>
	{/if}
</div>


<form action="?/subir" method="post" id="uploadForm">
 
    <input type="hidden" name="send_image" bind:value={image.secureUrl} />

    <label for="tit"> Ingrese el nombre:

    <input class="tit" name="tit" type="text" placeholder="Escribir titulo..." required/>
    </label>

    <label for="desc"> Añada una descripcion:

    <input class="desc" name="desc" type="text" placeholder="Añada una descripción..." required/>
    </label>
    
    <label for="fecha"> Añada la fecha:

    <input class="fecha" name="fecha" type="date" placeholder = "ingrese la fecha" required/>
    </label>

    <label for="tipoevento"> Indique el tipo de evento:
        <select name="tipoevento">
            <option value = {0} selected></option>
            {#each data.tipo_evento as item}
                <option value={item.idtipoevento}>
                {item.nomtipoevento}
                </option>
            {/each}
        </select>
    </label>
   <label for="jornada"> Indique la jornada:
        <select name="jornada" >
            <option value={0} selected></option>
            {#each data.jornadas as item}
                <option value={item.idjornada}>
                    {item.nomjornada}
                </option>
            {/each}
        </select>
    </label>
    <label for="lugar"> Indique el lugar:
        <select name="lugar" > 
            <option  value = {0} selected></option>
            {#each data.lugar as item }
            <option value={item.idlugar}>
                {item.nomlugar}
            </option>
            {/each}
        </select>
    </label>
  
    
    <br>
<center>
    <button type="submit">Enviar datos</button>
</center>
</form>

</div>
</div>