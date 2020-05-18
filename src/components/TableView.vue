<template>
  <div class="dashboard">
    <v-toolbar 
      flat 
      color="white">
      <v-toolbar-title>{{ title }}s</v-toolbar-title>
      <v-spacer />
      <v-text-field 
        v-model="search" 
        append-icon="search" 
        label="Search" 
        single-line 
        hide-details />
      <v-spacer />
      <v-dialog 
        v-model="dialog" 
        max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn 
            color="primary" 
            dark 
            class="mb-2" 
            v-on="on">Add {{ title }}</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex 
                  v-for="field in fields" 
                  :key="field" 
                  class="text-xs-left" 
                  xs12 
                  sm6 
                  md4>
                  <v-text-field 
                    v-model="editedComputer[field]" 
                    :label="field" />
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn 
              color="blue darken-1" 
              flat 
              @click="close">Cancel</v-btn>
            <v-btn 
              color="blue darken-1" 
              flat 
              @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="computers"
      :pagination.sync="pagnationSync"
      :search="search"
      class="elevation-1"
      :no-results-text="'No ' + title + 's found!'"
    >
      <template v-slot:items="props">
        <td 
          v-for="field in fields" 
          :key="field" 
          class="text-xs-left">{{ props.item[field] }}</td>
        <td class="justify-center layout px-0">
          <v-icon 
            small 
            class="mr-2" 
            @click="editComputer(props.item)">edit</v-icon>
          <v-icon 
            small 
            @click="deleteComputer(props.item)">delete</v-icon>
        </td>
      </template>
      <template v-slot:no-data>No {{ title }}s Found!</template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      search: "",
      dialog: false,
      pagnationSync: {
        descending: false,
        page: 1,
        rowsPerPage: 25, // -1 for All",
        sortBy: "computerId"
      },
      //computers: [],
      editedIndex: -1,
      editedComputer: {},
      defaultComputer: {}
    };
  },
  props: {
    title: {
      type: String,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    fields: {
      type: Array,
      required: true
    }
  },

  computed: {
    computers() {
      return this.title === "Computer"
        ? this.$store.state.computers
        : this.$store.state.users;
    },
    formTitle() {
      return this.editedIndex === -1
        ? "New " + this.title
        : "Edit " + this.title;
    }
  },
  watch: {
    //Will ensure menu is closed when dialog is false
    dialog(val) {
      //console.log('dialog',val)
      val || this.close();
    }
  },

  methods: {
    editComputer(computer) {
      this.editedIndex = this.computers.indexOf(computer);
      this.editedComputer = Object.assign({}, computer);
      this.dialog = true;
    },

    deleteComputer(computer) {
      console.log(computer);
      confirm("Are you sure you want to delete this " + this.title + "?") &&
        this.$store.dispatch("remove" + this.title, computer);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        // Clear computer details shortly after close
        this.editedComputer = this.defaultComputer;
        this.editedIndex = -1;
      }, 10);
    },

    save() {
      if (this.editedIndex > -1) {
        // Update an exisiting computer
        this.$store.dispatch("edit" + this.title, this.editedComputer);
      } else {
        // Create a new computer
        this.$store.dispatch("add" + this.title, this.editedComputer);
      }
      this.close();
    }
  }
};
</script>