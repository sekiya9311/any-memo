<template>
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-title>
        {{ memo.context }}
      </v-list-tile-title>
      <v-list-tile-sub-title>
        {{ memo.createdTime.toLocaleString() }}
      </v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-btn
        icon
        ripple
        @click="deleteMemo">
        <v-icon>
          delete
        </v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
export default {
  props: {
    idx: {
      type: Number,
      required: true
    },
    memo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    deleteMemo() {
      this.$emit('delete-memo', this.idx)
    }
  }
}
</script>
