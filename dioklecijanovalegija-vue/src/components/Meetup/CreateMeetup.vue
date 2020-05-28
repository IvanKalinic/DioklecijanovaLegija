<template>
<v-container>
  <v-layout row>
    <v-col xs12>
      <h2 class="#1a237e --text">Create a new meetup.</h2>
    </v-col>
  </v-layout>
  <v-layout row>
    <v-col xs12>
      <form @submit.prevent="onCreateMeetup">
        <v-layout row>
          <v-col xs12 sm6 offset-sm3>
            <v-text-field
            name="title"
            label="Title*"
            id="title"
            v-model="title"
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
            v-model="location"
            :rules="rules"
            ></v-text-field>
          </v-col>
        </v-layout>
        <v-layout row>
          <v-col xs12 sm6 offset-sm3>
            <v-btn class="primary" raised  @click="onPickFile">Upload Image
              <input 
              type="file"
              style="display: none"
              ref="fileInput"
              accept="image/*"
              @change="onFilePicked">
            </v-btn>
          </v-col>
        </v-layout>
        <v-layout row>
          <v-col xs12 sm6 offset-sm3>
            <img :src="imageUrl" height="200">
          </v-col>
        </v-layout>
        <v-layout row>
          <v-col xs12 sm6 offset-sm3>
            <v-textarea
             multi-line
            name="description"
            label="Description*"
            id="description"
            v-model="description"
            :rules="rules"
            ></v-textarea>
          </v-col>
        </v-layout>
        <v-layout row>
          <v-col xs12 sm6 offset-sm3>
            <h4>Choose a Date & Time</h4>
          </v-col>
        </v-layout>
        <v-layout row>
          <v-col xs12 sm6 offset-sm3>
            <v-date-picker v-model="date"></v-date-picker>
          </v-col>
        </v-layout>
          <v-layout row>
          <v-col xs12 sm6 offset-sm3>
            <v-time-picker v-model="time"></v-time-picker>
          </v-col>
        </v-layout>
        <v-layout row>
          <v-col xs12 sm6 offset-sm3>
            <v-btn 
            class="primary" 
            :disabled="!formIsValid"
            type="submit">Create Meetup</v-btn>
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
         (v) => !!v || 'This field is required',
         (v) => v.length >= 4 || 'Title must be more than 3 characters'
       ],
       title:'',
       location:'',
       imageUrl:'',
       description:'',
       date:'',
       time:new Date(),
       image: null
    }
  },
  computed : {
    formIsValid () {
      return this.title !== '' &&
       this.location !=='' &&
        this.imageUrl !== '' &&
         this.description !== ''
    },
    submittableDateTime(){
      const date = new Date(this.date)
      if(typeof this.time === 'string'){
          const hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)  
      }else{
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }
      console.log(date)
      return date
    }
  },
  methods:{
    onCreateMeetup(){
      if(!this.formIsValid){
        return
      }
      if(!this.image){
        return
      }
      const meetupData = {
        title: this.title,
        location:this.location,
        image:this.image,
        description:this.description,
        date: this.submittableDateTime
      }
      this.$store.dispatch('createMeetup',meetupData)
      this.$router.push('/meetups')
    },
    onPickFile(){
      this.$refs.fileInput.click()
    },
    onFilePicked(event){
      const files = event.target.files
      let filename= files[0].name
      if(filename.lastIndexOf('.') <= 0){
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load',() => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image= files
    }
  
  }
}
</script>

