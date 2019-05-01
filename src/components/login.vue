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
                     this.$store.commit('change', 3);
                     console.warn("The Cookie  exist");
                }else{
                    console.warn("The Cookie doesnt exist");
                }
             },
            Auth() {
            var  self = this;
            var objUser = {
                "email": this.name,
                "contrasena": sha256(this.password),
            };
            console.warn(objUser);
            
            setTimeout(() => {
                axios.post('https://cors-anywhere.herokuapp.com/https://shrouded-brushlands-43721.herokuapp.com/api/login', objUser).then(response => {
                    //this.$store.commit('changes', JSON.stringify(response.data));
                    alert(JSON.stringify(response.data.token));
                    var config = { "headers": { "Authorization": 'Bearer ' + response.data.token }}
                    var user = atob(response.data.token.split('.')[1]);
                    var user = JSON.parse(user);
                    this.$store.commit('auth', config);
                    this.$store.commit('user', user);
                    console.log(user);
                    console.log(user.Tipo)
                    switch(user.Tipo){
                      case 0:
                        this.$store.commit('change', 3);
                        break;
                      case 1: 
                        this.$store.commit('change', 4);
                        break;
                      case 3:
                        this.$store.commit('change', 5);
                        break;
                    }
                   
                }).catch(e => {
                    console.warn(e);
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


