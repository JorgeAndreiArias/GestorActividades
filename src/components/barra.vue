<template>
    <div>
        <nav class="navbar navbar-dark bg-dark">
            <a class="navbar-brand" href="#"> {{ getName }}</a>
            <div >
                <form class="form-inline my-2 my-lg-0"  v-on:submit.prevent="logout">
                    <button class="btn btn-outline-success" type="submit">Cerrar Sesión</button>
                </form>
            </div>
        </nav>
    </div>
       
    
</template>

<script>

export default {
	 mounted: function(){
    },
    data: function(){
		return{

		}
	}, 
	methods:{ 
		logout(){
			this.$store.commit('auth', {});
            this.$store.commit('user', {});
            this.$store.commit('change', 1);
            this.$cookies.remove('UserAuth');
            this.$cookies.remove('Token');
		},
	},
	computed:{
		getName(){
			var user =  this.$store.getters.user;;
			return  user.Nombre + " " + user.Apellidos;
		}
	}
}
</script>

<style scoped>
</style> 