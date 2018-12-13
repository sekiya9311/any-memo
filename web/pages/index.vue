<template>
  <v-layout>
    <v-flex xs4>
      <!-- login and input -->
      <div v-if="!!user"><!-- already auth --></div>
      <div v-else>
        <v-btn
          color="info"
          @click="authGoogle">auth Google</v-btn>
      </div>
    </v-flex>
    <v-flex xs8>
      <!-- memo list -->
      <div v-if="!!user && !!userData"/>
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
    ...mapGetters(['user', 'userData'])
  },
  async mounted() {
    await this.$store.dispatch('getUser')
  },
  methods: {
    ...mapActions(['authGoogle'])
  }
}
</script>
