<template>
  <v-dialog width="350px" v-model="editDialog">
    <template v-slot:activator="{ on }">
      <v-btn accent slot="activator" v-on="on">Edit Time</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-col xs12>
            <v-card-title>Edit Meetup Time</v-card-title>
          </v-col>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-col xs12>
            <v-time-picker v-model="editableTime" stlye="..." actions>
              <template slot-scope="{ save, cancel}">
                <v-btn class="blue--text darken-1" text @click.native="editDialog = false">Close</v-btn>
                <v-btn class="blue--text darken-1" text @click.native="onSaveChanges">Save</v-btn>
              </template>
            </v-time-picker>
          </v-col>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      editDialog: false,
      editableTime: null
    }
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date)
     const hours = this.editableTime.match(/^(\d+)/)[1]
    const minutes = this.editableTime.match(/:(\d+)/)[1]
    newDate.setHours(hours)
    newDate.setMinutes(minutes)
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: newDate
      })
    }
  },
  created() {
    // this.editableDate = new Date(this.meetup.date).toISOString()
    // const pickerDate = new Date(this.meetup.date)
    // const editDate = pickerDate.getUTCFullYear()+'-'+(pickerDate.getUTCMonth()+1)+'-'+pickerDate.getUTCDate()
    
    // let date = new Date(this.meetup.date)
    // let hours = date.getHours()
    // let minutes= date.getMinutes()
    // this.editableTime = hours+ "." + minutes
     this.editableTime = new Date(this.meetup.date)
  }
}
</script>