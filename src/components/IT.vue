<template>
  <div>
    <div>
      <h3>Tickets Mios</h3>
      <div>
          <table class="">
            <thead>
                <tr class="mg">  
                    <th>Folio       
                    </th>
                    <th>Status
                    </th>
                    <th>Prioridad
                    </th>
                    <th>Razon
                    </th>
                    <th>Quien Atiende
                    </th>
                    <th>Ver Comentarios
                    </th>
                    <th>Ver Documento
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(solicitud) in solicitudesMias" v-bind:key="solicitud">
                    <th>{{ solicitud._id}}</th>
                    <th> 
                        <label v-if="solicitud.FechaCreacion != null && solicitud.FechaEnProceso == null">Pendiente</label>
                        <label v-if="solicitud.FechaEnProceso != null && solicitud.FechaTerminado == null">En Proceso</label>
                        <label v-if="solicitud.FechaTerminado != null">Finalizado</label>
                    </th>
                    <th>
                        <label v-if="solicitud.Prioridad == 2">Alta</label>
                        <label v-if="solicitud.Prioridad == 1">Media</label>
                        <label v-if="solicitud.Prioridad == 0">Baja</label>
                    </th>
                    <th>{{ solicitud.Razon }}</th>
                    <th>
                        <label v-if="solicitud.UsuarioIT.IdUsuarioIT == -1"> Nadie Atiende</label>
                        <label v-if="solicitud.UsuarioIT.IdUsuarioIT != -1">{{ olicitud.UsuarioIT.NombreCompleto }}</label>
                    </th>
                    <th>
                        <label  v-if="solicitud.ComentariosIT.length == 0" >No hay Comentarios</label>
                        <input  v-if="solicitud.ComentariosIT.length != 0" type="button" v-on:click="showComentarios(solicitud.ComentariosIT)" value="Mostrar Comentarios">
                    </th>
                    <th>
                        <label  v-if="solicitud.RutaDocumento == null">No existe archivo</label>
                        <input v-on:click="ShowDoc(solicitud.RutaDocumento)"  v-if="solicitud.RutaDocumento != null" type="button" value="Mostrar archivo">
                    </th> 
                </tr>
            </tbody>
      </table>
      </div>


      <h3>Tickets Sin Procesar</h3>
       <div>
           <table class="">
            <thead>
                <tr class="mg">  
                    <th>Folio       
                    </th>
                    <th>Status
                    </th>
                    <th>Prioridad
                    </th>
                    <th>Razon
                    </th>
                    <th>Quien Atiende
                    </th>
                    <th>Ver Comentarios
                    </th>
                    <th>Ver Documento
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(solicitud) in solicitudSinProcesar" v-bind:key="solicitud">
                    <th>{{ solicitud._id}}</th>
                    <th> 
                        <label v-if="solicitud.FechaCreacion != null && solicitud.FechaEnProceso == null">Pendiente</label>
                        <label v-if="solicitud.FechaEnProceso != null && solicitud.FechaTerminado == null">En Proceso</label>
                        <label v-if="solicitud.FechaTerminado != null">Finalizado</label>
                    </th>
                    <th>
                        <label v-if="solicitud.Prioridad == 2">Alta</label>
                        <label v-if="solicitud.Prioridad == 1">Media</label>
                        <label v-if="solicitud.Prioridad == 0">Baja</label>
                    </th>
                    <th>{{ solicitud.Razon }}</th>
                    <th>
                        <label v-if="solicitud.UsuarioIT.IdUsuarioIT == -1"> Nadie Atiende</label>
                        <label v-if="solicitud.UsuarioIT.IdUsuarioIT != -1">{{ olicitud.UsuarioIT.NombreCompleto }}</label>
                    </th>
                    <th>
                        <label  v-if="solicitud.ComentariosIT.length == 0" >No hay Comentarios</label>
                        <input  v-if="solicitud.ComentariosIT.length != 0" type="button" v-on:click="showComentarios(solicitud.ComentariosIT)" value="Mostrar Comentarios">
                    </th>
                    <th>
                        <label  v-if="solicitud.RutaDocumento == null">No existe archivo</label>
                        <input v-on:click="ShowDoc(solicitud.RutaDocumento)"  v-if="solicitud.RutaDocumento != null" type="button" value="Mostrar archivo">
                    </th> 
                </tr>
            </tbody>
      </table>
       </div>
    </div>
  </div>
</template>




<script>
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
import { Accordion } from "mdbvue";
import axios from "axios";
import sha256 from "sha256";

