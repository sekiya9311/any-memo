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
            fact: memo.fact,
            abstract: memo.abstract,
            createdTime: memo.created_time.toDate(),
            updatedTime: memo.updated_time.toDate()
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
      async addMemo({ state }, { fact, abstract }) {
        const nowTimeStamp = firebase.firestore.Timestamp.fromDate(new Date())
        await fireStore
          .collection('users')
          .doc(state.user.uid)
          .update({
            memos: firebase.firestore.FieldValue.arrayUnion({
              fact: fact,
              abstract: abstract,
              created_time: nowTimeStamp,
              updated_time: nowTimeStamp
            })
          })
      },
      async modifyMemo({ dispatch, state }, { index, fact, abstract }) {
        const nowTimeStamp = firebase.firestore.Timestamp.fromDate(new Date())
        const creaTedTime = state.userData.memos[index].created_time
        await dispatch('deleteMemo', index)
        await fireStore
          .collection('users')
          .doc(state.user.uid)
          .update({
            memos: firebase.firestore.FieldValue.arrayUnion({
              fact: fact,
              abstract: abstract,
              created_time: creaTedTime,
              updated_time: nowTimeStamp
            })
          })
      },
      async deleteMemo({ state }, index) {
        const val = state.userData.memos[index]
        await fireStore
          .collection('users')
          .doc(state.user.uid)
          .update({
            memos: firebase.firestore.FieldValue.arrayRemove(val)
          })
      }
    }
  })
}

export default createStore
