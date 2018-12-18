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
       * { memos: Array<{ context: string, created_time: timestamp }> }
       */
      userData: null
    },
    getters: {
      user: state => state.user,
      userMemos: state =>
        (state.userData || { memos: [] }).memos.map(memo => {
          return {
            context: memo.context,
            createdTime: memo.created_time.toDate()
          }
        })
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
        await context.dispatch('bindUserData', userDataRef)
      },
      bindUserData: firebaseAction(async ({ bindFirebaseRef }, data) => {
        await bindFirebaseRef('userData', data)
      }),
      async addMemo({ state }, memo) {
        const nowTimeStamp = firebase.firestore.Timestamp.fromDate(new Date())
        await fireStore
          .collection('users')
          .doc(state.user.uid)
          .update({
            memos: firebase.firestore.FieldValue.arrayUnion({
              context: memo,
              created_time: nowTimeStamp
            })
          })
      }
    }
  })
}

export default createStore
