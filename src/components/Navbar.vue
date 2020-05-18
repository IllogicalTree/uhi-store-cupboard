<template>
  <nav>
    <v-toolbar 
      flat 
      app>
      <v-toolbar-side-icon 
        class="grey--text" 
        @click="drawer = !drawer" />

      <v-toolbar-title class="text-uppercase grey--text">
        <span>Store Cupboard</span>
      </v-toolbar-title>

      <v-spacer />
    </v-toolbar>

    <v-navigation-drawer 
      v-model="drawer" 
      app 
      class="primary">
      <v-layout 
        column 
        align-center />

      <v-list>
        <v-list-tile 
          v-for="link in links" 
          :key="link.text" 
          :to="link.route" 
          router>
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <a
          href="https://forms.office.com/Pages/ResponsePage.aspx?id=3PnkINzhQk-rJ958IELqY9R43MNgrTBLjBXigm0fGNBUQkJGWDlWVlJJNFNTRk8yRkgxVk1BTDk5Mi4u"
        >
          <v-list-tile>
            <v-list-tile-action>
              <v-icon class="white--text">feedback</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="white--text">Feedback</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </a>

        <br >

        <v-list-tile>
          <div
            class="white--text"
          >Please note that that the changes made to the user id or class from within the user tab will not currently be reflected in the dashboard.</div>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: "dashboard", text: "Computers", route: "/" },
        { icon: "person", text: "Users", route: "/users" }
      ],
      snackbar: false
    };
  }
};
</script>
