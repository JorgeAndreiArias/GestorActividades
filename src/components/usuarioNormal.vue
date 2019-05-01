<template>
    <div>   
        <h1>Mis Solicitudes</h1>
    <v-div class="draggable centerh_mov" style="top: 130px; width: 982px; height: 327px; left: 3px;">
        <table class="ui celled table draggable" style="top: 1px; left: 1px;">
            <thead>
                <tr class="mg">      
                    <th>Tarea       
                    </th>
                    <th>Status
                    </th>
                    <th>Quien Atiende
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="solicitud in solicitudes" v-bind:key="solicitud">
                    <th>{{ solicitud.Tarea }}</th>
                    <th>{{ solicitud.estatus }}</th>
                    <th>{{ solicitud.UsuarioIT }}</th>
                    <th>{{ solicitud.Total }}</th>
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
                <textarea data-validate="NNNN[]N[]NNN" style="width:100%;height:100%;" class="form-control" id="comment">        
                </textarea>
            </v-div>
            <input type="file" @change="previewImage" >
            
            <v-div class="dropdown draggable" style="width: 173px; top: 48.6281px; left: 809.296px; height: 40px;">
                <button class="btn btn-primary dropdown-toggle mg right_mov" type="button" data-toggle="dropdown">Prioridad
                    <span class="caret">
                    </span>
                </button>
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
            </v-div>
        </v-div> 
        <v-div class="draggable centerh_mov" style="top: 732px; width: 232px; height: 86px; left: 12px;">
            <button type="button" class="btn btn-info draggable centerh_mov" style="top: 0px;">Guardar y enviar solicitud
            </button>
        </v-div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    mounted: function(){
        this.getData();
    },
    data:{
        imageData: ""
    }, 
    computed:{

    },
    methods:{
        getData(){
            var user = this.$store.getters.user;
            var config = this.$store.getters.auth;
            console.log(config);
            console.log(user.Id);
            setTimeout(() => {
                axios.get('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/commonUser/getMySolicitudes/' + user.Id, config).then(response => {
                      //this.$store.commit('changes', JSON.stringify(response.data));
                      alert(JSON.stringify(response));
                      console.log("Data Loaded");
                      //4 o 3 dependiendo si es vendedor o cliente, pero aun en la api no nos mandan el tipo de usuario
                    }).catch(e => {
                      this.$swal('Error al cargar datos', 'Verifique su conexion a internet', 'error');
                    })
                },
                300
            );
        }, 
        createSolicitud(){
            var solicitud = {
                "idUsuario": "",
                "fechaCreacion": "",
                "razon": "",
                "prioridad": "",
            };
        },
        previewImage: function(event) {
            var fileTypes = ['jpg', 'pdf', 'png'];
            // Reference to the DOM input element
            var input = event.target;
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                var extension = input.files[0].name.split('.').pop().toLowerCase(),  //file extension from input file
                var isSuccess = fileTypes.indexOf(extension) > -1;
                // create a new FileReader to read this image and convert to base64 format
                if(isSuccess){
                    var reader = new FileReader();
                // Define a callback function to run, when FileReader finishes its job
                    reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                        this.imageData = e.target.result;
                        console.log(this.imageData);
                    }
                // Start the reader job - read file as a data url (base64 format)
                    reader.readAsDataURL(input.files[0]);
                }
                
            }
        }
    }

}
</script>

<style>

</style>
