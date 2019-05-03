<template>
  <div class="Background_Image">
    <div class="card">
      <div class="card-body">
        <h3>Mis solicitudes</h3>
        <v-div class="draggable centerh_mov" id="Out_Table">
        <div id="Out_Table">
          <table class="table draggable table-striped table-dark" id="In_Table">
            <thead>
              <tr class="mg">
                <th>Folio</th>
                <th>Status</th>
                <th>Prioridad</th>
                <th>Razon</th>
                <th>Quien Atiende</th>
                <th>Ver Comentarios</th>
                <th>Ver Documento</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(solicitud) in loadsolicitudes" v-bind:key="solicitud">
                <th>{{ solicitud._id}}</th>
                <th>
                  <label
                    v-if="solicitud.FechaCreacion != null && solicitud.FechaEnProceso == null"
                  >Pendiente</label>
                  <label
                    v-if="solicitud.FechaEnProceso != null && solicitud.FechaTerminado == null"
                  >En Proceso</label>
                  <label v-if="solicitud.FechaTerminado != null">Finalizado</label>
                </th>
                <th>
                  <label v-if="solicitud.Prioridad == 2" style="color: #b71c1c;">Alta</label>
                  <label v-if="solicitud.Prioridad == 1" style="color: #F57F17;">Media</label>
                  <label v-if="solicitud.Prioridad == 0" style="color: #2E7D32;">Baja</label>
                </th>
                <th>{{ solicitud.Razon }}</th>
                <th>
                  <label v-if="solicitud.UsuarioIT.IdUsuarioIT == -1">Nadie Atiende</label>
                  <label
                    v-if="solicitud.UsuarioIT.IdUsuarioIT != -1"
                  >{{ solicitud.UsuarioIT.NombreCompleto }}</label>
                </th>
                <th>
                  <label v-if="solicitud.ComentariosIT.length == 0">No hay Comentarios</label>
                  <input
                    v-if="solicitud.ComentariosIT.length != 0"
                    class="btn btn_Comentarios"
                    type="button"
                    v-on:click="showComentarios(solicitud.ComentariosIT)"
                    value="Mostrar Comentarios"
                  >
                </th>
                <th>
                  <label v-if="solicitud.RutaDocumento == null">No existe archivo</label>
                  <input
                    class="btn btn_Documento"
                    v-on:click="ShowDoc(solicitud.RutaDocumento)"
                    v-if="solicitud.RutaDocumento != null"
                    type="button"
                    value="Mostrar archivo"
                  >
                </th>
              </tr>
            </tbody>
          </table>
        </div>
          <div v-if="loadcomentarios != null">
            <div v-for="comentario in loadcomentarios" v-bind:key="comentario">
              <textarea :name="comentario" cols="30" rows="10"></textarea>
            </div>
          </div>
        </v-div>
        <div>
          <modal></modal>
        </div>
        <v-div
          class="draggable centerh_mov"
          style="top: 496px; width: 460px; height: 51px; left: 2px;"
        >
          <h3>Nueva Solicitud</h3>
        </v-div>
        <v-div
          class="draggable centerh_mov"
          style="top: 583.19px; width: 1026px; height: 108px; left: 62.0788px;"
        >
          <v-div class="form-group draggable input centerh_mov" style="top: 18px;">
            <label for="comment" id="lbl_Comentarios">Comentario:</label>
            <textarea
              v-model="razon"
              data-validate="NNNN[]N[]NNN"
              class="form-control txta_Comentarios"
              id="comment"
            ></textarea>
          </v-div>
          <!-- <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"> -->
          <div class="input-group" style="margin-top: 20px;">
            <div class="input-group-prepend">
              <span class="input-group-text justify-content-center" id="inputGroupFileAddon01" style="width: 200px; font-weight: bold;">Subir Archivo</span>
            </div>
            <div class="custom-file">
              <b-form-file
                style="width: 600px;"
                id="file"
                ref="file"
                v-on:change="handleFileUpload()"
                v-model="file"
                :state="Boolean(file)"
                placeholder="Choose a file..."
                drop-placeholder="Drop file here..."
                class="file_upload"
              ></b-form-file>
            </div>
          </div>
          <div class="input-group" style="margin-top: 20px;">
            <div class="input-group-prepend">
              <span class="input-group-text justify-content-center" id="inputGroupFileAddon01" style="width: 200px; font-weight: bold;">Prioridad</span>
            </div>
            <div class="custom-file">
              <select v-model="priority" class="custom-select" style="width: 600px;">
                <option value="0" selected>Baja</option>
                <option value="1">Media</option>
                <option value="2">Alta</option>
              </select>
            </div>
          </div>
        </v-div>
        <v-div
          class="draggable centerh_mov"
          style="top: 732px; width: 232px; height: 86px; left: 12px;"
        >
          <button
            v-on:click="createSolicitud"
            type="button"
            class="btn draggable centerh_mov" id="btn_Guardar"
            style="margin-top: 20px; font-weight: bold;"
          >Guardar y enviar solicitud</button>
        </v-div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<script>
