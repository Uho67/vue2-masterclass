import sourceData from '@/data.json'

export default {
  state: {
    categories: Object.values({...sourceData.categories})
  },
  // computed '.getters'
  getters: {
    getCategories (state, getters) {
      return state.categories
    },
    getCategoryById (state, getters) {
      return function (categoryId) {
        return state.categories.find(category => category['.key'] === categoryId)
      }
    }
  }
}
