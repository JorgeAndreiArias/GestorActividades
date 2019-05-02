<template>
    <div>
        <div class="draggable centerh_mov" style="top: 24px; width: 380px; height: 241px;">
            <span class="label label-primary draggable centerh_mov" style="top: 6px; width: 167px; height: 43px; font-size: 25px; left: 1px; text-shadow: rgba(0, 0, 0, 0.4) 2px 2px 2px;">Solicitudes
            </span>

          <div class="form-group draggable select centerh_mov" style="top: 65px; width: 100px; height: 52px; left: 4px;">        
            <label for="sel1">Revisar reportes por:
              </label>
              <select v-model="opcion">
                <option disabled >Elige una opcion</option>
                <option value="1">Usuario
                </option>
                <option value="2">Personal TI
                </option>
                <option value="3">Periodo
                </option>
                <option value="4">Ticket
                </option>
              </select>
          </div>
          <br/>
          <div v-if="opcion == 1 || opcion == 2" class="form-group draggable input centerh_mov" style="top: 167.5px; width: 162px; height: 64px; left: 2px;">
              <input type="text" v-model="nombre" data-validate="NNNN[]N[]NNN" placeholder="Nombre" class="form-control">
              <input type="text" v-model="apellidos" data-validate="NNNN[]N[]NNN" placeholder="Apellidos" class="form-control">
          </div>
          <div v-if="opcion == 3" class="form-group draggable input centerh_mov" style="top: 167.5px; width: 162px; height: 64px; left: 2px;">
              <input type="date" v-model="fechaInit" data-validate="NNNN[]N[]NNN" placeholder="Fecha Inicial" class="form-control">
              <input type="date" v-model="fechaFin" data-validate="NNNN[]N[]NNN" placeholder="Fecha Final" class="form-control">
          </div>
          <div v-if="opcion == 4" class="form-group draggable input centerh_mov" style="top: 167.5px; width: 162px; height: 64px; left: 2px;">
              <input type="text" v-model="id" data-validate="NNNN[]N[]NNN" placeholder="Folio de Solicitud" class="form-control">
          </div>
          <input v-if="opcion != -1" type="button" value="Enviar Datos" v-on:click="sendData">
        </div> 
    <div v-if="loadsolicitudes != null" class="draggable centerh_mov" style="top: 296.632px; width: 1006px; height: 398px; left: 7px;">
      <table class="ui celled table draggable" style="top: 55px; left: 5px; width: 989px; height: 118px;">
        <thead>
          <tr class="mg">            
            <th>ID
            </th>
            <th>Creada por
            </th>
            <th>Atiende/Atendió
            </th>
            <th>Prioridad
            </th>
            <th>Creado
            </th>
            <th>En proceso
            </th>
            <th>Terminado
            </th>
            <th>Doc
            </th>
            <th>Comentarios
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="mg" v-for="(solicitud, index) in loadsolicitudes" v-bind:key="solicitud">
            <td>{{ solicitud._id }}</td>
            <td>{{ solicitud.UsuarioComun.NombreCompleto }}</td>
            <td>
                <label v-if="solicitud.UsuarioIT.IdUsuarioIT == -1">Nadie Atiende </label>
                <label v-if="solicitud.UsuarioIT.IdUsuarioIT != -1">{{ solicitud.UsuarioIT.NombreCompleto}}</label>
            </td>
            <td>
                <label v-if="solicitud.Prioridad == 2">Alta</label>
                <label v-if="solicitud.Prioridad == 1">Media</label>
                <label v-if="solicitud.Prioridad == 0">Baja</label>
            </td>
            <td>
                <label v-if="solicitud.FechaCreacion != null">{{ new Date(solicitud.FechaCreacion).toLocaleDateString() }}</label>
                <label v-if="solicitud.Prioridad == null">No hay fecha que mostrar</label>
            </td>
            <td>
                <label v-if="solicitud.FechaEnProceso != null">{{ new Date(solicitud.FechaEnProceso).toLocaleDateString() }}</label>
                <label v-if="solicitud.FechaEnProceso == null">Aun no esta en Proceso</label>
            </td>
            <td>
                <label v-if="solicitud.FechaTerminado != null">{{new Date(solicitud.FechaTerminado).toLocaleDateString()}}</label>
                <label v-if="solicitud.FechaTerminado == null">No se ha finalizado la Solicitud</label>
            </td>
            <td>
                <label  v-if="solicitud.RutaDocumento == null">No existe archivo</label>
                <input v-on:click="ShowDoc(solicitud.RutaDocumento)"  v-if="solicitud.RutaDocumento != null" type="button" value="Mostrar archivo">
            </td>
            <td>
                <label  v-if="solicitud.ComentariosIT.length == 0" type="text" >No existen Comentarios</label>
                <input  v-if="solicitud.ComentariosIT.length != 0" type="button" v-on:click="showComentarios(index)" value="Mostrar Comentarios">
            </td>
          </tr>
        </tbody>
      </table>
    </div> 
    <div id="Comentarios" class="draggable centerh_mov" style="width: 482px; height: 242px; bottom: 0px; top: 736.675px; left: 11.9609px;">
      <span class="label label-info draggable centerh_mov" style="top: 0px; width: 282px; height: 46px; font-size: 25px; text-shadow: rgba(0, 0, 0, 0.4) 2px 2px 2px; left: -10px;">Comentarios Actuales
      </span>
      <div class="form-group draggable input centerh_mov" style="top: 66.5px; left: 0px;">  
        <label for="comment">Comentarios:
        </label>
        <textarea data-validate="NNNN[]N[]NNN" style="width:100%;height:100%;" class="form-control" id="comment">        
        </textarea>
      </div>
      <button type="button" class="btn btn-danger draggable centerh_mov" style="top: 162.5px; width: 70px; height: 30px; left: 4px;" onclick="OcultarMostrarComentarios();">Cerrar
      </button>
      <p>{{ opcion }}</p>
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
          console.log("UsuarioComun");
          this.solicitudesPorComunUsuario();
            break;
          case "2": 
          this.solicitudesPorUsuarioIT();
            break;
          case "3": 
          this.solicitudesPorRangoFechas();
            break;
          case "4":
            this.solicitudesPorId();
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
        showComentarios(id){
            var soli =  this.$store.getters.solicitudes;
            self = this;
            self.comentarios = soli.ComentariosIT;
        },
    }

}
        
</script>


<style>

</style>
