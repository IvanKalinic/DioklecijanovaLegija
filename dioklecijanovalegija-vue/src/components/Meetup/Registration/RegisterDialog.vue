<template>
  <v-dialog width="350px" v-model="registerDialog">
    <template v-slot:activator="{ on }">
      <v-btn dark class="red darken-2" accent slot="activator" v-on="on">
          {{ userIsRegistered ? 'Unregister' : 'Register' }}
      </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-col xs12>
            <v-card-title v-if="userIsRegistered">Unregister from Meetup?</v-card-title>
            <v-card-title v-else>Register for Meetup?</v-card-title>
          </v-col>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-col xs12>
            <v-card-text>You can always change your decision later on.</v-card-text>
          </v-col>
        </v-layout>
        <v-layout row wrap>
          <v-col xs12>
            <v-card-actions>
                <v-btn class="red--text darken-1" text
                @click="registerDialog=false">Cancel</v-btn>
                <v-btn class="green--text darken-1" text
                @click="onAgree">Confirm</v-btn>
            </v-card-actions>
          </v-col>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    props:['meetupId'],
    data(){
        return{
            registerDialog:false
        }
    },
    computed:{
        userIsRegistered() {
            return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
                return meetupId === this.meetupId
            }) >= 0
        }
    },
    methods:{
        onAgree(){
            if(this.userIsRegistered){
                this.$store.dispatch('unregisterUserFromMeetup',this.meetupId)
            }else{
                this.$store.dispatch('registerUserForMeetup',this.meetupId)
            }

        }
    }
  
}
</script>