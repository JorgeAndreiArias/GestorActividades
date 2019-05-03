<template>
  <div class="Background_Image">
    <div class="card">
      <div class="card-body">
        <div class="draggable centerh_mov" style="width: 100%;">
          <div id="divtxtIdSolicitud" class="d-flex justify-content-center">
            <span
              class="label label-primary draggable centerh_mov"
              id="txtIdSolicitudes"
            >Solicitudes</span>
          </div>
          <div class="form-group draggable select centerh_mov">
            <label for="sel1" id="lbl_Reportes">Revisar reportes por:</label>
            <select v-model="opcion" class="custom-select" style="width: 500px;">
              <option value="1">Usuario</option>
              <option value="2">Personal TI</option>
              <option value="3">Periodo</option>
              <option value="4">Ticket</option>
            </select>
          </div>
          <br>
          <div
            v-if="opcion == 1 || opcion == 2"
            class="form-group draggable input centerh_mov"
            style="width: 1000px;"
          >
            <div class="form-row">
              <div class="col-6 input-group form-group">
                <label class="Label_Text">Nombre</label>
              </div>
              <div class="col-6 input-group form-group">
                <label class="Label_Text">Apellido</label>
              </div>
            </div>
            <div class="form-row">
              <div class="col-6 input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
                <input
                  type="text"
                  v-model="nombre"
                  data-validate="NNNN[]N[]NNN"
                  placeholder="Nombre"
                  class="form-control"
                >
              </div>
              <div class="col-6 input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
                <input
                  type="text"
                  v-model="apellidos"
                  data-validate="NNNN[]N[]NNN"
                  placeholder="Apellidos"
                  class="form-control"
                >
              </div>
            </div>
          </div>
          <div
            v-if="opcion == 3"
            class="form-group draggable input centerh_mov"
            style="width: 1000px;"
          >
            <div class="form-row">
              <div class="col-6 input-group form-group">
                <label class="Label_Text">Fecha Inicial</label>
              </div>
              <div class="col-6 input-group form-group">
                <label class="Label_Text">Fecha Final</label>
              </div>
            </div>
            <div class="form-row">
              <div class="col-6 input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-calendar"></i>
                  </span>
                </div>
                <input
                  type="date"
                  v-model="fechaInit"
                  data-validate="NNNN[]N[]NNN"
                  placeholder="Fecha Inicial"
                  class="form-control"
                >
              </div>
              <div class="col-6 input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-calendar"></i>
                  </span>
                </div>
                <input
                  type="date"
                  v-model="fechaFin"
                  data-validate="NNNN[]N[]NNN"
                  placeholder="Fecha Final"
                  class="form-control"
                >
              </div>
            </div>
          </div>
          <div
            v-if="opcion == 4"
            class="form-group draggable input centerh_mov"
            style="width: 1000px;"
          >
            <div class="form-row">
              <div class="col-6 input-group form-group">
                <label class="Label_Text">Folio de la Solicitud</label>
              </div>
            </div>
            <div class="form-row">
              <div class="col-6 input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-hashtag"></i>
                  </span>
                </div>
                <input
                  type="text"
                  v-model="id"
                  data-validate="NNNN[]N[]NNN"
                  placeholder="Folio de Solicitud"
                  class="form-control"
                >
              </div>
            </div>
          </div>
          <input
            v-if="opcion != -1"
            type="button"
            class="btn btn-primary btn_Enviar_Datos"
            value="Enviar Datos"
            v-on:click="sendData"
          >
        </div>
        <div v-if="loadsolicitudes != null" class="draggable centerh_mov" id="tbl_solicitudes">
          <div id="Out_Table">
            <table class="table draggable table-striped table-dark" id="In_Table">
              <thead>
                <tr class="mg">
                  <th>ID</th>
                  <th>Creada por</th>
                  <th>Atiende/Atendió</th>
                  <th>Prioridad</th>
                  <th>Creado</th>
                  <th>En proceso</th>
                  <th>Terminado</th>
                  <th>Doc</th>
                  <th>Comentarios</th>
                </tr>
              </thead>
              <tbody>
                <tr class="mg" v-for="solicitud in loadsolicitudes" v-bind:key="solicitud">
                  <td>{{ solicitud._id }}</td>
                  <td>{{ solicitud.UsuarioComun.NombreCompleto }}</td>
                  <td>
                    <label v-if="solicitud.UsuarioIT.IdUsuarioIT == -1">Nadie Atiende</label>
                    <label
                      v-if="solicitud.UsuarioIT.IdUsuarioIT != -1"
                    >{{ solicitud.UsuarioIT.NombreCompleto}}</label>
                  </td>
                  <td>
                    <label v-if="solicitud.Prioridad == 2" style="color: #b71c1c;">Alta</label>
                    <label v-if="solicitud.Prioridad == 1" style="color: #F57F17;">Media</label>
                    <label v-if="solicitud.Prioridad == 0" style="color: #2E7D32;">Baja</label>
                  </td>
                  <td>
                    <label
                      v-if="solicitud.FechaCreacion != null"
                    >{{ new Date(solicitud.FechaCreacion).toLocaleDateString() }}</label>
                    <label v-if="solicitud.Prioridad == null">No hay fecha que mostrar</label>
                  </td>
                  <td>
                    <label
                      v-if="solicitud.FechaEnProceso != null"
                    >{{ new Date(solicitud.FechaEnProceso).toLocaleDateString() }}</label>
                    <label v-if="solicitud.FechaEnProceso == null">Aun no esta en Proceso</label>
                  </td>
                  <td>
                    <label
                      v-if="solicitud.FechaTerminado != null"
                    >{{new Date(solicitud.FechaTerminado).toLocaleDateString()}}</label>
                    <label v-if="solicitud.FechaTerminado == null">No se ha finalizado la Solicitud</label>
                  </td>
                  <td>
                    <label v-if="solicitud.RutaDocumento == null">No existe archivo</label>
                    <input
                      v-on:click="ShowDoc(solicitud.RutaDocumento)"
                      v-if="solicitud.RutaDocumento != null"
                      type="button"
                      value="Mostrar archivo"
                      class="btn btn_Documento"
                    >
                  </td>
                  <td>
                    <label
                      v-if="solicitud.ComentariosIT.length == 0"
                      type="text"
                    >No existen Comentarios</label>
                    <input
                      v-if="solicitud.ComentariosIT.length != 0"
                      type="button"
                      v-on:click="showComentarios(solicitud.ComentariosIT)"
                      value="Mostrar Comentarios"
                      class="btn btn_Comentarios"
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
    mounted: function(){
    },
    data: function(){
      return{
        imageData: "",
        nombre: "",
        apellidos: "",
        id: "",
        fechaInit: "",
        fechaFin: "",
        comentarios: [],
        opcion: -1,
      }
       
    }, 
    computed:{
        loadsolicitudes(){
            return this.$store.getters.solicitudes;
        },
        comentarios1: {
            get: function () {
                return this.comentarios;
            },
            set: function (v) {
                this.comentarios = v;
            }
        },
        loadcomentarios(){
            return self.comentarios
        },
        loadopcion(){
          return this.opcion
        },
    },  
    methods:{
      sendData(){
        console.log(typeof(this.opcion));
        switch (this.opcion){
          case "1": 
            if(this.apellidos != null && this.apellidos != "" && this.nombre != null && this.nombre != ""){
              this.solicitudesPorComunUsuario();
            }else{
              this.$swal('', 'Introduzca Nombre y Apellidos del Usuario', 'warning');
            }
            break;
          case "2": 
            if(this.apellidos != null && this.apellidos != "" && this.nombre != null && this.nombre != ""){
              this.solicitudesPorUsuarioIT();
            }else{
                this.$swal('', 'Introduzca Nombre y Apellidos del Usuario de IT', 'warning');
            }
            break;
          case "3": 
            if(this.fechaInit != null && this.fechaInit != "" && this.fechaFin != null && this.fechaFin != ""){
              this.solicitudesPorRangoFechas();
            }else{
              this.$swal('', 'Introduzca una Fecha Inicial y una Fecha Final', 'warning');
            }
            break;
          case "4":
            if(this.id != null && this.id != ""){
              this.solicitudesPorId();
            }else{
              this.$swal('', 'Introduzca el Folio de la Solicitud', 'warning');
            }
            break;
        }
      },
      solicitudesPorComunUsuario(){
        console.log("UsuarioComun");
            var user = this.$store.getters.user;
            var config = this.$store.getters.auth;
            setTimeout(() => {
                axios.get('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/managerUser/getSolicitudesByCommonUser/' + this.nombre + '/' + this.apellidos, config).then(response => {
                      var solicitudes = response.data.solicitudes;
                      this.$store.commit('solicitudes', solicitudes);
                      //4 o 3 dependiendo si es vendedor o cliente, pero aun en la api no nos mandan el tipo de usuario
                    }).catch(e => {
                        this.$swal('Error al cargar datos', 'Verifique su conexion a internet', 'error');
                    })
                },
                300  
            );
        },
        solicitudesPorUsuarioIT(){
          console.log("TI");
            var user = this.$store.getters.user;
            var config = this.$store.getters.auth;
            setTimeout(() => {
                axios.get('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/managerUser/getSolicitudesByITUser/' + this.nombre + '/' + this.apellidos, config).then(response => {
                      var solicitudes = response.data.solicitudes;
                      this.$store.commit('solicitudes', solicitudes);
                      //4 o 3 dependiendo si es vendedor o cliente, pero aun en la api no nos mandan el tipo de usuario
                    }).catch(e => {
                        this.$swal('Error al cargar datos', 'Verifique su conexion a internet', 'error');
                    })
                },
                300  
            );
        }, 
        solicitudesPorRangoFechas(){
          console.log("Fechas");
            var user = this.$store.getters.user;
            var config = this.$store.getters.auth;
            setTimeout(() => {
                var fecha1 = new Date(this.fechaInit).toJSON();
                var fecha2 = new Date(this.fechaFin).toJSON();
                axios.get('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/managerUser/getSolicitudesByDateRange/' + fecha1 + '/' + fecha2, config).then(response => {
                      var solicitudes = response.data.solicitudes;
                      this.$store.commit('solicitudes', solicitudes);
                      //4 o 3 dependiendo si es vendedor o cliente, pero aun en la api no nos mandan el tipo de usuario
                    }).catch(e => {
                        this.$swal('Error al cargar datos', 'Verifique su conexion a internet', 'error');
                    })
                },
                300  
            );
        }, 
        solicitudesPorId(){
          console.log("Id");
            var user = this.$store.getters.user;
            var config = this.$store.getters.auth;
            setTimeout(() => {
                axios.get('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/managerUser/getSolicitudById/' + this.id , config).then(response => {
                      var solicitudes = response.data;
                      console.warn(solicitudes);

                      this.$store.commit('solicitudes', solicitudes);
                      //4 o 3 dependiendo si es vendedor o cliente, pero aun en la api no nos mandan el tipo de usuario
                    }).catch(e => {
                        this.$swal('Error al cargar datos', 'Verifique su conexion a internet', 'error');
                    })
                },
                300  
            );
        }, 
        ShowDoc(url){
            window.open(url);
        },
        showComentarios(comentarios){
            this.$store.commit('setComentario', comentarios);
            this.$store.commit('setModal', true);
        },
    }

}
        
