<template>
  <div>
    <div v-if="mostrarMensaje">
      <p :style="{ color: colorMensaje, fontWeight: 'bold', whiteSpace: 'pre-line' }">{{ mensaje }}</p>
      <button on-click="nuevoJuego">Nuevo Juego</button>
    </div>
    <div v-else>
      <div style="display: flex; justify-content: center; gap: 20px;">
        <ImagenCasino
          v-for="(cuadro, idx) in cuadros"
          :key="idx"
          :img="cuadro.img"
          :nombre="cuadro.nombre"
          :mostrarImagen="cuadro.mostrarImagen"
        />
      </div>
      <div style="margin: 20px;">
        <button @click="jugar" :disabled="!jugarOn">JUGAR</button>
        <button @click="nuevoJuego">Nuevo Juego</button>
      </div>
      <div>
        <p>Puntaje: {{ puntaje }}</p>
        <p>Intentos: {{ intentos }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ImagenCasino from "@/components/ImagenCasino.vue";

export default {
  components: { ImagenCasino },
  data() {
    return {
      cuadros: [
        { img: "https://via.placeholder.com/200/000000", nombre: "XXXXXXX", mostrarImagen: false },
        { img: "https://via.placeholder.com/200/000000", nombre: "XXXXXXX", mostrarImagen: false },
        { img: "https://via.placeholder.com/200/000000", nombre: "XXXXXXX", mostrarImagen: false },
      ],
      puntaje: 0,
      intentos: 0,
      jugarOn: true,
      mensaje: "",
      colorMensaje: "red",
      mostrarMensaje: false,
      idsFijos: [1, 2, 3, 4],
    };
  },
  methods: {
    async jugar() {
      this.intentos++;
      const seleccionados = [];
      for (let i = 0; i < 3; i++) {
        const idx = Math.floor(Math.random() * this.idsFijos.length);
        seleccionados.push(this.idsFijos[idx]);
      }
      
      const cuadrosNuevos = await Promise.all(
        seleccionados.map(async (id) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const data = await res.json();
          return {
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
            nombre: data.name,
            mostrarImagen: true,
          };
        })
      );
      this.cuadros = cuadrosNuevos;

      // Calcular puntaje
      const nombres = cuadrosNuevos.map(c => c.nombre);
      if (nombres[0] === nombres[1] && nombres[1] === nombres[2]) {
        this.puntaje += 5;
      } else if (nombres[0] === nombres[1] || nombres[1] === nombres[2] || nombres[0] === nombres[2]) {
        this.puntaje += 2;
      }

   
      if (this.intentos >= 5 && this.puntaje < 10) {
        this.mensaje = "Has utilizado tus 5 intentos\nEl juego ha terminado, intentalo nuevamente";
        this.colorMensaje = "red";
        this.mostrarMensaje = true;
        this.jugarOn = false;
      } else if (this.puntaje >= 10) {
        this.mensaje = `Puntaje: ${this.puntaje}\nFelicitaciones has ganado un premio de $10.000,00`;
        this.colorMensaje = "blue";
        this.mostrarMensaje = true;
        this.jugarOn = false;
      }
    },
    nuevoJuego() {
      this.cuadros = [
        { img: "https://via.placeholder.com/200/000000", nombre: "XXXXXXX", mostrarImagen: false },
        { img: "https://via.placeholder.com/200/000000", nombre: "XXXXXXX", mostrarImagen: false },
        { img: "https://via.placeholder.com/200/000000", nombre: "XXXXXXX", mostrarImagen: false },
      ];
      this.puntaje = 0;
      this.intentos = 0;
      this.jugarOn = true;
      this.mensaje = "";
      this.mostrarMensaje = false;
      this.mostrarImagen = true;
    },
  },
};
</script>

<style>


</style>