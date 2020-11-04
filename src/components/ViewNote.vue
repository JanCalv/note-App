<template>
  <div id="view-note" class="d-flex justify-content-center">
    <div class="card" style="width: 40rem;">
      <div class="card-body">
        <h1 class="card-title">{{title}}</h1>
        <p class="card-text">{{note}}</p>
        <p class="card-text" hidden>{{completed}}</p>
        <button @click="deleteNote" type="button" class="btn btn-danger"><i class="fa fa-trash"></i></button> 
        <router-link v-bind:to ="{name: 'edit-note', params:{title: title}}" class="btn btn-success">
        <i class="fa fa-pencil"></i>
        </router-link>     
        <button @click = "completeNote" class="btn btn-info" v-if="!completed">Completed</button>
        <button @click = "completeNote" class="btn btn-info" v-else>Undone</button>
      </div>
      <router-link to="/" class="btn btn-secondary">Back</router-link> 
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'view-note',
    data() { //this is bound to the inputs v-model
      return{
        title: null,
        note: null,
        completed: null
      }
    },

    /*
     Navigation guard
     this code will run before this page loads
     params.title is defined in the dashboard route-link
    */
    beforeRouteEnter(to, from, next) {
      db.collection('notes').where('title', '==', to.params.title).get().then(querySnapshot => {
        querySnapshot.forEach(cur => {
          next(vm => {
            vm.title = cur.data().title
            vm.note = cur.data().note
            vm.completed = cur.data().completed
          })
        })
      })
    },

    /*
    Event methods
    This is the code for the deletion of notes
    $route - this page
    $router - to redirect page
    */
    methods: {
      deleteNote (){
        if(confirm('Are you sure you want to delete the notes?')){
           db.collection('notes').where('title', '==', this.$route.params.title).get().then(querySnapshot => {
            querySnapshot.forEach(cur => {
            cur.ref.delete()
            this.$router.push('/')
            })
          })  
        }
      },

      /*
      This is the code for the completion of notes
      Get the specific note data from firestore and changed/update its value when triggered
      */
      completeNote () {
        db.collection('notes').where('title', '==', this.$route.params.title).get().then(querySnapshot => {
            querySnapshot.forEach(cur => {
              cur.ref.update({
                completed: !cur.data().completed
              })
              .then(()=> this.$router.go({path: this.$router.path}))
              if (cur.data().completed == true) {
                  alert(`You have undone the "${cur.data().title}" note`)
                } else {
                  alert(`Note: "${cur.data().title}" is complete`)
                }
            })
        })  
      }
    }
}
</script>

<style scoped>
  .card-text {
    padding: 10px;
    font-size: 20px;
  }
</style>
