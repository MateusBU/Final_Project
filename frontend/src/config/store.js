import { createStore } from 'vuex'  // Import the createStore function from Vuex
import axios from 'axios';

// Create a new Vuex store instance
const store = createStore({
  // State holds the reactive data shared across components
  state: {
    isMenuVisible: false,  // Boolean flag to control menu visibility
    user: null,
  },
  
  // Mutations are functions responsible for synchronously changing the state
  mutations: {
    // toggleMenu mutation: toggles or sets menu visibility
    // - If no argument is passed, it toggles the current state
    // - If a boolean argument is passed, it explicitly sets the visibility
    toggleMenu(state, isVisible) {
        if(!state.user){
            state.isMenuVisible = false;
            return;
        }
        if(isVisible === undefined){
            state.isMenuVisible = !state.isMenuVisible; // toggle
        }
        else{
            state.isMenuVisible = isVisible; // set explicitly
        }
    },
    setUser(state, user){
      state.user = user
      if(user){
          axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`;
          state.isMenuVisible = true;
      }
      else{
          delete axios.defaults.headers.common['Authorization'];
          state.isMenuVisible = false;
      }
    }
  }
})

export default store  // Export the store instance for use in the Vue app
