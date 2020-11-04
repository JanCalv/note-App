// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// This is imported to use the firebase .onAuthStateChanged() method
import firebase from 'firebase'
import './components/firebaseInit'

Vue.config.productionTip = false

/*
To prevent from logging out when the page is reloaded
import firebase and firebase init
placed the new Vue in the app variable
*/
let app;
firebase.auth().onAuthStateChanged(user => {
  if(!app){
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
});

/*
// eslint-disable no-new 
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
*/