import axios from "axios";
import modal from "./comentarios.vue";

export default {
  componets: {
    modal
  },
  mounted: function() {
    this.getData();
  },
  data: {
    file: null,
    imageData: "",
    razon: "",
    status: "",
    priority: 4,
    comentarios: [],
    showModal: false
  },
  computed: {
    loadsolicitudes() {
      return this.$store.getters.solicitudes;
    },
    comentarios: {
      get: function() {
        return this.comentarios;
      },
      set: function(v) {
        this.comentarios = v;
      }
    },
    loadcomentarios() {
      return self.comentarios;
    }
  },
  methods: {
    getData() {
      var user = this.$store.getters.user;
      var config = this.$store.getters.auth;
      setTimeout(() => {
        axios
          .get(
            "https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/commonUser/getMySolicitudes/" +
              user.Id,
            config
          )
          .then(response => {
            this.$store.commit("solicitudes", response.data.solicitudes);
            //4 o 3 dependiendo si es vendedor o cliente, pero aun en la api no nos mandan el tipo de usuario
          })
          .catch(e => {
            this.$swal(
              "Error al cargar datos",
              "Verifique su conexion a internet",
              "error"
            );
          });
      }, 300);
    },
    ShowDoc(url) {
      window.open(url);
    },
    showComentarios(comentarios) {
      this.$store.commit("setComentario", comentarios);
      this.$store.commit("setModal", true);
    },
    createSolicitud() {
      var user = this.$store.getters.user;
      var config = this.$store.getters.auth;
      var form_data = new FormData();

      var solicitud = {
        idUsuario: user.Id,
        fechaCreacion: new Date().toJSON(),
        razon: this.razon,
        prioridad: 2,
        fichero: this.imageData != null ? this.imageData : ""
      };
      if (this.razon != null) {
        if (this.priority != undefined) {
          form_data.append("idUsuario", user.Id);
          form_data.append(
            "nombreCompleto",
            user.Nombre + " " + user.Apellidos
          );
          form_data.append("fechaCreacion", new Date().toJSON());
          form_data.append("razon", this.razon);
          form_data.append("prioridad", this.priority);
          form_data.append(
            "fichero",
            this.imageData != null ? this.imageData : ""
          );

          setTimeout(() => {
            axios
              .post(
                "https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/commonUser/sendSolicitud",
                form_data,
                config
              )
              .then(response => {
                //this.$store.commit('changes', JSON.stringify(response.data));
                this.$swal(
                  "Solicitud Enviada",
                  "Su solicitud será atendida en breve",
                  "success"
                );
                this.razon = "";
                this.getData();
                //4 o 3 dependiendo si es vendedor o cliente, pero aun en la api no nos mandan el tipo de usuario
              })
              .catch(e => {
                this.$swal(
                  "Error al crear solicitud",
                  "Verifique su conexion a internet",
                  "error"
                );
              });
          }, 300);
        } else {
          this.$swal(" ", "Seleccione el tipo de Prioridad", "warning");
        }
      } else {
        this.$swal(" ", "Ingrese el motivo de su solicitud", "warning");
      }
    },
    handleFileUpload() {
      this.imageData = this.$refs.file.files[0];
    }
  }
};
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
  background-image: url("https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/4RUieTItxik2c5fvx/vector-orange-waves-with-light-showing-through-motion-background-lighting-effects-4k-ultra-high-definition-animation-loop_bimbmnwarg_thumbnail-full01.png");
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
  color: white;
  font-size: 60px;
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

h3 {
  color: white;
  text-align: center;
  font-weight: bold;
}

#lbl_Comentarios {
  color: white;
  text-align: center;
  font-weight: bold;
}

.txta_Comentarios {
  width: 800px;
}

.file_upload {
  width: 500px;
}

#btn_Guardar {
  background-color: #1976d2;
  color: white;
  width: 800px;
  border: 0 !important;
  font-weight: bold !important;
}

#btn_Guardar:hover {
  background-color: white;
  color: black;
}
</style>

