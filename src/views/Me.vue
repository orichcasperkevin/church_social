<template>
  <div class="about">
    <!-- nav bar first -->
      <nav class="navbar navbar-expand  navbar-light bg-light">
          <div class="fixed-top" >
            <a class="navbar-brand" href="#">
              <div style=" background-color:ghostwhite ; padding: 7.5px ; border-radius: 50px">
                back
              </div>
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
       <!-- avatar with name and detail -->
      <div  style="background-color: ghostwhite">      
        <h3 class="container strong text-primary " >
          <img class="mr-3" src="@/assets/logo.png" alt="Generic placeholder image" style="width: 45px; height:auto;">
          Casper Orich
        </h3>
      </div>  
      <!-- personal -->
      <p></p>
      <div  style="background-color: ghostwhite">      
        <h4 class="container strong" >
          Personal Info              
        </h4>        
      </div> 
      <div class="personal-info container">
          <div class="content-list">
            <div>
              <span class="key"><b>user name:</b></span>
              <t/>
              <span class="value">orichcasperkevin</span>
            </div>
          </div>
          <div class="content-list">
            <div>
              <span class="key"><b>first name:</b></span>
              <t/>
              <span class="value">casper</span>
            </div>
          </div>
          <div class="content-list">
            <div>
              <span class="key"><b>middle name:</b></span>
              <t/>
              <span class="value">kevin</span>
            </div>
          </div>
          <div class="content-list">
            <div>
              <span class="key"><b>last name:</b></span>
              <t/>
              <span class="value">orich</span>
            </div>
          </div>
          <div class="content-list">
            <div>
              <span class="key"><b>marital status:</b></span>
              <t/>
              <span class="value">
                  <div class="custom-control custom-checkbox mr-sm-2">
                      <input type="checkbox" class="custom-control-input" id="customControlAutosizing">
                      <label class="custom-control-label" for="customControlAutosizing">single</label>
                  </div>
              </span>
            </div>
          </div>
      </div>
      <!-- contact -->
      <p></p>
      <div  style="background-color: ghostwhite">      
        <h4 class="container strong" >
          Contact    
        </h4>
      </div> 
      <!-- contributions -->
      <p></p>
      <div  style="background-color: ghostwhite">      
        <h4 class="container strong" >
          Contribution    
        </h4>
      </div>  
      <!-- pledges -->
      <p></p>
      <div  style="background-color: ghostwhite">      
        <h4 class="container strong" >
          Tledges
        </h4>
      </div>    
      <!-- tithes -->
      <p></p>
      <div  style="background-color: ghostwhite">      
        <h4 class="container strong" >
          Tithes
        </h4>
      </div>   
  </div>
</template>
