import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        isLoading: false,
    },
    actions:{
        // 第二個是 payload 是外部傳入的參數 ajax 非同步
        updateLoading(context, status){
            context.commit('LOADING', status);
        },
    },
    mutations:{
        //操作資料狀態 同步
        LOADING(state, status){
            state.isLoading = status;
        }
        
    }
})