<template>
  <v-app class="grey lighten-4">

    <Navbar />
    <Snackbar />

    <v-content class="mx-4 mb-4">
      <router-view/>
    </v-content>
    
    <v-footer>
      <v-spacer/>
      <strong>HNC Teamworking Project - Hannah, Luke, Cameron, Chris and Jordan</strong>
      <v-spacer/>
    </v-footer>
    
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import Snackbar from './components/Snackbar'

export default {
  name: 'App',
  components: { Navbar, Snackbar },
  data () {
    return {
      //snackbar: true,
    }
  },
  computed: {
    snackbar: {
      get: function () {
        return this.$store.state.snackbar
      },
      set: function () {
       this.$store.dispatch('hideSnackbar')
      }
      
    }
  }
}
</script>
