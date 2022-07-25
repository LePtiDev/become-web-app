import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    courses: [
      {
        id: 1,
        name: "Node.js Nest",
        module: "développeur",
        teacher: "Alexandre ZERAH",
        image: "https://courses.nestjs.com/img/nest-courses-og.png",
      },
      {
        id: 2,
        name: "Laravel",
        module: "développeur",
        teacher: "Pierre GRIMAUD",
        image: "https://oursblanc.tech/wp-content/uploads/2020/12/logolaravel-e1607524036663.png",
      },
      {
        id: 3,
        name: "Initiation Vue.js V3",
        module: "développeur",
        teacher: "Alexis BOUGY",
        image: "https://vuejsdevelopers.com/images/posts/vue_3_tutorial.png",
      },
    ],
    coursesInAgenda: [
    ]
  },
  getters: {
    getAllCourses: state => {
      return state.courses
    },
    getCoursesInAgenda: state => {
      return state.coursesInAgenda
    }
  },
  mutations: {
    addCourseInAgenda(state, id) {
      const course = state.courses.find(course => course.id === id)
      state.coursesInAgenda.push(course)
    }
  },
  actions: {
    addCourseInAgenda: ({commit}, id) => {
      commit('addCourseInAgenda', id)
    },
  },
  modules: {
  }
})