import store from '@/store'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Registration from '@/components/Registration'

export const routes = [
  {
    path: '/:lang',
    component: { render (c) { return c('router-view') } },
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      }, 
      {
        path: 'login',
        name: 'login',
        component: Login
      },
      {
        path: 'register',
        name: 'register',
        component: Registration
      },
      {
        path: 'logout',
        name: 'logout',
        beforeEnter: (to, from, next) => {
          store.dispatch('user/signOut').then(signedOut => {
            if (signedOut) {
              next({ name: 'home' })
            }
          })
        }
      }
    ]
  }
];
