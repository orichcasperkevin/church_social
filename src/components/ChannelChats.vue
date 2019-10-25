<template>
    <div class="Channel-chats">
        <!-- Channel chat-->        

        <div class="container mt-1.5 mb-1.5 text-right">
                <div class="btn">                    
                    <vue-letter-avatar name="gyiyh" size='25' :rounded=true class="avatar"/>
                    <vue-letter-avatar name="ugyiyh" size='25' :rounded=true class="avatar"/>  
                    <vue-letter-avatar name="kyiyh" size='25' :rounded=true class="avatar"/>
                    <vue-letter-avatar name="lyiyh" size='25' :rounded=true class="avatar"/> 
                    <vue-letter-avatar name="gyiyh" size='25' :rounded=true class="avatar"/>                                       
                </div>  
                <span class="text-secondary">+30 </span>             
                <button type="button" class="btn btn-link text-success">view all</button>
                <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#exampleModal">+ add</button>
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
                    <div class="message message-personal text-left" v-if="item.sender.member.username == username" >                                           
                            <p>
                            {{item.message}}                           
                            <div class="timestamp text-right" > {{humanizeDate(item.time_stamp)}}</div>  
                            </p>                                                                                  
                    </div>
                    <div class="message new" v-else>

                        <vue-letter-avatar :name="item.sender.member.username" size='25' :rounded=true class="avatar"/>                        
                        <small class="text-success" >{{item.sender.member.username}} </small>                
                        <p>
                            {{item.message}}
                            <div class="timestamp text-right" > {{humanizeDate(item.time_stamp)}}</div>  
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
            message: '',
            username: this.$session.get('username'),
            channel: this.$route.params.id
        }
    },
    watch:{
        messages:function(){            
            //update local storage with the last message in id
            var channel = this.$route.params.id
            var last_message_seen_id = this.messages[this.messages.length-1].id                
            localStorage.setItem(channel + "_last_message_seen",last_message_seen_id.toString())                          

        }
    },
    methods:{
        humanizeDate:function(date_time){
            return this.$timeAgo.format(new Date(date_time), 'twitter')
        },
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
                'username': this.$session.get('username'),
                'message': this.message,                
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

        },
    },
    beforeDestroy(){
        this.chatSocket.close()    
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="@/assets/styles/chatStyles.scss">
</style>