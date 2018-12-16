<template>
  <v-layout>
    <v-flex xs4>
      <!-- login and input -->
      <div v-if="user">
        <!-- already auth -->
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
                <v-icon>
                  delete
                </v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['user', 'userMemos'])
  },
  async mounted() {
    await this.$store.dispatch('getUser')
  },
  methods: {
    ...mapActions(['authGoogle'])
  }
}
</script>
