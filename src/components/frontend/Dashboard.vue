<template>
<div>
    <Navbar></Navbar>
    <router-view></router-view>
  </div>  
</template>

<script>
import Navbar from './Navbar';
//import Sidebar from './Sidebar';

export default {
    components:{
        Navbar,
       // Sidebar
    }
}
</script>
<style lang="scss">
@import "~bootstrap/scss/bootstrap";
.jumbotron-bg {
  /* banners.png */
  background: url('http://www.belieh.com/public/images/knowledge/20150820-link.jpg');
  background-size: cover;
  background-position: center center;
  min-height: 300px;
}
/* 半透明背景 */
.bg-lighter {
  background-color: rgba(255, 255, 255, .45);
}
/* 購物車按鈕 */
.btn-cart {
  background-color: transparent;
  position: relative;
}
/* 購物車按鈕定位 */
.btn-cart .badge {
  position: absolute;
  top: 1px;
  right: 1px;
}
.main-content {
  min-height: calc(100vh - 56px - 176px)
}
.box-shadow {
  box-shadow: 0px 2px 5px rgba(0, 0, 0, .05);
  transition: .3s linear;
}
.box-shadow:hover {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, .08);
}
.dropdown-menu-right {
  right: 0;
  left: auto;
}
.alert-rounded {
  border-radius: 50px;
}

.list-group-item {
  width: 150px;
  font-size: small;
}  
</style>