<template>
    <div class="Channel-chats">
        <!-- Channel chat-->
        <div  style="background-color: ghostwhite">      
            <h5  class="container " >
            chat
            </h5>   
        </div>      
        <ul class="content text-muted text-sm container" v-chat-scroll="{always: false, smooth: true}" style="height: 270px;overflow-y: scroll;">
            <li class="chat-bubble container">
                <div class="row">
                        <div class="in-chat-avatar col-2" style="padding: 5px; border-radius: 50px; max-height: 30px">
                            <h3>T</h3>
                        </div>
                        <div class="in-chat-text col-9" style="padding:10px; border-radius: 5px ;background-color:ghostwhite; min-height: 75px">
                            <div>
                                <p>Nickson meli</p>
                                <small >Donec id elit non mi porta gravida at ed diam eget risus varius blandit</small>
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
        </ul>    
        <div class="input-group ">                   
        <textarea class="form-control" aria-label="With textarea" style="border-radius: 50px 0px 0px 50px"></textarea>
        <div class="input-group-append"  >
            <span class="input-group-text" style="border-radius: 0px 50px 50px 0px">send</span>
        </div>
        </div>                    
    </div>


</template>

<script>
export default {
name: 'ChannelChats',
props: {
msg: String
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>