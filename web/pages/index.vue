<template>
  <v-layout wrap>
    <v-flex
      row
      xl4>
      <!-- login and input -->
      <add-memo-form
        v-if="user"
        :user="user"
        @add-memo="addMemo" />
      <div v-else>
        <v-btn
          color="info"
          @click="authGoogle">
          auth Google
        </v-btn>
      </div>
    </v-flex>
    <v-flex xl8>
      <!-- memo list -->
      <div v-if="user && userMemos">
        <v-list>
          <display-memo
            v-for="(memo, index) in userMemos"
            :key="index"
            :idx="index"
            :memo="memo"
            @delete-memo="deleteMemo" />
        </v-list>
      </div>
    </v-flex>
    <my-dialog
      :loading="loading"
      :loading-text="loadingText" />
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AddMemoForm from '~/components/AddMemoForm.vue'
import DisplayMemo from '~/components/DisplayMemo.vue'
import MyDialog from '~/components/MyDialog.vue'

export default {
  components: {
    AddMemoForm,
    DisplayMemo,
    MyDialog
  },
  data() {
    return {
      loading: false,
      loadingText: ''
    }
  },
  computed: {
    ...mapGetters(['user', 'userMemos'])
  },
  async mounted() {
    this.loading = true
    this.loadingText = 'Loading...'
    this.$store.dispatch('getUser').then(e => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions(['authGoogle']),
    deleteMemo(index) {
      console.log(`call deleteMemo(${index})`)
      this.loading = true
      this.loadingText = 'Deleting...'
      this.$store.dispatch('deleteMemo', index).then(e => {
        this.loading = false
      })
    },
    addMemo({ fact, abstract }) {
      console.log(`call addMemo, newMemo: \'${fact}\', \'${abstract}\'`)
      this.loading = true
      this.loadingText = 'Adding...'
      this.$store.dispatch('addMemo', { fact, abstract }).then(e => {
        this.loading = false
      })
    }
  }
}
</script>
