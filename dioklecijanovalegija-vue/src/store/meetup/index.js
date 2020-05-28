
import * as firebase from 'firebase'


export default {
  state: {
    loadedMeetups: [
      // {
      //   imageUrl:
      //     'https://scontent-vie1-1.xx.fbcdn.net/v/t31.0-8/775614_567064249989955_1796373558_o.jpg?_nc_cat=100&_nc_sid=19026a&_nc_eui2=AeFzTXXontYtvKSH3Wgf-VJolJbmN3ZCsqiUluY3dkKyqGsyCTJeR1etwUOPrEr7R9hxVxYTNSOUCwKZTjqcBisu&_nc_ohc=sxVYtJunrtEAX9Zos07&_nc_ht=scontent-vie1-1.xx&oh=a6c8ca0ef787fb2ab7a28c8a5f695784&oe=5EE78EE8',
      //   id: '1',
      //   title: 'Meetup in basement',
      //   date: new Date(),
      //   location: 'Diocletian basement',
      //   description: 'Come to the basements!'
      // },
      // {
      //   imageUrl: require('../assets/legija.png'),
      //   id: '2',
      //   title: 'Meetup on Golden gate',
      //   date: new Date(),
      //   location: 'Golden gate',
      //   description: 'Join us on a Golden gate'
      // }
    ]
  },
  mutations: {
    setLoadedMeetups(state,payload){
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup(state,payload){
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if(payload.title ){
        meetup.title=payload.title
      }
      if(payload.description){
        meetup.description=payload.description
      }
      if(payload.date){
        meetup.date=payload.date
      }
    }
  },
  actions: {
    loadMeetups({commit}){
      commit('setLoading',true)
      firebase.database().ref('meetups').once('value')
        .then( (data) => {
          const meetups = []
          const obj = data.val()
          for(let key in obj){
            meetups.push({
              id: key,
              title: obj[key].title,
              description:obj[key].description,
              imageUrl:obj[key].imageUrl,
              date:obj[key].date,
              location:obj[key].location,
              creatorId:obj[key].creatorId
            })
          }
          commit('setLoadedMeetups',meetups)
          commit('setLoading',false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading',true)
          }
        )
    },
    createMeetup ({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId:getters.user.id
      }
      let imageUrl
      let key
      let ext
      firebase.database().ref('meetups').push(meetup)
      .then((data)=> {
        commit('setLoading',false)
       key = data.key
        // commit('setLoading',false)
        return key
      })
      .then( key => {
          const filename = payload.image[0].name
          console.log(filename)
          ext = filename.slice(filename.lastIndexOf('.'))     //extension
          return firebase.storage().ref('meetups/' + key  + ext).put(payload.image[0])
      })
      .then(fileData => {
        // console.log(fileData)
          return firebase.storage().ref('meetups/'+ key + ext).getDownloadURL()
         
         
          // imageUrl = fileData.metadata.downloadURLs[0]
          // return firebase.database().ref('meetups').child(key).update({ imageUrl: imageUrl})
      })
      .then(imageUrl => {
        return firebase.database().ref('meetups').child(key).update({imageUrl : imageUrl})
      })
      .then( () => {
          commit('createMeetup',{
          ...meetup,
          imageUrl: imageUrl,
          id:key
        })
        
      })
      .catch((error) => {
        console.log(error)
      })
      // reachout to firebase and store it
      
      // commit('createMeetup', meetup)
    },
    updateMeetupData({commit},payload){
      commit('setLoading',true)
      const updateObj = {}
      if(payload.title){
        updateObj.title= payload.title
      }
      if(payload.description){
        updateObj.description= payload.description
      }
      if(payload.date){
        updateObj.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
              .then( ()=> {
                commit('setLoading',false)
                commit('updateMeetup',payload)
              })
              .catch(error => {
                console.log(error)
                commit('setLoading',false)
              })
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId
        })
      }
    } 
  }
  
}
