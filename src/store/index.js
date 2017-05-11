/**
 * Created by my on 2017/5/11.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import moving from './moving/index'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        moving
    }
})
