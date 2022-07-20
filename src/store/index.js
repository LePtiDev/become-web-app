import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    courses: [
      {
        id: 1
        title: "Node.js Nest",
        teacher: "Alexandre ZERAH",
        image: "https://courses.nestjs.com/img/nest-courses-og.png",
      },
      {
        id: 2
        title: "Laravel",
        teacher: "Pierre GRIMAUD",
        image: "https://oursblanc.tech/wp-content/uploads/2020/12/logolaravel-e1607524036663.png",
      },
      {
        id: 3
        title: "Initiation Vue.js V3",
        teacher: "Alexis BOUGY",
        image: "https://vuejsdevelopers.com/images/posts/vue_3_tutorial.png",
      },
    ],
  },
  getters: {
    getAllCourses: state => {
      return state.courses
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
