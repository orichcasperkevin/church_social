<template>
    <div class="Channel-chats">
        <!-- Channel chat-->
        <div  style="background-color: ghostwhite">      
            <P></P>  
        </div>
        <div  class="chat">
        <div class="messages">
            <div class="messages-content"  v-chat-scroll="{always: false, smooth: true}" >            
                    <div class="message loading new">
                        <figure class="avatar">
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" />
                        </figure>
                        <span></span>
                    </div>
                    <div class="message new" v-for="item in messages">
                        <figure class="avatar">
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" />
                        </figure>
                        <small class="text-success">{{item.sender.member.username}}</small>                
                        <p>{{item.message}}</p>
                    </div>
                    <div class="message message-personal">
                        <small class="text-success">Me</small>                
                        <p>Yoh mehn</p>
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
<style scoped lang="scss" src="@/assets/styles/chatStyles.scss">
</style>