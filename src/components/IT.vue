<template>
  <div>
    <div>
        <h3>Tickets Mios</h3>
        <div id="Out_Table"> 
          <table lass="table draggable table-striped table-dark">
            <thead>
                <tr class="mg">  
                    <th>Folio       
                    </th>
                    <th>Creada por
                    </th>
                    <th>Prioridad
                    </th>
                    <th>Fecha de Creacion
                    </th>
                    <th>Fecha de Proceso
                    </th>
                    <th>Fecha de Finalizado
                    </th>
                    <th>Ver Documento
                    </th>
                    <th>Comentarios</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(solicitud) in loadSolMias" v-bind:key="solicitud">
                    <th>{{ solicitud._id}}</th>
                    <th>
                        <label v-if="solicitud.UsuarioComun.IdUsuarioComun == -1"> Nadie Atiende</label>
                        <label v-if="solicitud.UsuarioComun.IdUsuarioComun != -1">{{ solicitud.UsuarioComun.NombreCompleto }}</label>
                    </th>
                    <th>
                        <label v-if="solicitud.Prioridad == 2" style="color: #b71c1c;">Alta</label>
                        <label v-if="solicitud.Prioridad == 1" style="color: #F57F17;">Media</label>
                        <label v-if="solicitud.Prioridad == 0" style="color: #2E7D32;">Baja</label>
                    </th>
                    <td>
                        <label v-if="solicitud.FechaCreacion != null"> 
                            {{ new Date(solicitud.FechaCreacion).toLocaleDateString() }}
                        </label>
                        <label v-if="solicitud.Prioridad == null">No hay fecha que mostrar</label>
                    </td>
                    <td>
                        <label
                        v-if="solicitud.FechaEnProceso != null"
                        >{{ new Date(solicitud.FechaEnProceso).toLocaleDateString() }}</label>
                        <input v-if="solicitud.FechaEnProceso == null" type="button" value="Asignar Fecha" v-on:click="setOption2(solicitud._id)">
                    </td>
                    <td>
                        <label v-if="solicitud.FechaTerminado != null" > {{ new Date(solicitud.FechaTerminado).toLocaleDateString()}} </label>
                        <input v-if="solicitud.FechaTerminado == null" type="button" value="Asignar Fecha" v-on:click="setOption3(solicitud._id)">
                    </td>
                    <th>
                        <label  v-if="solicitud.RutaDocumento == null">No existe archivo</label>
                        <input v-on:click="ShowDoc(solicitud.RutaDocumento)"  v-if="solicitud.RutaDocumento != null" type="button" value="Mostrar archivo">
                    </th> 
                    <th>
                        <input  type="button" v-on:click="setOption1(solicitud._id)" value="Añadir Comentario"/>
                        <input  type="button" v-on:click="showComentarios(solicitud.ComentariosIT)" value="Mostrar Comentarios">
                    </th>
                </tr>
            </tbody>
      </table>
      </div>

        <div id="tbl_solicitudes">
            <h3>Tickets Sin Procesar</h3>
       <div id="Out_Table"> 
           <table lass="table draggable table-striped table-dark">
            <thead>
                <tr class="mg">  
                    <th>Folio       
                    </th>
                    <th>Creada por
                    </th>
                    <th>Prioridad
                    </th>
                    <th>Fecha de Creacion
                    </th>
                    <th>Ver Documento
                    </th>
                    <th>Asignar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="solicitud in loadTodas" v-bind:key="solicitud">
                    <th>{{ solicitud._id}}</th>
                     <th>
                        <label v-if="solicitud.UsuarioComun.IdUsuarioComun == -1"> Nadie Solicita</label>
                        <label v-if="solicitud.UsuarioComun.IdUsuarioComun != -1">{{ solicitud.UsuarioComun.NombreCompleto }}</label>
                    </th>
                    <th>
                        <label v-if="solicitud.Prioridad == 2" style="color: #b71c1c;">Alta</label>
                        <label v-if="solicitud.Prioridad == 1" style="color: #F57F17;">Media</label>
                        <label v-if="solicitud.Prioridad == 0" style="color: #2E7D32;">Baja</label>
                    </th>
                    <td>
                        <label v-if="solicitud.FechaCreacion != null"> 
                            {{ new Date(solicitud.FechaCreacion).toLocaleDateString() }}
                        </label>
                        <label v-if="solicitud.Prioridad == null">No hay fecha que mostrar</label>
                    </td>
                    <th>
                        <label  v-if="solicitud.RutaDocumento == null">No existe archivo</label>
                        <input v-on:click="ShowDoc(solicitud.RutaDocumento)"  v-if="solicitud.RutaDocumento != null" type="button" value="Mostrar archivo">
                    </th> 
                    <th>
                        <input type="button" value="Asignarme Tarea" v-on:click="asignarSolicitud(solicitud._id)">
                    </th>
                </tr>
            </tbody>
      </table>
       </div>
        </div>
      
       <div>
           <div v-if="opcion != -1">
               <label>Añadir Comentario</label><textarea v-model="comentary" placeholder="Ingresa un comentario" cols="30" rows="10"></textarea>
               <input type="button" value="Enviar Peticion" v-on:click="sendPost()">
           </div>
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
import axios from "axios";
import sha256 from "sha256";

