<template>
  <div class="container-login">
    <Login />
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
export default {
  components: {
    Login,
  },
};
</script>

<style scoped>
.container-login{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>