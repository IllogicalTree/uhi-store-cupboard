import Vue from 'vue'
import Vuex from 'vuex'

import db from '@/fb'
Vue.use(Vuex)

export default new Vuex.Store({

  state: {

    computers: [],
    users: [],
    snackbar: true
    
  },

  mutations: {
    
    showSnackbar: (state) => {
      state.snackbar = true
    },

    hideSnackbar: (state) => {
      state.snackbar = false
    },

    changeComputer: (state, { newIndex, oldIndex, doc, type }) => {
      switch (type) {
        case 'added':
          state.computers.splice(newIndex, 0, {
            ...doc.data(), 
            id: doc.id
          })
          break
        case 'removed':
          state.computers.splice(oldIndex, 1)
          break
        case 'modified':
          state.computers.splice(oldIndex, 1)
          state.computers.splice(newIndex, 0, {
            ...doc.data(), 
            id: doc.id
          })
          break
      }
    },

    changeUser: (state, { newIndex, oldIndex, doc, type }) => {
      switch (type) {
        case 'added':
          state.users.splice(newIndex, 0, {
            ...doc.data(), 
            id: doc.id
          })
          break
        case 'modified':
          state.users.splice(oldIndex, 1)
          state.users.splice(newIndex, 0, {
            ...doc.data(), 
            id: doc.id
          })
          break
        case 'removed':
          state.users.splice(oldIndex, 1)
          break
      }
    }
  },

  actions: {

    hideSnackbar ({ commit}) {
      commit('hideSnackbar')
    },

    addComputer ({ commit }, computer) {
      db.collection('computers').add(computer)
    },

    editComputer ({ commit }, computer) {
      db.collection('computers').doc(computer.id).update(computer)
    },

    removeComputer ({ commit }, computer) {
      db.collection('computers').doc(computer.id).delete()
    },

    populate() {
        db.collection('computers').add({
          computerId: 'Comp 123',
          memory: ' 4GB DDR3',
          processor: 'Intel Core i3',
          graphics: 'Integrated',
          username: 'admin',
          password: 'Password',
          userId: '12345678',
          class: 'HNC 1M',
          assignment: false,
          functional: false
        })
    },

    addUser ({ commit }, user) {
      db.collection('users').add(user)
    },
    editUser ({ commit }, user) {
      db.collection('users').doc(user.id).update(user)
    },
    removeUser ({ commit }, user) {
      db.collection('users').doc(user.id).delete()
    },
    
    bindListeners ({ commit }) {
      db.collection('computers').onSnapshot(snapshot => {
        let source = snapshot.metadata.fromCache ? "local cache" : "server";
        snapshot.docChanges().forEach(change => {
          const { newIndex, oldIndex, doc, type } = change
          console.log('Computer '+type+ ' from '+source)
          commit('changeComputer', { newIndex, oldIndex, doc, type })
        })
        commit('showSnackbar')
      })
      
      db.collection('users').onSnapshot(snapshot => {
        let source = snapshot.metadata.fromCache ? "local cache" : "server";
        snapshot.docChanges().forEach(change => {
          const { newIndex, oldIndex, doc, type } = change
          console.log('User '+type+ ' from '+source)
          commit('changeUser', { newIndex, oldIndex, doc, type })
        })
        commit('showSnackbar')
      })

      db.collection('computerUsers').onSnapshot(snapshot => {
        let source = snapshot.metadata.fromCache ? "local cache" : "server";
        snapshot.docChanges().forEach(change => {
          const { newIndex, oldIndex, doc, type } = change
          console.log('ComputerUser '+type+ ' from '+source)
          commit('changeComputerUser', { newIndex, oldIndex, doc, type })
        })
        commit('showSnackbar')
      })
    }
  },
  modules: {
  }
})
