<template>
 <span> {{date | diffForHumans}} </span>
</template>
<script>
import moment from 'moment'
export default {
  name: 'AppDate',
  props: {
    date: {
      required: true
    }
  },
  filters: {
    humanFriendly (date) {
      return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')
    },
    diffForHumans (date) {
      return moment.unix(date).fromNow()
    }
  }
}
</script>
<style scoped>

</style>
