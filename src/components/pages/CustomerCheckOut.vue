<template>
    <div>結帳確認</div>
</template>


<script>
export default {
    data(){
        return{
            orderId:''
        }
    },
    created() {
        this.orderId = this.$route.params.orderId;
        console.log(this.orderId);
    },
}
</script>
