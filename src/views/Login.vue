<template>
    <div class="card">
            <div class="card-body">
                <h4 class="card-title text-center mb-4 mt-1">Sign in</h4>
                <hr>                    
                <ul v-if="login_info.length">
                    <li v-for="info in login_info">                           
                        <p class="text-success text-center">{{info}}</p>
                    </li>
                </ul>
                <ul v-if="login_error.length">
                    <li v-for="info in login_error" class="text-danger">                           
                        <p class="text-danger text-center">{{info}}</p>
                    </li>
                </ul>                
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                            </div>
                        <input autofocus class="form-control" 
                                placeholder="usernane" type="text"
                                @keyup.enter="getToken()"
                                v-model="username">
                    </div> <!-- input-group.// -->
                </div> <!-- form-group// -->
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                            </div>
                        <input class="form-control" 
                                placeholder="******" 
                                type="password"
                                @keyup.enter="getToken()"
                                v-model="password">
                    </div> <!-- input-group.// -->
                </div> <!-- form-group// -->
                <div class="form-group">
                <button class="btn btn-primary btn-block" v-on:click="getToken()"> Login  </button>
                </div> <!-- form-group// -->
                <p class="text-center"><a href="#" class="btn">Forgot password?</a></p>                
            </div>
        </div> 
</template>
<script>
import router from "@/router";

export default {
  name: 'login',
  data() {
    return {
      username: null,
      password: null,
      login_error: [],
      login_info: []

    }
  },
  methods: {
    getToken: function () {
      this.login_info = []
      this.login_error = []
      this.login_info.push("authenticating...")
      this.$http({
        method: 'post',
        url: this.$BASE_URL + '/api/token/',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(response => {
        this.login_info = []
        this.login_error = []
        this.login_info.push("logging you in...")
        this.$session.start();
        this.$session.set('token', response.data.access)
        this.$session.set('username', this.username)
        //get logged in member data
        this.getLoggedInMemberData()        
        router.push('/');
      })
        .catch((err) => {
          this.login_info = []
          this.login_error = []
          this.login_error.push("login error, check credentials")

        })
    },
    getLoggedInMemberData: function(){      
      this.$http.get(this.$BASE_URL + '/api/members/member/' + this.$session.get('username') + '/')
          .then(response => {              
            this.$session.set('member_id', response.data[0].member.id)                
          })
          .catch((err) => {
            this.fetch_data_error.push(err)
          })
    }
  }
}
</script>