</script>


<style scoped>
html,
body {
  font-family: arial !important;
  font-weight: bold !important;
}

.card {
  min-height: 100vh;
  background-color: rgba(20, 20, 20, 0.8) !important;
}

.Background_Image {
  background-image: url("https://www.linckard.com/wp-content/uploads/2017/12/fondo_polygon.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  padding: 30px;
}

#divtxtIdSolicitud {
  width: 100%;
  height: 100px;
  background-color: rgba(79, 79, 80, 0.8) !important;
  text-align: center;
  vertical-align: middle;
  padding: 10px;
}

#lbl_Reportes {
  color: white;
  font-size: 21px;
  margin-top: 5vh;
  margin-right: 15px;
}

#txtIdSolicitudes {
  color: white;
  font-size: 60px;
}

input {
  background-color: #f5f5f5;
  border-color: #f5f5f5;
  color: black;
}

#txtIdVI_1 {
  color: white;
  width: 550px;
}

.input-group-prepend span {
  background-color: #e0e0e0;
  border: 0 !important;
}
.Label_Text {
  margin-top: 0px;
  color: white;
  font-size: 25px;
  margin-bottom: 0px;
}

.btn_Enviar_Datos {
  background-color: #1976d2;
  color: white;
  width: 500px;
  border: 0 !important;
  font-weight: bold !important;
}

.btn_Enviar_Datos:hover {
  background-color: #145faa;
  color: white;
}

#tbl_solicitudes {
  margin-top: 10vh;
}

#Out_Table {
  background-color: rgba(79, 79, 80, 0.8) !important;
  padding: 30px;
}

#In_Table {
  border: 0 !important;
}

#In_Table > thead {
  background-color: rgba(25, 118, 210) !important;
  color: white;
}

.btn_Documento {
  background-color: #1976d2;
  border: 0 !important;
  color: white;
  font-weight: bold !important;
}

.btn_Documento:hover {
  background-color: white;
  color: black;
}

.btn_Comentarios {
  background-color: #1976d2;
  border: 0 !important;
  color: white;
  font-weight: bold !important;
}

.btn_Comentarios:hover {
  background-color: white;
  color: black;
}

#btn_Cerrar {
  width: 500px;
}
</style>
