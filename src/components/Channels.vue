<template>
  <div class="channels">
    <div class="channel-list-item " v-for="item in channels" >
      <router-link :to=" `/channel-detail/`+ item.channel.name " class=""> 
      <div class="row">          
          <a href="#" class=" list-group-item list-group-item-action flex-column align-items-start border-0">        
              <div class="d-flex w-100 justify-content-between">                         
                <h5 class="mb-1">
                    <vue-letter-avatar :name="item.channel.name" size='25' :rounded=true class="avatar"/> 
                  <b>{{'#' + item.channel.name.split('_').join(' ')}}</b>
                </h5>
                <div><span class="badge badge-info badge-pill">14</span></div>
              </div>
              <p class="mb-1 text-secondary"><b>Donec  blandit.</b></p>
              <small class="text-primary">3 days ago</small>
          </a>
      </div>      
      </router-link>         
    </div>
  </div>
</template>

<script>
export default {
  name: 'Channels',
  props: {
    msg: String
  },
  created(){
    this.fetchData()
  },
  data(){
    return{
      channels: []
    }
  },
  methods:{
    fetchData: function(){      
      var username = "casper"
      this.$http.get(this.$BASE_URL + '/api/social/' + username + '/channels/')
      .then(response => {
        this.channels = response.data
      })
      .catch(() => {
        
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
