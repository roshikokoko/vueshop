<template>
    <div>
        
        
        <div class="col-md-3">
          <!-- 左側選單 (List group) -->
          <div class="list-group sticky-top">
            <a class="list-group-item list-group-item-action"
              href="#" @click.prevent="toParent(item)"
              :class="{ 'active': item === searchText}"
              v-for="item in categories" :key="item">
              <i class="fa fa-street-view" aria-hidden="true"></i>
              {{ item }}
            </a>
            <a href="#" class="list-group-item list-group-item-action"
              @click.prevent="toParent('')"
              :class="{ 'active': searchText === ''}">
              全部顯示
            </a>
            <!--
            <a href="#" class="list-group-item list-group-item-action" @click.prevent="toParent">測試</a>
            -->
          </div>
        </div>
    
    </div>
</template>


<script>
export default {
    data(){
        return{
            products:[],
            categories:[],
            isLoading: false,
            searchText: '',
        }
    },
    computed:{
        /*
        filterData(){
            const vm = this;
            if(vm.searchText){
               return vm.categories.filter((item) => {
                 //  console.log(item);
                   const data = item.toLowerCase().includes(vm.searchText.toLowerCase());
                   return data;
               });
            }
           return this.categories;
        },
        */
    },
    methods:{
        getProducts(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
            vm.isLoading = true;
            this.$http.get(api).then((response)=>{
                vm.isLoading = false;
                vm.products = response.data.products;
                this.getUnique();
            });
        },
        getUnique(){
            const vm = this;
            const categories = new Set();
            vm.products.forEach((item)=>{
                categories.add(item.category);
            })
            vm.categories = Array.from(categories);
        },
        toParent(text){
           // console.log(this.searchText)
            this.searchText = text;
            this.$emit('childByValue',[this.searchText]);   
        }
    },
    created(){
        this.getProducts();
    }
}
</script>

