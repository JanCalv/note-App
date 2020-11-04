<template>
    <div id="complete" class="d-flex justify-content-center">
        <table class="table completed-table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Completed Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="note in notes" v-bind:key="note.key">
                    <td class="titles" v-bind:class="{'is-complete': note.completed}"><li>{{note.title}}</li></td>     
                </tr>
            </tbody>
            <router-link to="/" class="btn btn-secondary mt-5">Back</router-link>
      </table>
    </div>
</template>

<script>
import db from './firebaseInit' //Database
export default {
    name: 'complete',
    data() {
        return {
            notes: [] //Data struct for the completed notes
        }
    },

    /*
    -Fetch the data from the firestore database to the page
    -this code will run as long as the page loads
    -assigned the data in a object property
    -push data to the data structure if completed = true
    */
    created () {
        db.collection('notes').get().then(querySnapshot => {
            querySnapshot.forEach(cur=> {
                const data = {
                'key': cur.id,
                'title': cur.data().title,
                'note': cur.data().note,
                'completed': cur.data().completed
                }
                if(data.completed == true){
                    this.notes.push(data)
                } 
            });
            if(this.notes.length == 0) {
                alert('You dont have any complete notes')
                this.$router.push('/')
            }
        });
    }
}
</script>

<style scoped>
    .table {
        width: 50%;
        margin-top: 20px;
    }

    .titles{
        font-size: 20px;
        color: red;
    }
</style>