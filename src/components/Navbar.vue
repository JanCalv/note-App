<template>
    <nav id="nav" class="navbar navbar-dark bg-primary">
        <router-link to="/" class="navbar-brand mb-0 h1">Note - Taking Web Application</router-link>
        <ul class="nav justify-content-end">
            <li class="nav-item" v-if="!isLoggedIn">
                <router-link to="/login" class="nav-link text-white" >Log in</router-link>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
                <router-link to="/register" class="nav-link text-white" >Register</router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
                <button @click="logout" class="btn btn-secondary" >Logout</button>
            </li>
        </ul>
    </nav>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'navbar',
    data() {
        return {
            isLoggedIn: false
        }
    },
    /*
    - this code will run right when the component is created or loaded
    - changed the isLoggedIn value when a user has logged in
    */
    created() {
        if(firebase.auth().currentUser) {
            this.isLoggedIn = true;
        }
    },
    methods: {
        /*
        - This is the code for log out user
        */
        logout () {
            firebase.auth().signOut().then(() => {
                this.$router.go({
                    path: this.$router.path
                })
            })
        }
    }
}
</script>
