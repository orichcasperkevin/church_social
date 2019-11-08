<template>
  <div class="peer-to-peer-chats">
      <div class="chat-list-item " v-for="item in recent_chats" >
          <router-link :to=" `/peer-to-peer-chat/` + [item.sender.member.username,item.receiver.member.username].sort().toString().split(',').join('_')" class=""> 
          <div class="row">          
              <a href="#" class=" list-group-item list-group-item-action flex-column align-items-start border-0">        
                  <div class="d-flex w-100 justify-content-between">                         
                    <h5 class="mb-1" :id="[item.sender.member.username,item.receiver.member.username].sort().toString().split(',').join('_') + '_preview_heading'"
                        v-if="item.sender.member.username != username">                      
                        <vue-letter-avatar :name="item.sender.member.username" size='25' :rounded=true class="avatar"/> 
                      {{item.sender.member.username}}
                    </h5>
                    <h5 class="mb-1" :id="[item.sender.member.username,item.receiver.member.username].sort().toString().split(',').join('_') + '_preview_heading'"
                        v-if="item.receiver.member.username != username">                      
                        <vue-letter-avatar :name="item.receiver.member.username" size='25' :rounded=true class="avatar"/> 
                      {{item.receiver.member.username}}
                    </h5>
                  
                    <div>
                      <span class="badge badge-secondary badge-pill" :id="[item.sender.member.username,item.receiver.member.username].sort().toString().split(',').join('_') + '_unread_messages_badge'">
                        0
                      </span>
                    </div>
                  </div>
                  <p class="mb-1 ml-4" :id="[item.sender.member.username,item.receiver.member.username].sort().toString().split(',').join('_') + '_preview'">loading...</p>
                  <p class="text-right">
                    <small :id="[item.sender.member.username,item.receiver.member.username].sort().toString().split(',').join('_') + '_time_preview'" class="text-primary">
                      ...
                    </small>
                  </p>
              </a>
          </div>      
          </router-link>         
        </div>
  </div>        
</template>

<script>
export default {
  name: 'Chats',
  props: {
    msg: String
  },
  created(){
    this.fetchData()
  },
  data(){
    return{
      username: this.$session.get('username'),
      recent_chats: []
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
      this.$http.get(this.$BASE_URL + '/api/social/' + this.username + '/chats/')
      .then(response => {
        this.recent_chats = response.data             
        this.prefetchDetails()
      })
      .catch(() => {
        
      })
    },
    prefetchDetails: function(){
      for (var item in this.recent_chats){               
        var chat = this.recent_chats[item]

        //get logged in user and the connected peer
        var this_user, other_user ;
        this.username == chat.sender.member.username ? this_user = chat.sender.member.username : this_user = chat.receiver.member.username
        this.username != chat.sender.member.username ? other_user = chat.sender.member.username : other_user = chat.receiver.member.username
        var chat_name = [this_user,other_user].sort().toString().split(',').join('_')
        var storage_name = chat_name + "_messages"
        
        //network fetch
        this.$http.get(this.$BASE_URL + '/api/social/' + this_user + '/' + other_user + '/chat-messages/')
            .then(response => {              
              //update local storage
              var messages = response.data
              localStorage.setItem(storage_name,JSON.stringify(messages))  

              //setup previews
              var last_message_received = messages[messages.length-1].message          
              var last_message_received_time = messages[messages.length-1].time_stamp 
              document.getElementById(chat_name + "_preview").lastChild.data = last_message_received
              document.getElementById(chat_name + "_time_preview").lastChild.data = this.$humanizeDate(last_message_received_time)             

              //count unread
              var last_message_received_id = messages[messages.length-1].id  
              var last_message_seen_id  = localStorage.getItem(chat_name + "_last_message_seen")                  
              var unread_message_count = last_message_received_id - parseInt(last_message_seen_id)

              // if there are unread messages, mark
              if (unread_message_count > 0){                
                  this.markAsUnread(chat_name,unread_message_count)                  
              }  
            })
            .catch(() => {
                
            }) 
        this.watchForMoreMessages(chat_name)
      }
    },
    watchForMoreMessages: function(chat_name){      
      var vm = this
      var channel = chat_name
      var storage_name = channel + "_messages"
      var BASE_URL = "127.0.0.1:8000"    

      this.chatSocket = new WebSocket('ws://' + BASE_URL +'/ws/peer_to_peer_chat/' + channel + '/')
      this.chatSocket.onmessage = function(event) {        
        // get message from socket and add to messages in local storage
        var data = JSON.parse(event.data)     
        var messages = JSON.parse(localStorage.getItem(storage_name))
        messages.push(data[0])
        localStorage.setItem(storage_name,JSON.stringify(messages))

        //set message as last received
        var last_message_received_id = messages[messages.length-1].id                            
        var last_message_received = messages[messages.length-1].message                                    
        document.getElementById(channel + "_preview").lastChild.data = vm.truncate(last_message_received,35)
        
         //count unread
         var last_message_seen_id  = localStorage.getItem(channel + "_last_message_seen")                  
         var unread_message_count = last_message_received_id - parseInt(last_message_seen_id)

        // check for any unreads and mark them as unread
        vm.markAsUnread(channel,unread_message_count)    
      }

    },
    //mark as unread
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