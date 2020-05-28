<template>
  <v-app>
    <v-navigation-drawer v-model="sideNav" temporary absolute>
      <v-list class="onebyone">
        <v-list-item v-for="item in menuItems" :key="item.title">
          <v-btn text :to="item.link">
            <!-- router -->
            <v-list-item-action>
              <v-icon left>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>{{item.title}}</v-list-item-content>
          </v-btn>
        </v-list-item>
        <v-list-item 
        v-if="userIsAuthenticated"
        >
          <v-btn text @click="onLogout">
            <!-- router -->
            <v-list-item-action>
              <v-icon left>exit_to_app</v-icon>
            </v-list-item-action>
            <v-list-item-content>Logout</v-list-item-content>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-navbar>
      <v-toolbar dark class="indigo darken-4">
        <span class="hidden-sm-and-up">
          <v-app-bar-nav-icon @click.stop="sideNav= !sideNav"></v-app-bar-nav-icon>
          <!-- @click.native.stop = ... -->
        </span>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor:pointer">Dioklecijanova legija</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn text v-for="item in menuItems" :key="item.title" :to="item.link">
            <!--  flat class="indigo accent-3"  -->
            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
           <v-btn text
            v-if="userIsAuthenticated"
            @click="onLogout">
            <!--  flat class="indigo accent-3"  -->
            <v-icon left dark>exit_to_app</v-icon>
            Logout
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-app-navbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false,
    }
  },
  computed:{
    menuItems () {
       let menuItems= [
        { icon: "face", title: "Sign up", link: "/signup" },
        { icon: "lock_open", title: "Sign in", link: "/signin" }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
        { icon: "supervisor_account", title: "View Meetups", link: "/meetups" },
        { icon: "room", title: "Organize Meetups", link: "/meetup/new" },
        { icon: "person", title: "Profile", link: "/profile" },
        ]
      }
      return menuItems
    },
    userIsAuthenticated(){
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods:{
    onLogout(){
      this.$store.dispatch('logOut')
    }
  }
};
</script>

<style scoped>
.onebyone {
  display: flex;
  flex-flow: column wrap;
}
</style>