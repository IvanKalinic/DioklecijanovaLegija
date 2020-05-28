<template>
  <v-dialog width="350px" v-model="editDialog">
    <template v-slot:activator="{ on }">
      <v-btn accent slot="activator" v-on="on">Edit Date</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-col xs12>
            <v-card-title>Edit Meetup Date</v-card-title>
          </v-col>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-col xs12>
            <v-date-picker v-model="editableDate" stlye="width: 100%" actions>
              <template slot-scope="{ save, cancel}">
                <v-btn class="blue--text darken-1" text @click.native="editDialog = false">Close</v-btn>
                <v-btn class="blue--text darken-1" text @click.native="onSaveChanges">Save</v-btn>
              </template>
            </v-date-picker>
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
      editableDate: null
    }
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date)
      const newDay = new Date(this.editableDate).getUTCDate()
      const newMonth = new Date(this.editableDate).getUTCMonth()
      const newYear = new Date(this.editableDate).getUTCFullYear()
      newDate.setUTCDate(newDay)
      newDate.setUTCMonth(newMonth)
      newDate.setUTCFullYear(newYear)
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: newDate
      })
    }
  },
  created() {
    // this.editableDate = new Date(this.meetup.date).toISOString()
    const pickerDate = new Date(this.meetup.date)
    this.editableDate = pickerDate.getUTCFullYear()+'-'+(pickerDate.getUTCMonth()+1)+'-'+pickerDate.getUTCDate()
  }
}
</script>