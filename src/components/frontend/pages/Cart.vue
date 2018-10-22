<template>
    <div>
        <div class="my-5 row justify-content-center">
            <div class="col-md-6">
                <table class="table">
                <thead>
                    <th></th>
                    <th>品名</th>
                    <th>數量</th>
                    <th>單價</th>
                </thead>
                <tbody>
                    <tr v-for="item in cart.carts" :key="item.id" v-if="cart.carts">
                    <td class="align-middle">
                        <button type="button" class="btn btn-outline-danger btn-sm"
                        @click="removeCartItem(item.id)">
                        <i class="far fa-trash-alt"></i>
                        </button>
                    </td>
                    <td class="align-middle">
                        {{ item.product.title }}
                        <div class="text-success" v-if="item.coupon">
                        已套用優惠券
                        </div>
                    </td>
                    <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                    <td class="align-middle text-right">{{ item.final_total }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                    <td colspan="3" class="text-right">總計</td>
                    <td class="text-right">{{ cart.total }}</td>
                    </tr>
                    <tr v-if="cart.final_total !== cart.total">
                    <td colspan="3" class="text-right text-success">折扣價</td>
                    <td class="text-right text-success">{{ cart.final_total }}</td>
                    </tr>
                </tfoot>
                </table>
                <div class="input-group mb-3 input-group-sm">
                <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                    套用優惠碼
                    </button>
                </div>
                </div>
            </div>
        </div>   
    </div>
</template>


<script>
export default {
    data(){
        return {
            cart:{},
            coupon_code:'',
        }
    },
    methods:{
        getCart(){
            const vm=this;
            const url= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            vm.$store.dispatch('updateLoading', true);
            this.$http.get(url).then((response)=>{
                //console.log(response);
                vm.cart = response.data.data;
                vm.$store.dispatch('updateLoading', false);
            });
        },
        addCouponCode(){

        },
        removeCartItem(id){
            const vm=this;
            const url= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
            vm.$store.dispatch('updateLoading', true);
            this.$http.delete(url).then((response)=>{
                vm.getCart();
                vm.$store.dispatch('updateLoading', false);
            });
        }
    },
    created() {
        this.getCart();
    },

}
</script>
