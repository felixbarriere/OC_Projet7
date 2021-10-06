<template>
  <Login v-if="!connected"/>
  
  <Header v-if="connected"/>
  <NewMedia v-if="connected"/>
</template>

<script>
import Login from '../components/login.vue'

import Header from '../components/header.vue'
import NewMedia from '../components/new_media.vue'

export default {
  name: 'Post',
  components: {
    Login,
    Header,
    NewMedia,
  },
  data () {
    return {
      connected: true
    };
  },
  created() {
    this.checkIfConnected();
  },
  methods: {
    checkIfConnected () {
      if (localStorage.user !== undefined){
        this.connected = true;
      }
      else if(localStorage.user == undefined) {
        this.connected = false;
      }
    }
  }
}
</script>