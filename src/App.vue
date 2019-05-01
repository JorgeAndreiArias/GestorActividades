<template>
  
  <div id="app">
    
    <login v-if="page == 1"/>
    <registro v-if="page == 2"/>
    <normal v-if="page == 3"/>
    <ti v-if="page == 4"/>
    <gerente v-if="page == 5"/>
  </div>
</template>

<script>
import login from './components/login.vue'
import registro from './components/registro.vue'
import normal from './components/usuarioNormal.vue'
import ti from './components/IT.vue'
import gerente from './components/gerente.vue'



export default {
  name: 'app',
  components: {
    login, registro, normal, ti, gerente
  },
  computed:{
    page(){
      return this.$store.getters.page;
    }
  }
}
</script>

<style>

</style>
