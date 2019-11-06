<template>
  <div class="peer-to-peer-chats">
      <div class="chat-list-item " v-for="item in recent_chats" >
          <router-link :to=" `/peer-to-peer-chat/` + [item.sender.member.username,item.receiver.member.username].sort().toString().split(',').join('_')" class=""> 
          <div class="row">          
              <a href="#" class=" list-group-item list-group-item-action flex-column align-items-start border-0">        
                  <div class="d-flex w-100 justify-content-between">                         
                    <h5 class="mb-1" id="item.channel.name + '_preview_heading'"
                        v-if="item.sender.member.username != username">                      
                        <vue-letter-avatar :name="item.sender.member.username" size='25' :rounded=true class="avatar"/> 
                      {{item.sender.member.username}}
                    </h5>
                    <h5 class="mb-1" id="item.channel.name + '_preview_heading'"
                        v-if="item.receiver.member.username != username">                      
                        <vue-letter-avatar :name="item.receiver.member.username" size='25' :rounded=true class="avatar"/> 
                      {{item.receiver.member.username}}
                    </h5>
                  
                    <div>
                      <span class="badge badge-secondary badge-pill" id="item.channel.name + '_unread_messages_badge'">
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
        var this_user, other_user ;
        this.username == chat.sender.member.username ? this_user = chat.sender.member.username : this_user = chat.receiver.member.username
        this.username != chat.sender.member.username ? other_user = chat.sender.member.username : other_user = chat.receiver.member.username
        var chat_name = [this_user,other_user].sort().toString().split(',').join('_')
        
        this.$http.get(this.$BASE_URL + '/api/social/' + this_user + '/' + other_user + '/chat-messages/')
            .then(response => {              
              var messages = response.data
              var last_message_received = messages[messages.length-1].message          
              var last_message_received_time = messages[messages.length-1].time_stamp 
              document.getElementById(chat_name + "_preview").lastChild.data = last_message_received
              document.getElementById(chat_name + "_time_preview").lastChild.data = this.$humanizeDate(last_message_received_time)
             
            })
            .catch(() => {
                
            }) 
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>