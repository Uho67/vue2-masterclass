export default {
  data () {
    return {
      asyncData_IsLoading: false
    }
  },
  computed: {
    isAsyncDataLoading () {
      return this.asyncData_IsLoading
    }
  },
  methods: {
    dataLoaded () {
      this.$emit('stopLoading')
      this.asyncData_IsLoading = false
    },
    startDataLoading () {
      this.$emit('startLoading')
      this.asyncData_IsLoading = true
    }
  }
}
