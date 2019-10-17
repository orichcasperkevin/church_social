<template>
    <div class="Channel-chats">
        <!-- Channel chat-->
        <div  style="background-color: ghostwhite">      
            <P></P>  
        </div>      
        <ul  class="content text-muted text-sm container" v-chat-scroll="{always: false, smooth: true}" style="height: 375px;overflow-y: scroll;">
            <li class="chat-bubble container" v-for="item in messages">
                <div class="row">                      
                        <div class="in-chat-text col-10" style="padding:10px; border-radius: 5px ;background-color:ghostwhite; min-height: 75px">
                            <div>
                                <p>{{item.sender.member.username}}</p>
                                <small >{{item.message}}</small>
                            </div>
                            <footer class="blockquote-footer text-success"><small>sun <cite title="Source Title">12:30</cite></small></footer>
                        </div>                                 
                </div>                
            </li>
            <li class="chat-bubble container " style="padding: 10px">
                    <div class="row justify-content-end">                        
                        <div class="out-chat-text col-9" style="padding:10px; border-radius: 5px ;background-color: mintcream; min-height: 75px">
                            <div>
                                <p>Casper orich</p>
                                <small class="padding:2px"> varius blandit here</small>
                            </div>
                            <footer class="blockquote-footer text-success"><small>sun <cite title="Source Title">12:30</cite></small></footer>
                        </div>
                    
                    </div>                
            </li>  
            <li>
                <div class="input-group input-group-sm mb-3">                    
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="message">
                    <div class="input-group-append">
                        <span class="input-group-text" v-on:click="sendMessage()">Send</span>
                    </div>
                </div>
            </li>
        </ul>                       
    </div>


</template>

<script>
export default {
    name: 'ChannelChats',
    props: {
        msg: String
    },
    created(){
        this.fetchData()
    },
    data(){
        return{
            messages: [],
            chatSocket: null,
            message: ''
        }
    },
    methods:{
        fetchData: function(){
            var channel = this.$route.params.id
            this.$http.get(this.$BASE_URL + '/api/social/' + channel + '/messages/')
            .then(response => {
                this.messages = response.data
                this.watchForMoreMessages()
            })
            .catch(() => {
                
            })
        },
        sendMessage: function(){
            // use username of registered user
            this.chatSocket.send(JSON.stringify({
                'username': 'casper',
                'message': this.message,
                'type': 'M'
            }));
        },
        watchForMoreMessages: function (){
            //TODO have a function that converts $BASE_URL to this form
            var vm = this
            var BASE_URL = "127.0.0.1:8000"   
            var channel = this.$route.params.id         
            this.chatSocket = new WebSocket('ws://' + BASE_URL +'/ws/chat/' + channel + '/');

            this.chatSocket.onmessage = function(event) {                                                            
                var data = JSON.parse(event.data)                
                vm.messages.push(data[0])
             }
             this.chatSocket.onclose = function(event) {
                console.error('Chat socket closed unexpectedly'+ event);
             }

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>