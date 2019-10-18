<template>
    <div class="channel-detail">
        <nav class="navbar navbar-expand  navbar-light bg-light">
            <div class="fixed-top" >
                <a class="navbar-brand" href="#">
                <a class= "back-button" v-on:click="$goBack()">
                    <img src="@/assets/icons/left-arrow.svg" >
                    
                </a>
                </a>
            </div>          
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav ml-auto">
                <a class="nav-item nav-link" href="#">delete</a>
                <a class="nav-item nav-link" href="#">archive</a>
                <a class="nav-item nav-link" href="#">pin</a>
    
                </div>
            </div>
        </nav>
        <!-- Channel details -->
        <div style="background-color: ghostwhite">      
            <h4  class="container">
            <strong>
                {{channel_name}}
            </strong>            
            </h4>            
        </div> 
        <div class="container">
            <div class="container btn-group tab" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-sm btn-outline-primary tab-link" v-on:click="openTab('public')">notifications</button>            
                <button type="button" class="btn btn-sm btn-outline-primary tab-link" v-on:click="openTab('chats')">chats</button>
            </div>
        </div>  
        <div id="public" class="tab-content">
            <ChannelPublics />
        </div>
        <div id="chats" class="tab-content">
            <ChannelChats/>
        </div>    
    </div>    
</template>
<script>
    // @ is an alias to /src
    import ChannelChats from '@/components/ChannelChats.vue'
    import ChannelPublics from '@/components/ChannelPublics.vue'
    export default {
        components: {
            ChannelChats,
            ChannelPublics
        },
        computed:{
           // replace underscores with spaces and concatenate a #
           channel_name: function() {            
               return '#' + this.$route.params.id.split('_').join(' ')
           }
        },
        methods:{
            openTab :function(tabName) {          
                // Declare all variables
                var i, tabcontent, tablinks;
            
                // Get all elements with class="tabcontent" and hide them
                tabcontent = document.getElementsByClassName("tab-content");
                for (i = 0; i < tabcontent.length; i++) {
                    tabcontent[i].style.display = "none";
                }                        
                // Show the current tab
                document.getElementById(tabName).style.display = "block";
            }
        }
  
}
</script>
<style lang="scss" src="@/assets/styles/general.scss"></style>
      