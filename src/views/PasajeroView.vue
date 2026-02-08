<template>
  <div class="container-pasajero">
    <Pasajero />
  </div>
</template>

<script>
import Pasajero from "@/components/Pasajero.vue";
export default {
  components: {
    Pasajero,
  },
};
</script>

<style scoped>
.container-pasajero{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>