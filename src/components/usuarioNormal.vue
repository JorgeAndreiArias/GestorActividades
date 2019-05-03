<template>
    <div>   
        <h1>Mis Solicitudes</h1>
    <v-div class="draggable centerh_mov" style="top: 130px; width: 982px; height: 327px; left: 3px;">
        <table class="ui celled table draggable" style="top: 1px; left: 1px;">
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
                <tr v-for="(solicitud) in loadsolicitudes" v-bind:key="solicitud">
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
      <div v-if="loadcomentarios != null">
          <div v-for="comentario in loadcomentarios" v-bind:key="comentario">
            <textarea :name="comentario" cols="30" rows="10"></textarea>
        </div>
      </div>
      
    </v-div> 
     <div >
         <modal ></modal>
     </div>
    <v-div class="draggable centerh_mov" style="top: 496px; width: 460px; height: 51px; left: 2px;">
        <span class="label label-success draggable centerh_mov" style="top: 0px; font-size: 30px;">Nueva Solicitud
        </span>
    </v-div> 
        <v-div class="draggable centerh_mov" style="top: 583.19px; width: 1026px; height: 108px; left: 62.0788px;">
            <v-div class="form-group draggable input left_mov" style="top: 18px;">  
                <label for="comment">Comentario:
                </label>
                <textarea v-model="razon" data-validate="NNNN[]N[]NNN" style="width:100%;height:100%;" class="form-control" id="comment">        
                </textarea>
            </v-div>
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
            <br>
            <label>Prioridad: </label>
            <select v-model="priority">
                <option value="0" selected>Baja</option>
                <option value="1">Media</option>
                <option value="2">Alta</option>
            </select>
            
        </v-div> 
        <br/>
        <v-div class="draggable centerh_mov" style="top: 732px; width: 232px; height: 86px; left: 12px;">
            <button v-on:click="createSolicitud" type="button" class="btn btn-info draggable centerh_mov" style="top: 0px;">Guardar y enviar solicitud
            </button>
                
        </v-div>
        <br/>
        <br/>
        
    </div>
</template>

<script>

</script>

<script>
import axios from 'axios';
import modal from './comentarios.vue'

export default {
    componets:{
        modal
    },
    mounted: function(){
        this.getData();
    },
    data:{
        imageData: "",
        razon: "",
        status: "",
        priority: 4,
        comentarios: [],
        showModal: false,
    }, 
    computed:{
        loadsolicitudes(){
            return this.$store.getters.solicitudes;
        },
        comentarios: {
            get: function () {
                return this.comentarios;
            },
            set: function (v) {
                this.comentarios = v;
            }
        },
        loadcomentarios(){
            return self.comentarios
        }
    },  
    methods:{
        getData(){
            var user = this.$store.getters.user;
            var config = this.$store.getters.auth;
            setTimeout(() => {
                axios.get('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/commonUser/getMySolicitudes/' + user.Id, config).then(response => {
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
        ShowDoc(url){
            window.open(url);
        },
        showComentarios(comentarios){
            this.$store.commit('setComentarios', comentarios);
            this.$store.commit('setModal', true);
        },
        createSolicitud(){
            var user = this.$store.getters.user;
            var config = this.$store.getters.auth;
            var form_data =  new FormData();

            var solicitud = {
                "idUsuario": user.Id,
                "fechaCreacion": new Date().toJSON(),
                "razon": this.razon,
                "prioridad": 2,
                "fichero": this.imageData != null ? this.imageData : "",
            };
            if(this.razon != null){
                if(this.priority != undefined){
                    form_data.append("idUsuario", user.Id);
                    form_data.append("nombreCompleto", user.Nombre + " " + user.Apellidos);
                    form_data.append("fechaCreacion", new Date().toJSON());
                    form_data.append("razon", this.razon);
                    form_data.append("prioridad", this.priority);
                    form_data.append("fichero", this.imageData != null ? this.imageData : "");

                    setTimeout(() => {
                        axios.post('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/commonUser/sendSolicitud', form_data ,config).then(response => {
                            //this.$store.commit('changes', JSON.stringify(response.data));
                            this.$swal('Solicitud Enviada', 'Su solicitud será atendida en breve', 'success');
                            this.razon = "";
                            this.getData();
                            //4 o 3 dependiendo si es vendedor o cliente, pero aun en la api no nos mandan el tipo de usuario
                            }).catch(e => {
                            this.$swal('Error al crear solicitud', 'Verifique su conexion a internet', 'error');
                            })
                        },
                        300
                    );
                }else{
                    this.$swal(' ', 'Seleccione el tipo de Prioridad', 'warning');
                }
                
            }else{
                    this.$swal(' ', 'Ingrese el motivo de su solicitud', 'warning');
            }            
        },
        handleFileUpload(){
            this.imageData = this.$refs.file.files[0];
        }
    }

}
        
</script>

<style>

</style>
