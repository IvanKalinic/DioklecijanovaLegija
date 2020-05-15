<template>
  <v-app>
    <v-navigation-drawer v-model="sideNav" temporary absolute>
      <v-list class="onebyone">
        <v-list-tile 
        v-for="item in menuItems" 
        :key="item.title"
        >
          <v-btn text
          router 
        :to="item.link">
            <v-list-tile-action>
              <v-icon left>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>{{item.title}}</v-list-tile-content>
          </v-btn>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-app-navbar>
      <v-toolbar dark class="indigo darken-4">
        <span class="hidden-sm-and-up">
          <v-app-bar-nav-icon @click.native.stop="sideNav= !sideNav"></v-app-bar-nav-icon>
        </span>
        <v-toolbar-title><router-link to="/" tag="span" style="cursor:pointer">Dev Meetup</router-link></v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn 
          text 
          v-for="item in menuItems" 
          :key="item.title"
          router 
          :to="item.link">
            <!--  flat class="indigo accent-3"  -->
            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
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
      menuItems: [
        { icon: "supervisor_account", title: "View Meetups" ,link:'/meetups'},
        { icon: "room", title: "Organize Meetups",link:'/meetup/new' },
        { icon: "person", title: "Profile",link:'/profile' },
        { icon: "face", title: "Sign up",link:'/signup' },
        { icon: "lock_open", title: "Sign in",link:'/signin' }
      ]
    };
  }
};
</script>

<style scoped>
.onebyone {
  display: flex;
  flex-flow: column wrap;
}
</style>