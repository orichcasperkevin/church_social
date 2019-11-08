<template>
  <div id="app">          
      <div class="d-none">{{showNav}} </div>
      <nav id="bottom-nav" class="fixed-bottom navbar navbar-light bg-light">        
          <div class="navbar-nav navbar-expand">              
              <router-link :to="{name: 'me'}" style="padding: 12px" class="nav-item nav-link text-primary">
                  <img src="@/assets/icons/icons8-user-30.png" style="width: 30px; height: auto">                  
              </router-link>          
              <router-link :to="{name: 'home'}" style="padding: 12px" class="nav-item nav-link text-primary">
                  <img src="@/assets/icons/speech-bubbles-comment-option.svg" style="width: 30px; height: auto">  
              </router-link> 
              <router-link :to="{name: 'discussions'}" style="padding: 12px" class="nav-item nav-link text-primary">
                  <img src="@/assets/icons/icons8-strategy-news-50.png" style="width: 30px; height: auto"> 
              </router-link>                  
          </div>  
          <button class="navbar-toggler" type="button btn-primary" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>      
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <router-link :to="{name: 'news'}" style="padding: 15px" class="nav-item nav-link text-primary">news</router-link> 
                <router-link :to="{name: 'sermons'}" style="padding: 15px" class="nav-item nav-link text-primary">sermons</router-link> 
                <router-link :to="{name: 'services'}" style="padding: 15px" class="nav-item nav-link text-primary">services</router-link> 
                <router-link :to="{name: 'blog'}" style="padding: 15px" class="nav-item nav-link text-primary">blog</router-link>        
            </div>
          </div>
        </nav>
    <router-view class="bounce-in"/>
  </div>
</template>
<script>
  export default {
  name: 'app',
  computed :{
    showNav: function() {
      var bottomNav
      if (! this.$store.getters.showNav){
        if (bottomNav = document.getElementById("bottom-nav")){
          bottomNav.classList.add("d-none")
        }        
      }
      else{
        if (bottomNav = document.getElementById("bottom-nav")){
          bottomNav.classList.remove("d-none")
        }       
      }
      return this.$store.getters.showNav
     }
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    }
  },
  methods: {
    logout: function () {
      this.$session.destroy()
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" src="@/assets/styles/bounce.scss"></style>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
