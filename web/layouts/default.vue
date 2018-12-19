<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title>
        Any Memo
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
        @click="clickGithubIcon()">
        <v-icon large>
          fa-github
        </v-icon>
      </v-btn>
    </v-toolbar>
    <v-container>
      <nuxt/>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    clickGithubIcon() {
      window.open('https://github.com/sekiya9311/any-memo')
    }
  }
}
</script>
