<template>
    <div class="container">
      <h1>Login</h1>
        <form v-on:submit.prevent="Auth">
            <input type="text" class="field" placeholder="Email" v-model="name">
            <input type="text" class="field" placeholder="Password" v-model="password">
            <input type="submit" class="btn" value="Login">
            <input type="button" v-on:click="signin" class="btn" value="sign in" >
            <a class="pass-link" v-on:click="Recover">Lost your password?</a>
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

<style>
    *{
        box-sizing: border-box !important;
      }
      
      .container {
        margin: 20px auto !important;
        padding: 10px !important;
        width: 300px !important;
        height: 320px !important;
        background-color: #fff !important;
        border-radius: 5px !important;
      }
      h1{
        width: 70% !important;
        color: #777 !important;
        font-size: 32px !important;
        margin: 28px auto !important;
        margin-bottom: 20px !important;
        text-align: center !important;
        /*padding-top: 40px;*/
      }
      form{
        /*padding: 15px;*/
        text-align: center !important;
      }
      input{
        padding: 12px 0 !important;
        margin-bottom: 15px !important;
        border-radius: 10px !important;
        border: 2px solid transparent !important;
        text-align: center !important;
        width: 90% !important;
        font-size: 16px !important;
        transition: border .2s, background-color .2s !important;
      }
      form .field{
        background-color: #ECF0F1 !important;
      }
      form .field:focus {
        border: 2px solid #3498DB !important;
      }
      form .btn{
        background-color: #3498DB !important;
        color: #fff !important;
        line-height: 10px !important;
        cursor: pointer !important;
      }
      form .btn:hover,
      form .btn:active {
        background-color: #1F78B4 !important;
        border: 2px solid #1F78B4 !important;
      }
      
      .pass-link{
        text-align: center !important;
        align-content: center !important;
      }
      .pass-link a:link,
      .pass-link a:visited{
        font-size: 12px !important;
        color: #777 !important;
      }
</style>


