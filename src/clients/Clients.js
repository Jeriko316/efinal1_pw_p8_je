<template>
  <div>
    <MensajeJuego
      v-if="mostrarMensaje"
      :mensaje1="mensaje1"
      :mensaje2="mensaje2"
      :color="colorMensaje"
    />
    <div v-else>
      <div style="display: flex; justify-content: center; gap: 20px;">
        <CuadroPokemon
          v-for="(cuadro, idx) in cuadros"
          :key="idx"
          :imagen="cuadro.imagen"
          :nombre="cuadro.nombre"
          :mostrar="cuadro.mostrar"
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
import { obtenerPokemonPorId } from "@/clients/Clients.js";
import CuadroPokemon from "@/components/CuadroPokemon.vue";
import MensajeJuego from "@/components/MensajeJuego.vue";

export default {
  components: { CuadroPokemon, MensajeJuego },
  data() {
    return {
      cuadros: [
        { imagen: "https://placehold.co/200x200/000000/000000.png", nombre: "", mostrar: false },
        { imagen: "https://placehold.co/200x200/000000/000000.png", nombre: "", mostrar: false },
        { imagen: "https://placehold.co/200x200/000000/000000.png", nombre: "", mostrar: false }
      ],
      puntaje: 0,
      intentos: 0,
      jugarOn: true,
      mostrarMensaje: false,
      mensaje1: "",
      mensaje2: "",
      colorMensaje: "red",
      idsFijos: [1, 2, 3, 4] // 4 pokémon fijos
    };
  },
  methods: {
    async jugar() {
      this.intentos++;
      // Selecciona 3 ids aleatorios del grupo fijo
      const seleccionados = [];
      for (let i = 0; i < 3; i++) {
        const idx = Math.floor(Math.random() * this.idsFijos.length);
        seleccionados.push(this.idsFijos[idx]);
      }
      // Obtiene los datos de los pokémon seleccionados
      const nuevosCuadros = [];
      for (let id of seleccionados) {
        const poke = await obtenerPokemonPorId(id);
        nuevosCuadros.push({ imagen: poke.imagen, nombre: poke.nombre, mostrar: true });
      }
      this.cuadros = nuevosCuadros;

      // Calcular puntaje
      const nombres = nuevosCuadros.map(c => c.nombre);
      if (nombres[0] === nombres[1] && nombres[1] === nombres[2]) {
        this.puntaje += 5;
      } else if (nombres[0] === nombres[1] || nombres[1] === nombres[2] || nombres[0] === nombres[2]) {
        this.puntaje += 2;
      }

      // Verifica condiciones de fin de juego
      if (this.intentos >= 5 && this.puntaje < 10) {
        this.mensaje1 = "Ha utilizado tus 5 intentos";
        this.mensaje2 = "El juego a terminado, inténtelo otra vez";
        this.colorMensaje = "red";
        this.mostrarMensaje = true;
        this.jugarOn = false;
      } else if (this.puntaje >= 10) {
        this.mensaje1 = `Puntaje: ${this.puntaje}`;
        this.mensaje2 = "Felicitaciones has ganado un premio de $10.000,00";
        this.colorMensaje = "blue";
        this.mostrarMensaje = true;
        this.jugarOn = false;
      }
    },
    nuevoJuego() {
      this.cuadros = [
        { imagen: "https://placehold.co/200x200/000000/000000.png", nombre: "", mostrar: false },
        { imagen: "https://placehold.co/200x200/000000/000000.png", nombre: "", mostrar: false },
        { imagen: "https://placehold.co/200x200/000000/000000.png", nombre: "", mostrar: false }
      ];
      this.puntaje = 0;
      this.intentos = 0;
      this.jugarOn = true;
      this.mostrarMensaje = false;
      this.mensaje1 = "";
      this.mensaje2 = "";
      this.colorMensaje = "red";
    }
  }
};
</script>

<style scoped>
/* Agrega estilos aquí si es necesario */
</style>

