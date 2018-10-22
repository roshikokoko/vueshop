<template>
  <div id="app">
    
    <router-view/>
     <footer class="bg-dark text-muted py-5">
      <div class="container">
        <ul class="list-inline text-center">
          <li class="list-inline-item">© Copright 2018 BeLieh</li>
        </ul>
      </div>
    </footer>
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
