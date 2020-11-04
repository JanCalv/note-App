<template>
  <div id="edit-note" class="d-flex justify-content-center">
      <div class="card" style="width: 40rem;">
        <div class="card-body">
         <h3>Edit note</h3>
         <form @submit.prevent="updateNote"> <!-- @submit.prevent (prevent the form from submitting) -->
            <div class="form-group">
              <label>Title:</label>
              <input type="text" v-model="title" required class="form-control">
            </div>
            <div class="form-group">
              <label>Note:</label>
              <textarea class="form-control" v-model="note" required rows="5"></textarea>
            </div>
            <button type="submit" class="btn btn-success">Update</button>
            <router-link v-bind:to="{name: 'view-note', params: {title: title}}" class="btn btn-light">Cancel</router-link>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'edit-note',
    data() {
      return {
        title: null,
        note: null
      }
    },

    /*
     Navigation guard
     - Fetch the data using get().then() and foreach() to get each data
     - this code will run before this page loads
     - params.title is defined in the Viewnote route-link
    */
    beforeRouteEnter(to, from, next) {
      db.collection('notes').where('title', '==', to.params.title).get().then(querySnapshot => {
        querySnapshot.forEach(cur => {
          next(vm => {
            vm.title = cur.data().title
            vm.note = cur.data().note
          })
        })
      })
    },  

    /*
    This method is for the editing the notes
    - Fetch the data using get().then() and foreach() to get each data
    - Assigned the data inputs in the cur in foreach to update them
    - Route to the particular note when done editing
    */
    methods: {
      updateNote () {
        db.collection('notes').where('title', '==', this.$route.params.title).get().then(querySnapshot => {
          querySnapshot.forEach(cur => {
            cur.ref.update({
              title: this.title,
              note: this.note
            })
            .then(()=>{
              this.$router.push({name:'view-note', params:{title: this.title}})
            })
          })
        })
      }
    }
}
</script>
