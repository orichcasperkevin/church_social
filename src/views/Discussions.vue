<template>
  <div class="about">
      <!-- the header for branding and stuff  -->         
      <nav class="sticky-top navbar navbar-expand  navbar-light bg-light">
                
          <router-link to="/"  class="navbar-brand back-button text-primary">
              <img src="@/assets/icons/left-arrow.svg">
              <div  style="background-color: ghostwhite">      
                  <h3 class="text-primary strong" >              
                      Discussions
                  </h3>
              </div>                   
          </router-link>                                               
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav ml-auto">
              <a class="nav-item nav-link" href="#"></a>
              <a class="nav-item nav-link" href="#"></a>
              <a class="nav-item nav-link" href="#"></a>
  
              </div>
          </div>
      </nav> 
      <br/>
      <!-- the list of discussions -->
      <div class="card mb-5 border-0" v-for="item in discussions">
          <div class="card-header flex-container text-left">
            <div class="row">                       
                <div class="col-9">
                  <h5 class="card-title font-weight-bold">{{item.topic}}</h5>
                  <p>
                      <vue-letter-avatar :name="item.creator.member.username" size='25' :rounded=true class="avatar"/>
                      <span class="text-muted "> {{item.creator.member.username}}<small class="text-info "> : {{$humanizeDate(item.creation_time)}}</small></span>
                  </p>                                 
                </div>                  
                <div class="col-3 text-right">
                    <a href="#" class="btn btn-sm btn-primary">+ join</a>
                </div>                
            </div>
          </div>
          <div class="card-body">  
            <!-- dscription                     -->
            <p class="card-text">{{item.description || 'no description given'}}</p> 
            <!-- tags  -->
            <div id="tags">              
                <span class="mr-3 badge badge-pill badge-light text-muted" v-for="tag in item.tags">
                  {{tag.name}}
                </span>
            </div>  
            <!-- reactions           -->
            <div class="mt-3 rounded flex-container">
              <div class="row ml-5">
                  <a @click="addReaction" class="ml-3 text-info reaction-box">
                      <img src="@/assets/icons/icons8-thumbs-up-48.png" style="width: 30px; height: auto"> 
                      <small :id="item.id + `_reactions`">0</small>
                  </a>
                  <div class="ml-3 text-info reaction-box">
                    <img src="@/assets/icons/icons8-chat-bubble-48.png" style="width: 30px; height: auto"> 
                    <small class="ml-2" :id="item.id + `_contributions`">0</small>
                  </div>                  
              </div>
            </div>
            <hr>
            <!-- Reccomendation list -->
            <div class="row mt-4 d-none" :id="item.id + `_recomendations`">
                <vue-letter-avatar :name="item.creator.member.username" size='25' :rounded=true class="ml-4" />
                  {{item.creator.member.username}}
                <div class="reaction-box text-muted">
                  some recomendations douhe oijhwe iwhoeij woiehpoijwe iowheoijw ehohwe owiehoihwe weuhowije
                </div>            
            </div>
            <!-- recommendation add -->
            <hr/>
            <div class="row mt-4">
                <vue-letter-avatar :name="item.creator.member.username" size='25' :rounded=true class="ml-4" />
                <div class="message-box" >              
                  <textarea type="text" 
                            class="message-input" 
                            rows="14" cols="10" 
                            wrap="soft"
                            placeholder="Reccomend ..." >
    
                  </textarea>
                  <button type="submit" class="message-submit" v-on:click="sendMessage()">Send</button>
                </div> 
            </div>   
            <hr/>      
          </div>
        </div>
        <br/><br/>
  </div>
</template>
<script>
  export default {
    name: 'Discussions',
    props: {
      msg: String
    },
    created(){
        this.fetchData()    
    },
    data(){
        return{
          username: this.$session.get('username'),
          discussions: [],
          recomendations: {}
        }
    },
    methods:{
      //fetch data
      fetchData: function(){
        this.getDiscussion(0,50)
      },
      //get all discussions
      getDiscussion: function(from_index,to_index){
        this.$http.get(this.$BASE_URL + '/api/social/discussions/'+ from_index + '/'+ to_index +'/')
        .then(response => {
          this.discussions = response.data
          this.getReactionsAndContributions(response.data)                    
        })
        .catch(error =>{
          var something = error
        })
      },
      getReactionsAndContributions: function(discussions){
        for (var item in discussions){
          var discussion = discussions[item]
          // reaction count
          this.getReactionCount(discussion.id)
          //contributiions count
          this.getCountributionsCount(discussion.id)
          // recomendations
          this.getRecomendations(discussion.id)
        }
      },
      //get reactions count
      getReactionCount: function(discussion_id){          
          this.$http.get(this.$BASE_URL + '/api/social/discussion/' + discussion_id +'/reactions/')
          .then(response => {            
            var reactions = response.data 
            this.updateReactions(discussion_id,reactions)
          })
      },
      //get contribution count
      getCountributionsCount: function(discussion_id){
        this.$http.get(this.$BASE_URL + '/api/social/discussion/' + discussion_id + '/contributions-count/')
          .then(response => {  
            var contributions = response.data            
            //update UI
            document.getElementById(discussion_id + "_contributions").lastChild.data = contributions.count

          })
      },
      //get recomendations
      getRecomendations: function(discussion_id){
        this.$http.get(this.$BASE_URL + '/api/social/discussion/' + discussion_id +'/recomendations/')
        .then( response => {
          var recomendations = response.data
          if (recomendations.length){
            var recomendations_div = document.getElementById(discussion_id + "_recomendations")
            recomendations_div.classList.remove("d-none")                        
            this.recomendations[discussion_id] = recomendations            
            console.log(this.recomendations[discussion_id])   
          }          

        })
      },
      //update reactions in the UI
      updateReactions: function(discussion_id,reactions){                   
          document.getElementById(discussion_id + "_reactions").lastChild.data = reactions.count          
      }
    }
  }
</script>
    
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" src="@/assets/styles/general.scss"></style>
    
