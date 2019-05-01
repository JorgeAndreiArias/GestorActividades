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
                <tr v-for="solicitud in loadsolicitudes" v-bind:key="solicitud">
                    <th>{{ solicitud._id}}</th>
                    <th>{{ solicitud.Prioridad }}</th>
                    <th>{{ solicitud.Razon }}</th>
                    <th>{{ solicitud.UsuarioIT }}</th>
                    
                </tr>
            </tbody>
      </table>
    </v-div> 
     
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
            
            <v-div class="dropdown draggable" style="width: 173px; top: 48.6281px; left: 809.296px; height: 40px;">
                <button class="btn btn-primary dropdown-toggle mg right_mov" type="button" data-toggle="dropdown">Prioridad
                    <span class="caret">
                    </span>
                </button>
                <br/>
            </v-div>
        </v-div> 
        <v-div class="draggable centerh_mov" style="top: 732px; width: 232px; height: 86px; left: 12px;">
            <button v-on:click="createSolicitud" type="button" class="btn btn-info draggable centerh_mov" style="top: 0px;">Guardar y enviar solicitud
            </button>
        </v-div>
        <ul class="dropdown-menu">
            <li class="dg_menu">
                <a href="#">Baja
                </a>
                <a href="#">Media
                </a>
                <a href="#">Alta
                </a>
            </li>
        </ul>
    </div>
</template>

<script>

</script>

<script>
import axios from 'axios';

export default {
    mounted: function(){
        this.getData();
    },
    data:{
        imageData: "",
        razon: "",
    }, 
    computed:{
        loadsolicitudes(){
            console.warn(this.$store.getters.solicitudes);
            return this.$store.getters.solicitudes.solicitudes;
        }
    },  
    methods:{
        getData(){
            var user = this.$store.getters.user;
            var config = this.$store.getters.auth;
            console.log(config);
            console.log(user.Id);
            setTimeout(() => {
                axios.get('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/commonUser/getMySolicitudes/' + user.Id, config).then(response => {
                      alert(JSON.stringify(response)); 
                      this.$store.commit('solicitudes', response.data);
                      //4 o 3 dependiendo si es vendedor o cliente, pero aun en la api no nos mandan el tipo de usuario
                    }).catch(e => {
                        this.$swal('Error al cargar datos', 'Verifique su conexion a internet', 'error');
                    })
                },
                300
            );
        }, 
        createSolicitud(){
            var user = this.$store.getters.user;
            var config = this.$store.getters.auth;
            var form_data =  new FormData();
            console.warn(this.imageData);
            var solicitud = {
                "idUsuario": user.Id,
                "fechaCreacion": new Date().toJSON(),
                "razon": this.razon,
                "prioridad": 2,
                "fichero": this.imageData,
            };

            form_data.append("idUsuario", user.Id);
            form_data.append("fechaCreacion", new Date().toJSON());
            form_data.append("razon", this.razon);
            form_data.append("prioridad", 2);
            form_data.append("fichero", this.imageData);

            setTimeout(() => {
                axios.post('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/commonUser/sendSolicitud', form_data ,config).then(response => {
                      //this.$store.commit('changes', JSON.stringify(response.data));
                      alert(JSON.stringify(response));
                      console.log("Data Loaded");
                      //4 o 3 dependiendo si es vendedor o cliente, pero aun en la api no nos mandan el tipo de usuario
                    }).catch(e => {
                      this.$swal('Error al crear solicitud', 'Verifique su conexion a internet', 'error');
                    })
                },
                300
            );
        },
        handleFileUpload(){
            this.imageData = this.$refs.file.files[0];
        }
    }

}
        
</script>

<style>

</style>