export default {
    mounted:{
        getData(){
            this.solicitudesSinAtender();
            this.solicitudesAtendidas();
        }
    },
    components: {
    
    },
    data() {
        return {
        solicitudesMias: [],
        solicitudSinProcesar: [],
        idSolicitud: -1,
    };
  },
  computed: {
      
  },
  methods: {
    solicitudesSinAtender(){//Done
        var user = this.$store.getters.user;
        var config = this.$store.getters.auth;
        setTimeout(() => {
            axios.get('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/itUser/getUnattendedSolicitudes', config).then(response => {
                    this.solicitudesSinProcesar = response.data.solicitudesNoAtendidas;
                    //4 o 3 dependiendo si es vendedor o cliente, pero aun en la api no nos mandan el tipo de usuario
                }).catch(e => {
                    this.$swal('Error al cargar datos', 'Verifique su conexion a internet', 'error');
                })
            },
            300  
        );
    },
    solicitudesAtendidas(){//Done
        var user = this.$store.getters.user;
        var config = this.$store.getters.auth;
        setTimeout(() => {
            axios.get('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/itUser/getMySolicitudes' + user.Id, config).then(response => {
                    this.solicitudesMias = response.data.solicitudesAtendidas;
                    //4 o 3 dependiendo si es vendedor o cliente, pero aun en la api no nos mandan el tipo de usuario
                }).catch(e => {
                    this.$swal('Error al cargar datos', 'Verifique su conexion a internet', 'error');
                })
            },
            300  
        );
    },
    asignarSolicitud(idSolicitud){//Done
        var user = this.$store.getters.user;
        var config = this.$store.getters.auth;
        var obj = {
            "idUsuarioIT": user.Id,
            "nombreCompleto": user.Nombre + " " + user.Apellidos,
            "idSolicitud": idSolicitud
        };
        setTimeout(() => {
            axios.get('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/itUser/assignSolicitud', obj , config).then(response => {

                    //4 o 3 dependiendo si es vendedor o cliente, pero aun en la api no nos mandan el tipo de usuario
                }).catch(e => {
                    this.$swal('Error al cargar datos', 'Verifique su conexion a internet', 'error');
                })
            },
            300  
        );
    },
    asignarFechaEnProceso(idSolicitud){
        var user = this.$store.getters.user;
        var config = this.$store.getters.auth;
        var obj = {
            "idSolicitud": idSolicitud,
            "comentario": "",
        };
        setTimeout(() => {
            axios.post('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/itUser/assignFechaEnProceso', obj  ,config).then(response => {
                    this.solicitudesMias = response.data.solicitudesAtendidas;
                    //4 o 3 dependiendo si es vendedor o cliente, pero aun en la api no nos mandan el tipo de usuario
                }).catch(e => {
                    this.$swal('Error al cargar datos', 'Verifique su conexion a internet', 'error');
                })
            },
            300  
        );
    },
    asignarFechaTerminado(idSolicitud){
        var user = this.$store.getters.user;
        var config = this.$store.getters.auth;
        var obj = {
            "idSolicitud": idSolicitud,
            "comentario": "",
        };
        setTimeout(() => {
            axios.post('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/itUser/assignFechaTerminado', obj, config).then(response => {
                    this.solicitudesMias = response.data.solicitudesAtendidas;
                    //4 o 3 dependiendo si es vendedor o cliente, pero aun en la api no nos mandan el tipo de usuario
                }).catch(e => {
                    this.$swal('Error al cargar datos', 'Verifique su conexion a internet', 'error');
                })
            },
            300  
        );
    },
    addComentarioSolicitud(idSolicitud){
        var user = this.$store.getters.user;
        var config = this.$store.getters.auth;
        var obj = {
            "idSolicitud": idSolicitud,
            "comentario": "",
        };
        setTimeout(() => {
            axios.get('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/itUser/addCommentSolicitud', obj, config).then(response => {
                    this.solicitudesMias = response.data.solicitudesAtendidas;
                    //4 o 3 dependiendo si es vendedor o cliente, pero aun en la api no nos mandan el tipo de usuario
                }).catch(e => {
                    this.$swal('Error al cargar datos', 'Verifique su conexion a internet', 'error');
                })
            },
            300  
        );
    },

  }
};
</script>


<style >
html,
body {
  height: 100%;
  font-family: arial;
  font-weight: bold;
}

.card {
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6) !important;
}

h3 {
  font-weight: bold;
  text-align: center;
  color: white;
}

#tblIdMade {
   margin-bottom: 15%;
}
</style>