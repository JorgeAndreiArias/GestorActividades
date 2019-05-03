<template>
<transition name="modal" class="container-fluid">
   <div class="modal d-block" >
    <div class="modal-dialog modal-lg" >
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">
          Lista de Comentarios
        </h4>
      </div>
      
      <div class="modal-body">
        <table class="table-responsive table-striped table-light">
            <thead>
                <tr>
                    <th>Comentario</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="comentario in loadProductos" v-bind:key="comentario">
                    <th>{{ comentario }}</th>
                </tr>
            </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <input type="button" style="font-family: Roboto , sans-serif !important; background-color: #f16921 !important; border-color: #f16921 !important;" class="btn btn-primary" value="Ver Pantalla Completa" v-on:click="Open" >
        <input type="button" style="font-family: Roboto , sans-serif !important; background-color: #f16921 !important; border-color: #f16921 !important;" class="btn btn-primary" value="Cerrar" v-on:click="Close" >
      </div>
    </div>
  </div>
</div>
</transition>
</template>

<script>
import axios from 'axios'; 
export default {
    data: {

    },
    methods:{
        Close(){
            this.$store.commit('setModal', false);
            this.$store.commit('setComentarios', []);
        },
    },
    computed: {
        loadProductos(){
            return this.$store.getters.getComentarios;
        }
    }
}
</script>

<style scoped>

</style>
