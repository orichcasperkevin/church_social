<template>
    <div class="peer-to-peer-chats">
        <!-- peer to peer chats -->
        <nav class="navbar navbar-expand  navbar-light bg-light">
                <h5>
                <router-link to="/"  class="navbar-brand back-button text-primary">
                    <img src="@/assets/icons/left-arrow.svg">
                    <vue-letter-avatar :name="getPeers().other_user" size='25' :rounded=true class="ml-3"/> 
                    {{getPeers().other_user}}
                </router-link>  
                </h5>                      
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav ml-auto">
                    <a class="nav-item nav-link" href="#"></a>
                    <a class="nav-item nav-link" href="#"></a>
                    <a class="nav-item nav-link" href="#"></a>
        
                    </div>
                </div>
        </nav>        
        <div class="container mt-2.5 mb-1.5 text-right"> 
            <div class="row">
                <div class="col-6 text-left mt-3 text-success">online...</div>  
                <div class="col-6">
                        <button type="button" class="btn btn-sm btn-success mt-2" data-toggle="modal" data-target="#exampleModal">detail</button>
                </div>                                                  
            </div>
        </div>
        <div  class="chat">
            <div class="messages">
                <div class="messages-content"  v-chat-scroll="{always: false, smooth: true}" >            
                        <div class="message loading new">
                            <figure class="avatar">
                                <img src="" />
                            </figure>
                            <span></span>
                        </div>
                        <div  class="container" v-for="item in messages">                                                
                        <div class="message message-personal text-left" 
                             v-if="item.sender.member.username == username" >                                           
                                <p>
                                {{item.message}}                          
                                <div class="timestamp text-right" > {{$humanizeDate(item.time_stamp)}}</div>  
                                </p>                                                                                  
                        </div>
                    
                        <div class="message new" v-else>
    
                            <vue-letter-avatar :name="item.sender.member.username || item.receiver.member.username" size='25' :rounded=true class="avatar"/>                        
                            <small class="text-success" >{{item.sender.member.username}} </small>                
                            <p>
                                {{item.message}}
                                <div class="timestamp text-right" > {{$humanizeDate(item.time_stamp)}}</div>  
                            </p> 
                        </div>
                        </div>
                </div>    
            </div>
            <div class="message-box">
                <textarea type="text" class="message-input" placeholder="Type message..." v-model="message"></textarea>
                <button type="submit" class="message-submit" v-on:click="sendMessage()">Send</button>
            </div>
    
            </div>             
    </div>
</template>
    
<script>
export default {
    name: 'PeerToPeerChats',
    props: {
        msg: String
    },
    data(){
        return{
            peer : this.$route.params.id,
            username: this.$session.get('username'),
            messages: []
        }
    },
    created(){
        this.fetchData()
    },
    methods:{
        // initial fetch data
        fetchData: function(){
            var peers = this.$route.params.id.split('_').join('/')
            this.$http.get(this.$BASE_URL + '/api/social/' + peers + '/chat-messages/')
            .then(response => {
                this.messages = response.data  
                this.watchForMoreMessages()                                                   
            })
            .catch(() => {
                
            })
        },
        getPeers: function(){
            var channel = this.$route.params.id   
            //get current user and the other user       
            var this_user, other_user ;            
            this.username == channel.split('_')[0] 
                            ? this_user = channel.split('_')[0]  
                            : this_user = channel.split('_')[1] 
            this.username != channel.split('_')[0]  
                            ? other_user = channel.split('_')[0]  
                            : other_user = channel.split('_')[1] 
            return {'this_user':this_user,'other_user':other_user}
        },
        // send message to a peer
        sendMessage: function(){            
            var peers = this.getPeers()
            this.chatSocket.send(JSON.stringify({
                'sender': this.username,
                'receiver': peers.other_user,
                'message': this.message,                
            }));
        },
        watchForMoreMessages: function (){
            //TODO have a function that converts $BASE_URL to this form
            var vm = this
            var BASE_URL = "127.0.0.1:8000"   
            var channel = this.$route.params.id         
            this.chatSocket = new WebSocket('ws://' + BASE_URL +'/ws/peer_to_peer_chat/' + channel + '/');

            this.chatSocket.onmessage = function(event) {                                                            
                var data = JSON.parse(event.data)                
                vm.messages.push(data[0])
             }
             this.chatSocket.onclose = function(event) {
                console.error('Chat socket closed unexpectedly'+ event);
             }

        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="@/assets/styles/chatStyles.scss"></style>
<style lang="scss" src="@/assets/styles/general.scss"></style>