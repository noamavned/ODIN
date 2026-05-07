/**
 * main.js
 * 
 * This is the entry point of the application. It initializes the Vue 
 * instance, loads the root component, and mounts it to the DOM.
 */

import { createApp } from 'vue'
import App from './App.vue'

// Create the root application instance using the App component
const app = createApp(App)

// Mount the application to the HTML element with the ID 'app'
// (Usually defined in your index.html file)
app.mount('#app')