export default {
    mounted: function() {
            this.solicitudesSinAtender(),
            this.solicitudesAtendidas()
    },
    components: {
    
    },
    data() {
        return {
        idSolicitud: -1,
        opcion: -1,
        comentary: "",
    };
  },
  computed: {
      loadSolMias(){

          return this.$store.getters.getMias;
      },
      loadTodas(){

          return this.$store.getters.getTodas;
      }

  },
  methods: {
      showComentarios(comentarios){
            this.$store.commit('setComentario', comentarios);
            this.$store.commit('setModal', true);
        },
      setOption1(idSolicitud){
          this.idSolicitud = idSolicitud
          this.opcion = 1
      },
      setOption2(idSolicitud){
          this.idSolicitud = idSolicitud
          this.opcion = 2
      },
      setOption3(idSolicitud){
          this.idSolicitud = idSolicitud
          this.opcion = 3
      },
      ShowDoc(url){
            window.open(url);
        },
        sendPost(idSolicitud){
            switch(this.opcion){
                case 1:
                this.addComentarioSolicitud(idSolicitud);
                    break;
                case 2:
                this.asignarFechaEnProceso(idSolicitud);
                    break;
                case 3: 
                this.asignarFechaTerminado(idSolicitud);
                    break;
            }
        },
    solicitudesSinAtender(){//Done
        var user = this.$store.getters.user;
        var config = this.$store.getters.auth;
        setTimeout(() => {
            axios.get('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/itUser/getUnattendedSolicitudes', config).then(response => {

                    this.$store.commit('setTodas', response.data.solicitudesNoAtendidas );
                    //4 o 3 dependiendo si es vendedor o cliente, pero aun en la api no nos mandan el tipo de usuario
                }).catch(e => {
                    console.log(e);
                    this.$swal('Ups Algo salio Mal', 'Verifique su conexion a internet', 'error');
                })
            },
            300  
        );
    },
    solicitudesAtendidas(){//Done
        var user = this.$store.getters.user;
        var config = this.$store.getters.auth;
        setTimeout(() => {
            axios.get('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/itUser/getMySolicitudes/' + user.Id, config).then(response => {
                    this.$store.commit('setMias', response.data.solicitudesAtendidas );
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
        var objUser = {
            "idSolicitud": parseInt(idSolicitud),
            "idUsuarioIT":parseInt(user.Id),
            "nombreCompleto": user.Nombre + " " + user.Apellidos,
            
        };
        var form_data = new FormData();
        form_data.append("idSolicitud", parseInt(idSolicitud));
        form_data.append("idUsuarioIT", parseInt(user.Id));
        form_data.append("nombreCompleto", user.Nombre + " " + user.Apellidos);
        console.warn(objUser != null ? objUser : {});
        setTimeout(() => {
            axios.post('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/itUser/assignSolicitud', form_data, config).then(response => {
                console.warn(response.data);
                this.solicitudesSinAtender()
                this.solicitudesAtendidas()
                    //4 o 3 dependiendo si es vendedor o cliente, pero aun en la api no nos mandan el tipo de usuario
                }).catch(e => {
                    console.log(e);
                    this.$swal('Error al cargar datos', 'Verifique su conexion a internet', 'error');
                })
            },
            300  
        );
    },
    asignarFechaEnProceso(){
        var user = this.$store.getters.user;
        var config = this.$store.getters.auth;

        var form_data = new FormData();
        form_data.append("idSolicitud", parseInt(this.idSolicitud));
        form_data.append("comentario", this.comentary );

        setTimeout(() => {
            axios.post('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/itUser/assignFechaEnProceso', form_data ,config).then(response => {
                    this.$swal('Asignación de Fecha Exitoso', 'Se ha agregado la fecha de Proceso', 'success');
                    this.solicitudesSinAtender()
                    this.solicitudesAtendidas()//4 o 3 dependiendo si es vendedor o cliente, pero aun en la api no nos mandan el tipo de usuario
                }).catch(e => {
                    this.$swal('Error al cargar datos', 'Verifique su conexion a internet', 'error');
                })
            },
            300  
        );
    },
    asignarFechaTerminado(){
        var user = this.$store.getters.user;
        var config = this.$store.getters.auth;
        var form_data = new FormData();
        form_data.append("idSolicitud", parseInt(this.idSolicitud));
        form_data.append("comentario", this.comentary );

        setTimeout(() => {
            axios.post('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/itUser/assignFechaTerminado', form_data, config).then(response => {
                this.$swal('Asignación de Fecha Exitoso', 'Se ha agregado la fecha de Terminado', 'success');
                    this.solicitudesSinAtender()
                    this.solicitudesAtendidas()

                    //4 o 3 dependiendo si es vendedor o cliente, pero aun en la api no nos mandan el tipo de usuario
                }).catch(e => {
                    this.$swal('Error al cargar datos', 'Verifique su conexion a internet', 'error');
                })
            },
            300  
        );
    },
    addComentarioSolicitud(){

        var user = this.$store.getters.user;
        var config = this.$store.getters.auth;
        if(this.comentary != null && this.comentary != ""){
            var form_data = new FormData();
            form_data.append("idSolicitud", parseInt(this.idSolicitud));
            form_data.append("comentario", this.comentary );

            setTimeout(() => {
            axios.post('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/itUser/addCommentSolicitud', form_data, config).then(response => {
                this.$swal('Asignación de Comentario Exitoso', 'Se ha agregado el comentario', 'success');
                        this.solicitudesSinAtender()
                        this.solicitudesAtendidas()
                        //4 o 3 dependiendo si es vendedor o cliente, pero aun en la api no nos mandan el tipo de usuario
                    }).catch(e => {
                        this.$swal('Error al cargar datos', 'Verifique su conexion a internet', 'error');
                    })
                },
                300  
            );
        }else{
                this.$swal('', 'Ingrese un Comentario', 'warning');
        }
        
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
