<template>
  <v-layout>
    <v-flex xs4>
      <!-- login and input -->
      <div v-if="user">
        <!-- already auth -->
        <v-form>
          <v-textarea v-model="newMemo" />
          <v-btn
            color="info"
            @click="addMemo">
            add memo
          </v-btn>
        </v-form>
      </div>
      <div v-else>
        <v-btn
          color="info"
          @click="authGoogle">auth Google</v-btn>
      </div>
    </v-flex>
    <v-flex xs8>
      <!-- memo list -->
      <div v-if="user && userMemos">
        <v-list>
          <template v-for="(memo, index) in userMemos">
            <v-list-tile :key="index">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ memo.context }}
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  {{ memo.createdTime.toLocaleString() }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon @click="deleteMemo(index)">
                  delete
                </v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </div>
    </v-flex>
    <v-dialog
      v-model="loading"
      width="500">
      <v-card>
        <v-card-title
          primary-title>
          Loading...
        </v-card-title>
        <v-divider />
        <v-card-actions>
          <v-progress-linear
            :indeterminate="true" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      newMemo: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters(['user', 'userMemos'])
  },
  async mounted() {
    this.loading = true
    this.$store.dispatch('getUser').then(e => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions(['authGoogle']),
    deleteMemo(index) {
      // TODO
      console.log(`call deleteMemo(${index})`)
    },
    addMemo() {
      // TODO
      console.log(`call addMemo, newMemo: \'${this.newMemo}\'`)
      this.newMemo = ''
    }
  }
}
</script>
