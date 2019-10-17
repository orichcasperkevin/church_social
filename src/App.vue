<template>
  <div id="app">   
    <router-view/>

    <nav hidden class="fixed-bottom navbar navbar-light bg-light">        
        <div class="navbar-nav navbar-expand">  
            <router-link :to="{name: 'me'}" style="padding: 12px" class="nav-item nav-link text-primary">me</router-link>          
            <router-link :to="{name: 'home'}" style="padding: 12px" class="nav-item nav-link text-primary">channels</router-link> 
            <router-link :to="{name: 'discussions'}" style="padding: 12px" class="nav-item nav-link text-primary">chats</router-link>                  
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
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
