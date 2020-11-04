<template>
    <div id="login" class="d-flex justify-content-center">
        <div class="card" style="width: 40rem;">
            <div class="card-body">
            <h3>Log In</h3>
            <form @submit.prevent="login"> <!-- @submit.prevent (prevent the form from submitting) -->
                <div class="form-group">
                    <label>Email address</label>
                    <input type="email" class="form-control" aria-describedby="emailHelp" v-model="email">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" v-model="password">
                </div>
                <button type="submit" class="btn btn-primary">Log in</button>
            </form>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'login',
    data () { //this is bound to the v-model in the inputs
        return {
            email: '',
            password: ''
        }
    },
    /*
    -This is the method for login
    -using signInWithEmailAndPassword()
    */
    methods: {
        login: function() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
                alert(`${this.email} has succesfully logged in.`)
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