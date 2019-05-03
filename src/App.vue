<template>
  <div id="app" style="height: 100%;">
    <barra v-if="page != 1 && page != 2"/>
    <login v-if="page == 1"/>
    <registro v-if="page == 2"/>
    <modal v-if="showModal"></modal>
    <normal v-if="page == 3"/>
    <ti v-if="page == 4" />
    <gerente v-if="page == 5"/>
  </div>
</template>

<script>
import login from './components/login.vue'
import registro from './components/registro.vue'
import normal from './components/usuarioNormal.vue'
import ti from './components/IT.vue'
import gerente from './components/gerente.vue'
import modal from './components/comentarios.vue'
import barra from './components/barra.vue'

export default {
  name: 'app',
  components: {
    login, registro, normal, ti, gerente, modal, barra
  },
  computed:{
    page(){
      return this.$store.getters.page;
    },
    showModal(){
        return this.$store.getters.getModal;
    }
  }
}
</script>

<style>

</style>
