<template>
    <div class="Background_Image" >
    <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="card">
          <div class="card-header">
            <h3>Login</h3>
          </div>
          <div class="card-body">
            <form v-on:submit.prevent="Auth">
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-envelope"></i>
                  </span>
                </div>
                <input type="text" class="form-control" placeholder="Email" v-model="name">
              </div>
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-key"></i>
                  </span>
                </div>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="password"
                >
              </div>
              <div class="form-group">
                <input
                  id="btnIdLogin"
                  type="submit"
                  value="Login"
                  class="btn float-right Class_Btn_Login"
                >
              </div>
              <div class="form-group">
                <button v-on:click="Recover" type="button" class="btn Class_Btn_Password">
                  Forgot Your
                  Password?
                </button>
              </div>
            </form>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-center links">
              Don't have an account?
              <a v-on:click="signin" href="#">Sign Up</a>
            </div>
          </div>
          <div class="form-group"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import sha256 from 'sha256';


    export default{
        data: {
            name: null,
            password: null,
            user: {},
        },
        mounted: function(){
           this.ExistSession();
        },
        computed:{
            user1: {
                get: function () {
                    return this.user;
                },
                set: function (v) {
                    this.user = v;
                }
            }, 
        },
        methods: {
             ExistSession() {
                console.log("Running")
                if(this.$cookies.isKey('UserAuth')){
                    this.$store.commit('auth', this.$cookies.get('Token'));
                    console.log(this.$cookies.get('Token'));
                    this.$store.commit('user', this.$cookies.get('UserAuth'));
                    console.log(this.$cookies.get('UserAuth'));
                     switch(this.$cookies.get('UserAuth').Tipo){
                      case 0:
                      //Usuario Comun
                        this.$store.commit('change', 3);
                        break;
                      case 1: 
                      //Usuario TI
                        this.$store.commit('change', 4);
                        break;
                      case 2:
                      //Gerente
                        this.$store.commit('change', 5);
                        break;
                    }
                }else{
                    console.warn("The Cookie doesnt exist");
                }
             },
            Auth() {
            var  self = this;
            var objUser = {
                "email": this.name,
                "contrasena": this.password,
            };
            setTimeout(() => {
              console.warn(objUser);
                axios.post('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/login', objUser).then(response => {
                    //this.$store.commit('changes', JSON.stringify(response.data));
                    alert(JSON.stringify(response.data.token));
                    var config = { 
                      "headers": { 
                        "Authorization": 'Bearer ' + response.data.token,
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*'
                      }
                    }
                    var user = atob(response.data.token.split('.')[1]);
                    var user = JSON.parse(user);
                    var cad = new Date(user.exp * 1000);//fecha que expira
                    var date1 = Date.now();//fecha actual
                    date1 = new Date(date1);//convertit formato fecha
                    var diffTime = Math.abs(cad.getTime() - date1.getTime());//diferencia de tiempo
                    diffTime = diffTime / 1000; //convertir a segundos
                    var expires = Math.round(diffTime/60); //convertir a minutos
                    console.log(expires);
                    this.$store.commit('auth', config);
                    this.$store.commit('user', user);
                    this.$cookies.set('UserAuth', user, expires + "MIN");
                    this.$cookies.set('Token', config, expires + "MIN");
                    switch(user.Tipo){
                      case 0:
                      //Usuario Comun
                        this.$store.commit('change', 3);
                        break;
                      case 1: 
                      //Usuario TI
                        this.$store.commit('change', 4);
                        break;
                      case 2:
                      //Gerente
                        this.$store.commit('change', 5);
                        break;
                    }
                   
                }).catch(e => {
                    this.$swal('Error de Inicio de Sesión', 'Verifica tu email y tu contraseña', 'error');
                })
            },
            300
            );
            },
            signin(){
              this.$store.commit('change', 2);
            },
            Recover(){
              if(this.name != "" && this.name != null){
                var objUser = {
                "email": this.name,
                };
              setTimeout(() => {
                axios.post('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com//api/passwordRecovery', objUser).then(response => {
                    //this.$store.commit('changes', JSON.stringify(response.data));
                    alert(JSON.stringify(response));
                    this.$swal(' ', 'Se ha enviado un correo con tu contraseña', 'OK');
                    //4 o 3 dependiendo si es vendedor o cliente, pero aun en la api no nos mandan el tipo de usuario
                }).catch(e => {
                    this.$swal('Error al recuperar contraseña', 'Verifica que el correo es correcto', 'error');
                })
              },
              300
              );
              }else{
                 this.$swal(' ', 'Ingrese el correo con el que te registraste', 'OK');
              }
              
            }
        },
    }   
</script>

<style scoped>
   
html,
body {
  height: 100% !important;
  font-family: arial !important;
  font-weight: bold !important;
}

.Background_Image {
  height: 100% !important;
  background-image: url("https://cdn.allwallpaper.in/wallpapers/1920x1080/9567/fog-over-a-pine-forest-1920x1080-wallpaper.jpg");
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  height: 100vh !important;
}

.container {
  height: 100% !important;
  align-content: center !important;
}

.card {
  height: 340px;
  margin-top: auto;
  margin-bottom: auto;
  width: 400px;
  background-color: rgba(0, 0, 0, 0.6) !important;
  z-index: 1;
}

.social_icon span {
  font-size: 60px;
  margin-left: 10px;
  color: #1976d2;
}

.card-header h3 {
  color: white;
  font-size: 45px;
  text-align: center;
  font-weight: bold;
}

.input-group-prepend span {
  width: 50px;
  background-color: #1976d2;
  color: white;
  border: 0 !important;
}

input:focus {
  outline: 0 0 0 0 !important;
  box-shadow: 0 0 0 0 !important;
}

.remember {
  color: white;
}

.remember input {
  width: 20px;
  height: 20px;
  margin-left: 15px;
  margin-right: 5px;
}

.Class_Btn_Login {
  color: white;
  background-color: #1976d2;
  width: 100px;
  font-weight: bold;
}

.Class_Btn_Login:hover {
  color: black;
  background-color: white;
}

.Class_Btn_Password {
  color: white;
  background-color: #1976d2;
  width: 220px;
  font-weight: bold;
}

.Class_Btn_Password:hover {
  color: black;
  background-color: white;
}

.links {
  color: white;
}

.links a {
  margin-left: 4px;
}
</style>


