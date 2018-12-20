<template>
  <v-dialog
    v-model="loading"
    width="500">
    <v-card>
      <v-card-title primary-title>
        {{ loadingText }}
      </v-card-title>
      <v-divider />
      <v-card-actions>
        <v-progress-linear :indeterminate="true"/>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    loadingText: {
      type: String,
      required: true
    }
  }
}
</script>
