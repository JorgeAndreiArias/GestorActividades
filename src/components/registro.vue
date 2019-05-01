<template>
    <div class="container">
    <h1>Sign in </h1>
        <form action="#" v-on:submit.prevent="submit1" method="POST">
            <input type="text" placeholder="name" v-model="name" class="field">
            <input type="text" placeholder="last name" v-model="lastname" class="field">
            <input type="password" placeholder="password" v-model="password" class="field">
            <input type="password" placeholder="password again" v-model="passwordagain" class="field">
            <input type="text" placeholder="email" v-model="email" class="field">
            <input type="submit" value="sign in" class="btn">
        </form>
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
                  "contrasena": sha256(this.password),
                  "email": this.email,
                };
                console.warn(objUser);
                setTimeout(() => {
                  axios.post('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/signup', objUser).then(response => {
                      //this.$store.commit('changes', JSON.stringify(response.data));
                      alert(JSON.stringify(response));
                      this.$swal('Registro Correcto', 'Activa tu cuenta con tu correo', 'success');
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


<style>
 *{
        box-sizing: border-box;
      }
      body{
        background-color: #3498DB;
        font-family: "Arial", sans-serif;
        padding: 50px;
      }
      .container{
        margin: 20px auto;
        padding: 10px;
        width: 300px;
        height: 380px;
        background-color: #fff;
        border-radius: 5px;
      }
      h1{
        width: 70%;
        color: #777;
        font-size: 32px;
        margin: 28px auto;
        margin-bottom: 20px;
        text-align: center;
        /*padding-top: 40px;*/
      }
      form{
        /*padding: 15px;*/
        text-align: center;
      }
      input{
        padding: 10px 0;
        margin-bottom: 15px;
        border-radius: 10px;
        border: 2px solid transparent;
        text-align: center;
        width: 90%;
        font-size: 16px;
        transition: border .2s, background-color .2s;
      }
      form .field{
        background-color: #ECF0F1;
      }
      form .field:focus {
        border: 2px solid #3498DB;
      }
      form .btn{
        background-color: #3498DB;
        color: #fff;
        line-height: 10px;
        cursor: pointer;
      }
      form .btn:hover,
      form .btn:active {
        background-color: #1F78B4;
        border: 2px solid #1F78B4;
      }
      .pass-link{
        text-align: center;
      }
      .pass-link a:link,
      .pass-link a:visited{
        font-size: 12px;
        color: #777;
      }
</style>
