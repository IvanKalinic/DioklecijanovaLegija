<template>
  <v-container>
    <div class="text-center" v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <v-layout row wrap v-else>
      <v-col xs12>
        <v-card>
          <v-card-title>
            <h5 class="#1a237e --text">{{ meetup.title }}</h5>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
            </template>
          </v-card-title>
          <v-img :src="meetup.imageUrl" height="400px"></v-img>
          <v-card-text>
            <div class="info--text">{{meetup.date | date }} - {{meetup.location }}</div>
            <div class="text-center">
              <app-edit-meetup-date-dialog :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-date-dialog>
              <span class="this"></span>
              <app-edit-meetup-time-dialog :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-time-dialog>
            </div>
            <div>{{meetup.description}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn color="primary">Register</v-btn> -->
            <app-meetup-register-dialog
             :meetupId="meetup.id" 
             v-if="userIsAuthenticated && !userIsCreator"></app-meetup-register-dialog>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creatorId;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style scoped>

.this{
    display:inline-block; 
    width:32px;
}
    
</style>