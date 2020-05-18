<template>
  <v-snackbar 
    v-model="snackbar" 
    :timeout="3000" 
    bottom 
    right>
    <div>Data Updated</div>
    <v-btn 
      dark 
      text 
      @click="snackbar=false">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  computed: {
    snackbar: {
      get: function() {
        return this.$store.state.snackbar;
      },
      set: function() {
        this.$store.dispatch("hideSnackbar");
      }
    }
  }
};
</script>
