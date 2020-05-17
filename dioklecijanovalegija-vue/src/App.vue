<template>
  <v-app>
    <v-navigation-drawer v-model="sideNav" temporary absolute>
      <v-list class="onebyone">
        <v-list-item 
        v-for="item in menuItems" 
        :key="item.title"
        >    
          <v-btn text         
        :to="item.link">   <!-- router -->
            <v-list-item-action>
              <v-icon left>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>{{item.title}}</v-list-item-content>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-navbar>
      <v-toolbar dark class="indigo darken-4">
        <span class="hidden-sm-and-up">
          <v-app-bar-nav-icon @click.stop="sideNav= !sideNav"></v-app-bar-nav-icon>  <!-- @click.native.stop = ... -->
        </span>
        <v-toolbar-title><router-link to="/" tag="span" style="cursor:pointer">Dev Meetup</router-link></v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn 
          text 
          v-for="item in menuItems" 
          :key="item.title"
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