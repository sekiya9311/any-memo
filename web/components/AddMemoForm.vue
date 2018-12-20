<template>
  <div>
    <v-container>
      <v-layout
        align-end>
        <v-flex xl1>
          <v-avatar>
            <img :src="user.photoURL">
          </v-avatar>
        </v-flex>
        <v-flex xl5>
          <strong
            class="subheading"
            style="margin-left: 1em;">
            {{ user.displayName }}
          </strong>
        </v-flex>
      </v-layout>
    </v-container>
    <v-form>
      <v-textarea v-model="newMemo" />
      <v-btn
        color="info"
        @click="addMemo">
        add memo
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newMemo: ''
    }
  },
  methods: {
    addMemo() {
      this.$emit('add-memo', this.newMemo)
      this.newMemo = ''
    }
  }
}
</script>
