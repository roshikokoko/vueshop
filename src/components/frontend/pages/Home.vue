<template>
    <div>
       
        <div class="container main-content mb-3">
            <div class="row"> 
            
                <Sidebar v-on:childByValue="childByValue"></Sidebar>
            
                <div class="col-md-9">
                    <div class="d-flex mb-4">
                        <!-- Search bar -->
                        <form class="form-inline my-3 my-lg-0">
                            <div class="input-group">
                                <input class="form-control" type="text" v-model="searchText1" placeholder="Search" aria-label="Search"> 
                            </div>
                        </form>
                    </div>
                    <!-- content -->
                    <div class="tab-pane" id="list-gift">
                        <div class="row align-items-stretch">
                            <div class="col-md-4 mb-4" v-for="(item) in filterData" :key="item.id">
                                <div class="card border-0 box-shadow text-center h-100">
                                    <img class="card-img-top" :src="item.imageUrl" alt="Card image cap">
                                    <div class="card-body">
                                        <h4 class="card-title">{{ item.title }}</h4>
                                        <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                                        <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                                        <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>    
                                    </div>

                                    <div class="card-footer border-top-0 bg-white">

                                        <button class="btn btn-outline-secondary btn-block btn-sm" @click="getProduct(item.id)">
                                            <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id" ></i>
                                            查看更多
                                        </button>    
                                        <button class="btn btn-outline-secondary btn-block btn-sm" @click="addToCart(item)">
                                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i> 加到購物車
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


          <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img :src="product.imageUrl" class="img-fluid" alt="">
                    <blockquote class="blockquote mt-3">
                    <p class="mb-0">{{ product.content }}</p>
                    <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                    </blockquote>
                    <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
                    <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                    <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
                    </div>
                    <select name="" class="form-control mt-3" v-model="product.num">
                    <option :value="num" v-for="num in 10" :key="num">
                        選購 {{num}} {{product.unit}}
                    </option>
                    </select>
                </div>
                <div class="modal-footer">
                    <div class="text-muted text-nowrap mr-3">
                    小計 <strong>{{ product.num * product.price }}</strong> 元
                    </div>
                    <button type="button" class="btn btn-primary"
                    @click="addToCart(product)">
                    <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                    加到購物車
                    </button>
                </div>
                </div>
            </div>
        </div>   


    </div>
</template>


<script>
import $ from 'jquery';
import Sidebar from './../Sidebar';

export default {
    name:'Home',
    components:{
        Sidebar,
    },
    data(){
        return {
            products:[],
            categories: [],
       //     isLoading: false,
            searchText: '',
            searchText1:'',
            status:{
                loadingItem:'',
            },
            product:{},
            cart:{},
        };
    },
    computed:{
        filterData(){
            const vm = this;
            console.log(vm.searchText);
            if(vm.searchText){
               return vm.products.filter((item) => {
                   const data = item.category.toLowerCase().includes(vm.searchText.toLowerCase());
                   return data;
               });
            }
            if(vm.searchText1){
                return vm.products.filter((item)=>{
                    const data = item.title.toLowerCase().includes(vm.searchText1.toLowerCase());
                    return data;
                });
                
            }

            return this.products;
        },
    },
    methods:{
        getProducts(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
            //vm.isLoading = true;
            vm.$store.state.isLoading = true;
            this.$http.get(api).then((response)=>{
                vm.$store.state.isLoading = false;
                vm.products = response.data.products;
            });
        },
        childByValue: function (childValue) {
            const vm = this;
            vm.searchText = childValue[0];
        },
        getProduct(id){
            const vm = this;
            const api= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
            vm.$store.state.isLoading = true;
            this.$http.get(api).then((response)=>{
                vm.product = response.data.product;
                $('#productModal').modal('show');
                 vm.status.loadingItem = '';
                 vm.$store.state.isLoading = false;
            });
        },
        //addToCart(id, qty=1){
        addToCart(goods){    
            console.log('goods', goods);
            const vm = this;
            const url= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
           
           var alreadyIndex = vm.cart.carts.findIndex(function (item, index) {
                return item.product.id === goods.id;
            });

            //console.log('alreadyIndex', alreadyIndex);

            // 如果不存在则添加
           if (alreadyIndex === -1) {
                const cart ={
                    product_id: goods.id,
                    qty:1,
                };
                this.$http.post(url,{data:cart}).then((response)=>{
                    vm.status.loadingItem = '';
                // vm.getCart();
                    $('#productModal').modal('hide');
                    vm.$router.push('/cart');
                });
                return;
             }

            var alreadyGoods = vm.cart.carts[alreadyIndex];
           // console.log('alreadyGoods', alreadyGoods);
            this.$set(vm.cart.carts[alreadyIndex], 'qty',  ++alreadyGoods.qty);
           // console.log('goods.product_id', goods.id);
            this.removeCartItem(alreadyGoods.id);

            const cart ={
                product_id: goods.id,
                qty:alreadyGoods.qty,
            };
            this.$http.post(url,{data:cart}).then((response)=>{
                vm.status.loadingItem = '';
                $('#productModal').modal('hide');
                vm.$router.push('/cart');
            });
        },
        removeCartItem(id){
            const vm=this;
            const url= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
            this.$http.delete(url).then((response)=>{
                console.log(response);
            });
            return;
        },
        getCart(){
            const vm=this;
            const url= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            vm.$store.state.isLoading = true;
            this.$http.get(url).then((response)=>{
               console.log('getCart', response);
                vm.cart = response.data.data;
               // vm.isLoading = false;
               vm.$store.state.isLoading = false;
            });
        },
        /*
        searchData(){
            const vm = this;
        }*/
    },
    created() {
        this.getProducts();
        this.getCart();
    },
}
</script>

<style scoped>

</style>
