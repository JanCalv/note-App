<template>
  <div id="dashboard">
    <div class="container">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Notes</th>
            <th class="action-th" scope="col"><router-link to="/complete" class="btn btn-info">See Completed Notes</router-link></th>
          </tr>
        </thead>
        <tbody>
           <tr v-for="note in notes" v-bind:key="note.key">
            <td class="titles" v-bind:class="{'is-complete': note.completed}">{{note.title}}</td>
            <td>
              <router-link v-bind:to="{name: 'view-note', params: {title: note.title}}" class="secondary-content">
                <button type="button" class="btn btn-outline-primary">Show Note</button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
        <div class="fixed-action-btn">
          <router-link to="/new" class="float">
            <i class="fa fa-plus my-float"></i>
          </router-link>
        </div> 
    </div>
  </div> 
</template>

<script>
import db from './firebaseInit' // We imported the database from the init js 
export default {
    name: 'dashboard',
    data() {
      return {
        notes: [],
      }
    },

    /*
    -Fetch the data from the firestore database to the page
    -this code will run right when the component is created or loaded
    -assigned the data in a object property
    -push data to the data structure
    */
    created() {
      db.collection('notes').get().then(querySnapshot => {
        querySnapshot.forEach(cur=> {
          const data = {
            'key': cur.id,
            'title': cur.data().title,
            'note': cur.data().note,
            'completed': cur.data().completed
          }
          this.notes.push(data);
        });
      });
    }
}
</script>

<style scoped>
  .float{
    position:fixed;
    width:60px;
    height:60px;
    bottom:40px;
    right:40px;
    background-color:#0C9;
    color:#FFF;
    border-radius:50px;
    text-align:center;
    box-shadow: 2px 2px 3px #999;
  }

  .my-float{
    margin-top:22px;
  }

  .table{
    margin-top: 20px;
  }

  .action-th {
    width: 20%;
  }

  .titles{
    font-size: 20px;
  }

  .is-complete {
    color: red;
    text-decoration: line-through;
  }

  /* .completed-table {
    display: none;
  } */

</style>
