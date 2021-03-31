import VueRouter from 'vue-router';
import { routes } from './routes.js';

export const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

const publicRoutes = [ 'login', 'register', 'logout', 'discover' ]

router.beforeEach((to, from, next) => {
    
    document.title = to.meta.title || 'eVote';

    let filteredPath = to.path.split('/').filter(element => element.length > 0);

    if( filteredPath.length > 0 && filteredPath[0].length === 2 ) {
        console.log( 'url has language: '+ filteredPath[0]);
        let language = filteredPath[0];
   
        next()
        /*if (store.state.user.logged) {
            // user already logged (getAccountProfile already done) so he can access all the routes
            next()
        } else {
            // test if the user can be logged with his session if not already logged
            store.dispatch('user/getAccountProfile').then(() => {
                // can go next also if not logged and if the route is public
                console.log(store.state.user.logged)
                console.log(to.name)
                console.log(publicRoutes.includes(to.name))
                if (store.state.user.logged || publicRoutes.includes(to.name)) {
                    alert('HELLO!')
                    next()
                } else {
                    // if the route needs to be logged the user is redirected
                    store.commit('notification/showInfo', {
                        title: 'Error',
                        content: 'Authentication issues'
                    })
                    
                    next({ name: 'home' })
                }
            }).catch(() => {
                next({ name: 'home' })
            })
        }*/

    } else{
        next( '/en' + to.fullPath );
    }

});
