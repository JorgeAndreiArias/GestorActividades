<template>
    <div class="Background_Image">
    <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="card">
          <div class="card-header">
            <h3>Sign Up</h3>
          </div>
          <div class="card-body">
            <form v-on:submit.prevent="submit1" method="POST">
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
                <input type="text" class="form-control" placeholder="Name" v-model="name">
              </div>
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
                <input type="text" class="form-control" placeholder="Last Name" v-model="lastname">
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
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-key"></i>
                  </span>
                </div>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Confirm Password"
                  v-model="passwordagain"
                >
              </div>
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-envelope"></i>
                  </span>
                </div>
                <input type="text" class="form-control" placeholder="Email" v-model="email">
              </div>
              <div class="form-group">
                <input
                  id="btnIdLogin"
                  type="submit"
                  value="Sign Up"
                  class="btn float-right Class_Btn_Login"
                >
              </div>
            </form>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-center links">
              Have an account?
              <a v-on:click="login" href="#">Login</a>
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
            lastname: null, 
            passwordagain: null,
            email: null,
            user: {},
            correct: null
        },
        mounted: function(){
           
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
            login(){
                this.$store.commit('change', 1);
            },
            checkForm(){
              var error = ""
              console.log(error);
              if(this.name == null || this.name == ""){
                error += "name";
              }
              if(this.lastname == null || this.lastname == ""){
                error += "lastname";
              }
              if(this.password == null || this.password == ""){
                error += "pass";
              }
              if(this.passwordagain == null || this.passwordagain == ""){
                error += "pass1";
              }
              if(this.email == null || this.email == ""){
                error += "email";
              }
              if(error == ""){
                return true;

              }else{
                return false;
              }
            },
            submit1() {
            var  self = this;
              var bol = self.checkForm();
              if(bol){
                if(this.password == this.passwordagain){
                  var objUser = {
                  "nombre": this.name,
                  "apellidos": this.lastname,
                  "contrasena": this.password,
                  "email": this.email,
                };
                console.warn(objUser);
                setTimeout(() => {
                  axios.post('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/signup', objUser).then(response => {
                      //this.$store.commit('changes', JSON.stringify(response.data));
                      alert(JSON.stringify(response));
                      this.$swal('Registro Correcto', 'Activa tu cuenta con tu correo', 'success');
                      this.$store.commit('change', 1);
                      //4 o 3 dependiendo si es vendedor o cliente, pero aun en la api no nos mandan el tipo de usuario
                  }).catch(e => {
                      this.$swal('Error de Registro', 'No se pudo registrar el usuario', 'error');
                  })
              },
              300
              );
              }
              else{
                this.$swal('Contraseñas Diferentes', 'Verifica que las contraseñas sean iguales', 'warning');
              }
              }else{
                this.$swal('Campos Vacíos', 'Verifica que todos los campos esten llenos', 'warning');
              }
            }
        },
    }   
</script>

<style scoped>
html,
body {
  height: 100% !important;
  font-family: arial;
  font-weight: bold;
}

.Background_Image {
  height: 100% !important;
  background-image: url("https://img.wallpapersafari.com/desktop/1920/1080/41/32/27kXHj.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover !important;
  height: 100vh !important;
}

.container {
  height: 100% !important;
  align-content: center;
}

.card {
  height: 520px;
  margin-top: auto;
  margin-bottom: auto;
  width: 400px;
  background-color: rgba(0, 0, 0, 0.6) !important;
  z-index: 1;
}

.social_icon span {
  font-size: 60px;
  margin-left: 10px;
  color: #FFA000;
}

.card-header h3 {
  color: white;
  font-size: 45px;
  text-align: center;
  font-weight: bold;
}

.input-group-prepend span {
  width: 50px;
  background-color: #FFA000;
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
  background-color: #FFA000;
  width: 100px;
  font-weight: bold;
}

.Class_Btn_Login:hover {
  color: black;
  background-color: white;
}

.Class_Btn_Password {
  color: white;
  background-color: #FFA000;
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