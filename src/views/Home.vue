<template>
  <div class="home">    
    <nav class="navbar navbar-expand  navbar-light bg-light">
        <div class="fixed-top" >
          <a class="navbar-brand" href="#">
            <div style=" background-color:ghostwhite ; padding: 7.5px ; border-radius: 50px">
              back
            </div>
          </a>
        </div>          
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav ml-auto">
            <a class="nav-item nav-link" href="#">delete</a>
            <a class="nav-item nav-link" href="#">archive</a>
            <a class="nav-item nav-link" href="#">pin</a>

          </div>
        </div>
    </nav> 
    <!-- Channels -->
    <div  style="background-color: ghostwhite">      
      <h3 class="container strong text-primary " >
        Channels    
      </h3>
    </div>    
    <Channels msg="Channels component here" class="container"/>
    <!-- chat component -->
    <div style="background-color: ghostwhite">      
      <h3 class="container strong separator text-primary">
        Chats
      </h3>    
    </div> 
    <Chats msg="Chats here" class="container"/>

  </div>
</template>

<script>
// @ is an alias to /src
import Channels from '@/components/Channels.vue'
import Chats from '@/components/Chats.vue'

export default {
  name: 'home',
  components: {
    Channels,
    Chats
  }
}
</script>
<style lang="scss">
  
</style>
