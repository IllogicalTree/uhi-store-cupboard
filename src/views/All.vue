<template>
  <div class="dashboard">
    <v-snackbar 
      v-model="snackbar" 
      :timeout="4000" 
      top 
      color="success">
      <span>List Updated</span>
      <v-btn 
        color="white" 
        flat 
        @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <v-toolbar 
      flat 
      color="white">
      <v-toolbar-title>Computer</v-toolbar-title>
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
            v-on="on">Add Entry</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <!--
                <v-flex>
                  <v-autocomplete
                    v-model="editedComputer.computerId"
                    :items="computerIds"
                    label='Computer Id'
                  />
                -->
                <v-flex 
                  xs12 
                  sm6 
                  md4>
                  <v-text-field 
                    v-model="editedComputer.computerId" 
                    label="Computer Id" />
                </v-flex>
                <v-flex 
                  xs12 
                  sm6 
                  md4>
                  <v-text-field
                    v-model="editedComputer.processor"
                    :value="compDetails.processor"
                    label="Processor"
                  />
                </v-flex>
                <v-flex 
                  xs12 
                  sm6 
                  md4>
                  <v-text-field 
                    v-model="editedComputer.memory" 
                    label="Memory" />
                </v-flex>
                <v-flex 
                  xs12 
                  sm6 
                  md4>
                  <v-text-field 
                    v-model="editedComputer.graphics" 
                    label="Graphics" />
                </v-flex>
                <v-flex 
                  xs12 
                  sm6 
                  md4>
                  <v-text-field 
                    v-model="editedComputer.username" 
                    label="Username" />
                </v-flex>

                <v-flex 
                  xs12 
                  sm6 
                  md4>
                  <v-text-field 
                    v-model="editedComputer.password" 
                    label="Password" />
                </v-flex>

                <v-flex>
                  <v-autocomplete
                    v-model="editedComputer.userId"
                    :items="userIds"
                    label="Student Id"
                  />
                </v-flex>

                <v-flex 
                  xs12 
                  sm6 
                  md4>
                  <v-text-field 
                    readonly 
                    :value="userDetails().class" 
                    label="Class" />
                </v-flex>

                <v-flex 
                  xs12 
                  sm6 
                  md4>
                  <v-checkbox 
                    v-model="editedComputer.assignment" 
                    label="Assignment" />
                </v-flex>
                <v-flex 
                  xs12 
                  sm6 
                  md4>
                  <v-checkbox 
                    v-model="editedComputer.functional" 
                    label="Functional" />
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
      no-results-text="No Entires found!"
    >
      <template v-slot:items="props">
        <td>{{ props.item.computerId }}</td>
        <td class="text-xs-left">{{ props.item.memory }}</td>
        <td class="text-xs-left">{{ props.item.processor }}</td>
        <td class="text-xs-left">{{ props.item.graphics }}</td>
        <td class="text-xs-left">{{ props.item.username }}</td>
        <td class="text-xs-left">{{ props.item.password }}</td>
        <td class="text-xs-left">{{ props.item.userId ? props.item.userId : "Unassigned" }}</td>
        <td class="text-xs-left">{{ props.item.class ? props.item.class : "Unassigned" }}</td>
        <td class="text-xs-left">{{ props.item.assignment ? "Yes" : "No" }}</td>
        <td class="text-xs-left">{{ props.item.functional ? "Yes" : "No" }}</td>
        <td class="justify-center layout px-0">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon 
                v-on="on" 
                small 
                class="mr-2" 
                @click="editComputer(props.item)">edit</v-icon>
            </template>
            <span>Edit Computer</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon 
                v-on="on" 
                small 
                class="mr-2" 
                @click="deleteComputer(props.item)">delete</v-icon>
            </template>
            <span>Delete Computer</span>
          </v-tooltip>
        </td>
      </template>
      <template v-slot:no-data>No Computers Found!</template>
    </v-data-table>
    <v-btn 
      color="primary" 
      dark 
      class="mb-2" 
      @click="populate()">Add Sample Entry</v-btn>
  </div>
</template>

<script>
import db from "@/fb";

export default {
  data() {
    return {
      snackbar: false,
      search: "",
      dialog: false,
      headers: [
        {
          text: "Computer ID",
          align: "left",
          value: "computerId"
        },
        { text: "Memory", value: "memory" },
        { text: "Processor", value: "processor" },
        { text: "Graphics", value: "graphics" },
        { text: "Username", value: "username" },
        { text: "Password", value: "password" },
        { text: "Student", value: "studentId" },
        { text: "Class", value: "classId" },
        { text: "Assignment", value: "assignment" },
        { text: "Functional", value: "working" }
      ],
      pagnationSync: {
        descending: false,
        page: 1,
        rowsPerPage: 25, // -1 for All",
        sortBy: "os"
      },
      //computers: [],
      // users: [],
      editedIndex: -1,
      editedComputer: {
        functional: true
      },
      defaultComputer: {
        functional: true
      },
      x: ""
    };
  },

  computed: {
    filteredHeaders() {
      return this.headers.filter(h => h.selected);
    },
    filteredItems() {
      return this.items.map(item => {
        let filtered = Object.assign({}, item);
        this.headers.forEach(header => {
          if (!header.selected) delete filtered[header.value];
        });
        return filtered;
      });
    },
    computers() {
      return this.$store.state.computers;
    },

    users() {
      return this.$store.state.users;
    },

    formTitle() {
      return this.editedIndex === -1 ? "New Computer" : "Edit Computer";
    },
    userIds() {
      return this.users.map(user => user.userId);
    },
    computerIds() {
      return this.computers.map(computer => computer.computerId);
    },
    userDetails2() {
      let userObj = this.users.find(
        user => user.userId === this.editedComputer.userId
      );
      //this.editedComputer.class = userObj ? userObj.class : ""
      return userObj ? userObj : "";
    },
    compDetails() {
      let compObj = this.computers.find(
        comp => comp.computerId === this.editedComputer.computerId
      );
      //this.editedComputer.processor = userObj ? userObj.processor : ""
      return compObj ? compObj : "";
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

    userDetails() {
      let userObj = this.users.find(
        user => user.userId === this.editedComputer.userId
      );
      this.editedComputer.class = userObj ? userObj.class : "";
      return userObj ? userObj : "";
    },

    deleteComputer(computer) {
      confirm("Are you sure you want to delete this computer?") &&
        this.$store.dispatch("removeComputer", computer);
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
        this.$store.dispatch("editComputer", this.editedComputer);
      } else {
        // Create a new computer
        this.$store.dispatch("addComputer", this.editedComputer);
      }
      this.close();
    },

    populate() {
      this.$store.dispatch("populate");
    }
  }
};
</script>
