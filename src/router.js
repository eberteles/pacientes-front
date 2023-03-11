import Vue from 'vue'
import Router from 'vue-router'
import ListarPacientes from '@/views/ListarPacientes.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'ListarPacientes',
            component: ListarPacientes
        }
    ]
})