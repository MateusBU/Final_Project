import { createStore } from 'vuex'  // Import the createStore function from Vuex

// Create a new Vuex store instance
const store = createStore({
  // State holds the reactive data shared across components
  state: {
    isMenuVisible: true,  // Boolean flag to control menu visibility
    user:{
      name: 'Mock User',
      email: 'mock@gmail.com'
    }
  },
  
  // Mutations are functions responsible for synchronously changing the state
  mutations: {
    // toggleMenu mutation: toggles or sets menu visibility
    // - If no argument is passed, it toggles the current state
    // - If a boolean argument is passed, it explicitly sets the visibility
    toggleMenu(state, isVisible) {
      if (isVisible === undefined) {
        state.isMenuVisible = !state.isMenuVisible; // toggle
      } else {
        state.isMenuVisible = isVisible; // set explicitly
      }
    }
  }
})

export default store  // Export the store instance for use in the Vue app
