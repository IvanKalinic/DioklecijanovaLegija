<template>
<v-container>
  <v-layout row>
    <v-col xs12>
      <h2 class="#1a237e --text">Create a new meetup.</h2>
    </v-col>
  </v-layout>
  <v-layout row>
    <v-col xs12>
      <form>
        <v-layout row>
          <v-col xs12 sm6 offset-sm3>
            <v-text-field
            name="title"
            label="Title*"
            id="title"
            :rules="rules"
            ></v-text-field>
          </v-col>
        </v-layout>
        <v-layout row>
          <v-col xs12 sm6 offset-sm3>
            <v-text-field
            name="location"
            label="Location*"
            id="location"
            :rules="rules"
            ></v-text-field>
          </v-col>
        </v-layout>
      </form>
    </v-col>
  </v-layout>
</v-container>
</template>

<script>
export default {
  data(){
    return{
       rules:[
         (v) => !!v || 'Title is required',
         (v) => v.length >= 4 || 'Title must be more than 3 characters'
       ]
    }
  }
}
</script>

