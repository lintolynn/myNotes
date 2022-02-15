import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default ()=>{
    let store = new Vuex.Store({
        state:{
            name:'zf',
            age:10
        },
        mutations:{
            changeName(state){
                state.name = 'jw'
            },
            changeAge(state){
                state.age = 100;
            }
        },
        actions:{
            changeAll({commit}){
                return new Promise((resolve,reject)=>{
                    setTimeout(() => {
                        commit('changeName')
                        commit('changeAge');
                        resolve();
                    }, 3000);
                })
            }
        }
    })
    if(typeof window != 'undefined' && window.__INITIAL_STATE__ ){
        store.replaceState(window.__INITIAL_STATE__)
    }
    return store;
}