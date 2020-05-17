import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl:
          'https://scontent-vie1-1.xx.fbcdn.net/v/t31.0-8/775614_567064249989955_1796373558_o.jpg?_nc_cat=100&_nc_sid=19026a&_nc_eui2=AeFzTXXontYtvKSH3Wgf-VJolJbmN3ZCsqiUluY3dkKyqGsyCTJeR1etwUOPrEr7R9hxVxYTNSOUCwKZTjqcBisu&_nc_ohc=sxVYtJunrtEAX9Zos07&_nc_ht=scontent-vie1-1.xx&oh=a6c8ca0ef787fb2ab7a28c8a5f695784&oe=5EE78EE8',
        id: '1',
        title: 'Meetup in basement',
        date: '2020-07-17'
      },
      {
        imageUrl: require('../assets/legija.png'),
        id: '2',
        title: 'Meetup on Golden gate',
        date: '2020-07-19'
      }
    ],
    user: {
      id: 'abcdefg',
      registeredMeetups: ['1']
    }
  },
  mutations: {},
  actions: {},
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups(state,getters){
      return getters.loadedMeetups.slice(0,5)
    },
    loadedMeetup (state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId
        })
      }
    }
  },
  modules: {}
})
