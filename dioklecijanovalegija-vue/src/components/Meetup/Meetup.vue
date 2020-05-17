<template>
<v-container>
    <v-layout row wrap>
        <v-col xs12>
            <v-card>
                <v-card-title>
                    <h5 class="#1a237e --text">{{ meetup.title }}</h5>
                </v-card-title>
                  <v-img
                :src="meetup.imageUrl"
                height="400px"
                ></v-img>
                <v-card-text>
                    <div class="info--text">{{meetup.date}} - Where it takes place</div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                         Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                          nisi ut aliquip ex ea commodo consequat. 
                          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
                          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident
                           sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary"> Register</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-layout>
</v-container>
</template>

<script>
export default {
    props:['id'],
    computed:{
        meetup () {
            return this.$store.getters.loadedMeetup(this.id)
        }
    }
}
</script>