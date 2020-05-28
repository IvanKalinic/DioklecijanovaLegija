<template>
  <v-container>
    <v-layout row wrap>
      <v-col xs12 sm6 class="text-center text-sm-right">
        <v-btn dark large router to="/meetups" class="indigo darken-4">Explore Meetups</v-btn>
      </v-col>
      <v-col xs12 sm6 class="text-center text-sm-left">
        <v-btn dark large router to="/meetup/new" class="indigo darken-4">Organize Meetup</v-btn>
      </v-col>
    </v-layout>
    <!-- <v-layout>
      <v-col xs12 class="text-xs-center">
        <v-progress-circular
         indeterminate 
         color="primary"
         :width="7"
         :size="7"
         v-if="loading"></v-progress-circular>
      </v-col>
    </v-layout>-->
    <div class="text-center">
      <v-progress-circular indeterminate color="primary" v-if="loading"></v-progress-circular>
    </div>

    <v-layout row wrap class="mt-2" v-if="!loading">    <!-- v-if="!loading"-->
      <v-col xs12>
        <v-carousel style="cursor:pointer">
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
            @click="onLoadMeetup(meetup.id)"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <div class="title">{{meetup.title}}</div>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-col xs12 class="text-center">
        <p>Join our awesome meetups !</p>
      </v-col>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push("/meetups/" + id);
    }
  }
};
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 2em;
  padding: 15px;
  left: 40%;
}
</style>