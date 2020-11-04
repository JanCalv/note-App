import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewNote from '@/components/NewNote'
import ViewNote from '@/components/ViewNote'
import EditNote from '@/components/EditNote'
import CompleteNote from '@/components/CompleteNote'
import Login from '@/components/Login'
import Register from '@/components/Register'
import firebase from 'firebase' // for the authentication process

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/complete',
      name: 'complete',
      component: CompleteNote,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new',
      name: 'new-note',
      component: NewNote,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:title',
      name: 'edit-note',
      component: EditNote,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:title',
      name: 'view-note',
      component: ViewNote,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

/*
  This is the code for the Navigation Guard
  Check if not logged in or logged in
*/
router.beforeEach((to, from, next) => {
  /*
  check for requiredAuth and requreGuest
  check if not logged in (if not logged in it will redirect to login page)
  else if logged in (it will redirect to dashboard page)
  */
  if(to.matched.some(record => record.meta.requiresAuth)){ 
    if(!firebase.auth().currentUser){
      // Go to log in page
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next() //proceed
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if(firebase.auth().currentUser){
      // log in page
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next() //proceed
    }
  } else {
    next() //proceed
  }
});

// Export again the router
export default router