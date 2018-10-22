<template>
    
  <div>
      <nav class="navbar navbar-dark bg-dark fixed-top">
      <router-link class="navbar-brand" to="/home">
        <i class="fas fa-shipping-fast text-info" aria-hidden="true"></i>
        BeLieh 比咧購物區
      </router-link>
      <!-- 購物車內的數量 (Button 內包含 icon, 數量 badge) -->
      <div class="dropdown ml-auto">
        <button class="btn btn-sm btn-cart" data-toggle="dropdown" data-flip="false">
          <router-link :to="{path:'/cart'}" active-class="active">
          <i class="fa fa-shopping-cart text-light fa-2x" aria-hidden="true"></i>
          <span class="badge badge-pill badge-danger">{{cartCount}}
          </span>
          </router-link>
          <span class="sr-only">unread messages</span>
        </button>
      </div>

    </nav>
    
    <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end">
      <div class="container">
        <!--
        <div class="p-3 bg-lighter">
          <h1 class="display-3 font-weight-bold">GOGO</h1>
          <p class="lead">比咧VUE測試網</p>
        </div>-->
      </div>
    </div>
 </div>
    
</template>

<script>
export default {
  data(){
    return {
    }
  },
  computed:{
    cartCount(){
      return 123;
    }
  }
}
</script>


