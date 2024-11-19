<script lang="ts">
	let input: HTMLInputElement | undefined = $state(undefined);

	let new_image_url = '';

	const WITH = 300;

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

<h1 class="center">Demostracíon de Forms Sveltekit</h1>

<h2 class="text-xl font-semibold mb-2">Agregar foto del producto</h2>

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

<form action="?/crearUsuario" method="post">
	<input type="hidden" name="send_image" bind:value={image.secureUrl} />

	<button type="submit">Enviar datos</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		max-width: 50%;
		margin: auto auto;
		border: 1px solid #ccc;
		padding: 5rem;
		background-color: #f4f4f4;
		border-radius: 10px;
	}

	input {
		border: 2px solid grey;
		padding: 0.5rem;
		box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
		margin: 0.3rem 0;
		border-radius: 5px;
		color: #5a5a5a;
		font-size: 1.3rem;
	}

	button {
		background-color: #f4f4f4;
		color: #333;
		padding: 0.5rem 1rem;
		border: solid 1px #333;
		border-radius: 5px;
		margin-top: 1rem;
		cursor: pointer;
		margin: 0 auto;
		margin-top: 1rem;
	}

	button:hover {
		background-color: white;
		font-weight: bold;
	}

	.space {
		margin: 1rem 0 0;
	}
	.center {
		margin: 0 auto;
		max-width: 50%;
		text-align: center;
		margin-top: 5rem;
	}
</style>