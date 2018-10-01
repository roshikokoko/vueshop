<template>
  <div id="app">
    
    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'App',

  /*
  created() {
  //   console.log(process.env);
   const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
  //  console.log(process.env.APIPATH);
   // const api = 'https://vue-course-api.hexschool.io/api/roshiko/products';
    this.$http.get(api).then((response) => {
      console.log(response.data)
    })
  },
  */
}
</script>

<style lang="scss">
@import "./assets/all.scss";
</style>
