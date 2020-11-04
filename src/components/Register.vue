<template>
    <div id="register" class="d-flex justify-content-center">
        <div class="card" style="width: 40rem;">
            <div class="card-body">
            <h3>Register</h3>
            <form @submit.prevent="register"> <!-- @submit.prevent (prevent the form from submitting) -->
                <div class="form-group">
                    <label>Email address</label>
                    <input type="email" class="form-control" aria-describedby="emailHelp" v-model="email">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" v-model="password">
                </div>
                <button type="submit" class="btn btn-primary">Register</button>
            </form>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'register',
    data () { // this is bound to the v-model in the inputs
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        /*
        - This is the method for creating a user in the firestore cloud database
        - createUserWithEmailAndPassword method
        */
        register: function() {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(() => {
                alert(`Account for ${this.email} has been created!`)
                // $router.go to render all the changes in navbar
                this.$router.go({
                    path: this.$router.path 
                })
            }, err => {alert(err.message)})
        }
    }
}
</script>

<style>

</style>