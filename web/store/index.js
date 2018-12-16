import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '../plugins/firebase'
import { firebaseAction, firebaseMutations } from 'vuexfire'

const provider = new firebase.auth.GoogleAuthProvider()
const fireStore = firebase.firestore()
fireStore.settings({
  timestampsInSnapshots: true
})

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state: {
      /**
       * firebase auth user data
       */
      user: null,
      /**
       * { memos: Array<{ context: string, created_time: Date }> }
       */
      userData: Array
    },
    getters: {
      user: state => state.user,
      userData: state => state.userData
    },
    mutations: {
      setUser: (state, user) => {
        state.user = user
      },
      ...firebaseMutations
    },
    actions: {
      async authGoogle() {
        await firebase.auth().signInWithRedirect(provider)
      },
      async getUser(context) {
        if (context.state.user) {
          // already login
          return
        }
        const user = (await firebase.auth().getRedirectResult()).user
        if (!user) {
          // not exist user info
          return
        }
        context.commit('setUser', user)

        const userDataRef = await fireStore.collection('users').doc(user.uid)
        if (!(await userDataRef.get()).exists) {
          // new user !!
          userDataRef.set({ memos: [] })
        }
        context.dispatch('bindUserData', userDataRef)
      },
      bindUserData: firebaseAction(({ bindFirebaseRef }, data) => {
        bindFirebaseRef('userData', data)
      })
    }
  })
}

export default createStore
