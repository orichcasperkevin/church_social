<template>
    <div class="Channel-publics">
        <!-- Channel announcements-->          
        <div class="container mt-3 mb-3 text-right">
            <button type="button" class="btn btn-link text-success">mark all as read</button>
            <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#exampleModal">+ add</button>
        </div>  
        <div style="height: 80vh; overflow-y: scroll;">            
            <div class="accordion " id="accordionExample">                                   
                    <div class="card" v-for="item in notices ">                                                    
                        <div class="" id="headingOne">
                        <h5 class="mb-0">
                            <button class="btn btn-block flex-column align-items-start " 
                                    type="button" 
                                    data-toggle="collapse" 
                                    data-target="#collapseOne" 
                                    aria-expanded="true" 
                                    aria-controls="collapseOne">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h5 class="mb-1 text-left"><strong>{{extractHeading(item.message)}}</strong></h5>                                        
                                        <div class="ml-5"><span class="badge badge-pill badge-secondary">Read</span></div>
                                    </div>
                                    <p class="mb-1 text-left text-muted">{{extractContent(item.message)}}.</p>
                                    <div class="text-left">
                                        <small>yesterday 12:30</small>
                                        <p><small> by -- {{item.sender.member.username}}</small></p>
                                    </div>                                                                   
                                  
                            </button>
                        </h5>
                        </div>                                          
                    </div>                          
                </div>    
        </div>
        <!-- add notice modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">  
                <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"><strong>new notice</strong></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>              
                <div class="modal-body">
                        <div class="form-group">                            
                            <input type="text" class="form-control" 
                                    placeholder="heading" v-model="heading">
                        </div>
                        <div class="form-group">                           
                            <textarea class="form-control" 
                                        id="exampleFormControlTextarea1" 
                                        rows="3" placeholder="content"
                                        v-model="content">

                            </textarea>
                        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-sm btn-success" v-on:click="sendMessage()">Send notice</button>
                </div>
                </div>
            </div>
        </div>
    </div>

</template>      
<script>
    export default {
        name: 'ChannelPublics',
        props: {
            msg: String
        },
        created(){
            this.fetchData()
        },
        data(){
            return{
                notices: [],
                noticeSocket: null,
                heading: '',
                content:'',
                username: this.$session.get('username')
            }
        },
        methods:{
            fetchData: function(){
                var channel = this.$route.params.id
                this.$http.get(this.$BASE_URL + '/api/social/' + channel + '/notices/')
                .then(response => {
                    this.notices = response.data        
                    this.watchForMoreNotices()                
                })
                .catch(() => {
                    
                })
            },
            sendMessage: function(){                
                var message = "**" + this.heading + "**" + this.content
                this.noticeSocket.send(JSON.stringify({
                    'username': this.$session.get('username'),
                    'message': message,                                       
                }));
            },
            watchForMoreNotices: function (){
                //TODO have a function that converts $BASE_URL to this form
                var vm = this
                var BASE_URL = "127.0.0.1:8000"   
                var channel = this.$route.params.id         
                this.noticeSocket = new WebSocket('ws://' + BASE_URL +'/ws/chat/' + channel + '/notices/');
    
                this.noticeSocket.onmessage = function(event) {                                                            
                    var data = JSON.parse(event.data)                
                    vm.notices.push(0,data[0])
                 }
                 this.noticeSocket.onclose = function(event) {
                    console.error('Chat socket closed unexpectedly'+ event);
                 }
    
            },
            extractHeading: function(message){
                return message.split("**")[1]
            },
            extractContent: function(message){
                return message.split("**")[2]
            }
        }
    }
    </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>