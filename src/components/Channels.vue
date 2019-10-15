<template>
  <div class="channels">
    <div class="list-group">
      <router-link :to=" `/channel-detail/`+ 1"> 
      <a href="#" class="list-group-item list-group-item-action flex-column align-items-start border-0">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1"><b>#Channel 1</b></h5>
          <div><span class="badge badge-secondary badge-pill">14</span></div>
        </div>
        <p class="mb-1 text-secondary"><b>Donec  blandit.</b></p>
        <small class="text-primary">3 days ago</small>
      </a>
      </router-link>
      <a href="#" class="list-group-item list-group-item-action flex-column align-items-start border-0">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1"><b>#Some channel</b></h5>
          <div><span class="badge badge-secondary badge-pill">14</span></div>
        </div>
        <p class="mb-1 text-secondary"><b>Donec id elit non mi pd diam eget risus varius blandit.</b></p>
        <small class="text-primary">today 6:30</small>
      </a>
      <a href="#" class="list-group-item list-group-item-action flex-column align-items-start border-0">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">#List channel</h5>    
        </div>
        <p class="mb-1 text-secondary">Donec id elit non mi porta gravida at ed diam eget risus varius blandit.</p>
        <small class="text-primary">just now</small>
      </a>
      <a href="#" class="list-group-item list-group-item-action flex-column align-items-start border-0">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">#List group item heading</h5>          
        </div>
        <p class="mb-1 text-secondary">Donec id elit non mi pd diam eget risus varius blandit.</p>
        <small class="text-primary">today 6:30</small>
      </a>
      <a href="#" class="list-group-item list-group-item-action flex-column align-items-start border-0">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1 ">#Group item heading</h5>         
        </div>
        <p class="mb-1 text-secondary">Donec id elit non mi porta gravida at ed diam eget risus varius blandit.</p>
        <small class="text-primary">just now</small>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Channels',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
