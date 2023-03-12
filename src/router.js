import Vue from 'vue'
import Router from 'vue-router'
import ListPacientes from '@/views/ListPacientes.vue'
import AddPacientes from '@/views/AddPacientes.vue'
import EditPacientes from '@/views/EditPacientes.vue'
import ViewPacientes from '@/views/ViewPacientes.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'ListPacientes',
            component: ListPacientes
        },
        {
            path: '/add/',
            name: 'AddPacientes',
            component: AddPacientes
        },
        {
            path: '/edit/:pacienteId',
            name: 'EditPacientes',
            component: EditPacientes
        },
        {
            path: '/view/:pacienteId',
            name: 'ViewPacientes',
            component: ViewPacientes
        }
    ]
})