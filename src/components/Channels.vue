<template>
  <div class="channels">
    <div class="channel-list-item " v-for="item in channels" >
      <router-link :to=" `/channel-detail/`+ item.channel.name " class=""> 
      <div class="row">          
          <a href="#" class=" list-group-item list-group-item-action flex-column align-items-start border-0">        
              <div class="d-flex w-100 justify-content-between">                         
                <h5 class="mb-1" :id="item.channel.name + '_preview_heading'">
                    <vue-letter-avatar :name="item.channel.name" size='25' :rounded=true class="avatar"/> 
                  {{'#' + item.channel.name.split('_').join(' ')}}
                </h5>
                <div>
                  <span class="badge badge-secondary badge-pill" :id="item.channel.name + '_unread_messages_badge'">
                    0
                  </span>
                </div>
              </div>
              <p class="mb-1 ml-4" :id="item.channel.name + '_preview'">loading...</p>
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
    truncate: function(str, num) {
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    },
    fetchData: function(){
      var username = "casper"
      this.$http.get(this.$BASE_URL + '/api/social/' + username + '/channels/')
      .then(response => {
        this.channels = response.data
        this.prefetchDetail()
      })
      .catch(() => {
        
      })
    },
    prefetchDetail: function(){
      for (var i in this.channels){
        var channel = this.channels[i].channel.name
        var storage_name = channel + "_messages"
                
        this.$http.get(this.$BASE_URL + '/api/social/' + channel + '/messages/')
            .then(response => {
                var messages = response.data
                localStorage.setItem(storage_name,JSON.stringify(messages))
                var last_message_received_id = messages[messages.length-1].id  
                //set last message received
                var last_message_received = messages[messages.length-1].message                
                document.getElementById(channel + "_preview").lastChild.data = this.truncate(last_message_received, 15)
                ////count unread
                var last_message_seen_id  = localStorage.getItem(channel + "_last_message_seen")                  
                var unread_message_count = last_message_received_id - parseInt(last_message_seen_id)                                                                        
                if (unread_message_count > 0){                
                  this.markAsUnread(channel,unread_message_count)                  
                }                

            })
            .catch(() => {
                
            })        
        this.watchforMoreMessages(channel)        
      }      
    },
    watchforMoreMessages: function(channel){
      var vm = this
      var storage_name = channel + "_messages"
      var BASE_URL = "127.0.0.1:8000"                 
      this.chatSocket = new WebSocket('ws://' + BASE_URL +'/ws/chat/' + channel + '/');

      this.chatSocket.onmessage = function(event) {                                                            
          var data = JSON.parse(event.data)     
          var messages = JSON.parse(localStorage.getItem(storage_name))
          messages.push(data[0])
          localStorage.setItem(storage_name,JSON.stringify(messages))

          var last_message_received_id = messages[messages.length-1].id                  
          //set last message received
          var last_message_received = messages[messages.length-1].message                
          document.getElementById(channel + "_preview").lastChild.data = vm.truncate(last_message_received,15)
          //count unread
          var last_message_seen_id  = localStorage.getItem(channel + "_last_message_seen")                  
          var unread_message_count = last_message_received_id - parseInt(last_message_seen_id)

          vm.markAsUnread(channel,unread_message_count)         
        }
        this.chatSocket.onclose = function(event) {
          console.error('Chat socket closed unexpectedly'+ event);
        }
    },
    markAsUnread:function(channel,unread){
        //update badge                         
        var badge,heading,preview
        if (badge = document.getElementById(channel+"_unread_messages_badge")){
          badge.lastChild.data = unread
        }        
        // update preview message and heading        
        if (heading = document.getElementById(channel + "_preview_heading")){
            heading.classList.add("font-weight-bold")          
        }   
        if (preview = document.getElementById(channel + "_preview")){
            preview.classList.add("font-weight-bold")        
        }
               
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
