<template>
  <v-dialog width="350px" v-model="editDialog">
    <template v-slot:activator="{ on }">
      <v-btn fab accent slot="activator" v-on="on">
        <v-icon>edit</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-layout row wrap>
        <v-col xs12>
          <v-card-title>Edit Meetup</v-card-title>
        </v-col>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row wrap>
        <v-col xs12>
          <v-card-text>
            <v-text-field
              name="title"
              label="Title*"
              id="title"
              v-model="editedTitle"
              :rules="rules"
            ></v-text-field>
            <v-textarea
              multi-line
              name="description"
              label="Description*"
              id="description"
              v-model="editedDescription"
              :rules="rules"
            ></v-textarea>
          </v-card-text>
        </v-col>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row wrap>
        <v-col xs12>
          <v-card-actions>
            <v-col class="text-center text-sm-right">
              <v-btn flat class="blue--text darken-1" @click="editDialog=fase">Close</v-btn>
            </v-col>
            <v-col class="text-center text-sm-left">
              <v-btn flat class="blue--text darken-1" @click="onSaveChanges">Save</v-btn>
            </v-col>
          </v-card-actions>
        </v-col>
      </v-layout>
    </v-card>
  </v-dialog>
</template>




<script>
export default {
  props: ["meetup"],
  data() {
    return {
      editDialog: false,
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
      rules: [
        v => !!v || "This field is required",
        v => v.length >= 4 || "Title must be more than 3 characters"
      ]
    };
  },
  methods: {
    onSaveChanges() {
      if (
        this.editedTitle.trim() === "" ||
        this.editedDescription.trim() === ""
      ) {
        return;
      }
      this.editDialog = false
      this.$store.dispatch('updateMeetupData',{
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription
      })
    }
  }
};
</script>

<style scoped>
.divider {
  width: 15px;
  height: auto;
  display: inline-block;
}
</style>