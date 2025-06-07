<template>
  <div class="imagen-container">
    <template v-if="mostrarImagen">
      <img :src="img" :alt="nombre" />
      <div>{{ nombre }}</div>
    </template>
    <template v-else>
      <div class="cuadro-negro"></div>
      <div>XXXXXXX</div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    img: { type: String, required: true },
    nombre: { type: String, required: true },
    mostrarImagen: { type: Boolean, default: false },
  },
};
</script>

<style>
.imagen-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
}
img {
  width: 200px;
  height: 200px;
}
.cuadro-negro {
  width: 200px;
  height: 200px;
  background: #000;
}
</style>