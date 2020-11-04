<template><!-- @submit.prevent (prevent the form from submitting) -->
  <div id="new-note" class="d-flex justify-content-center">
   <div class="card" style="width: 40rem;">
        <div class="card-body">
         <h3>New note</h3>
         <form @submit.prevent="saveNote"> <!-- @submit.prevent (prevent the form from submitting) -->
            <div class="form-group">
              <label>Title:</label>
              <input type="text" v-model="title" required class="form-control">
              <input type="text" v-model="completed" class="form-control" value="false" hidden>
            </div>
            <div class="form-group">
              <label>Note:</label>
              <textarea class="form-control" v-model="note" required rows="5"></textarea>
            </div>
            <button type="submit" class="btn btn-success">Add Note</button>
            <router-link to="/" class="btn btn-light">Cancel</router-link>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'new-note',
    data () {
      return { //this is bound to the inputs v-model
        title: null,
        note: null,
        completed: false
      }
    },
    methods: {
      /*
      This is the method for adding a note
      using the .add() method
      this.title and this.note is bound to the v-model in the input text
      */
      saveNote () {
        db.collection('notes').add({
          title: this.title,
          note: this.note,
          completed: false
        })
        .then(docRef => this.$router.push('/')) //redirect to home page(dashboard)
      }
    }
}
</script>
