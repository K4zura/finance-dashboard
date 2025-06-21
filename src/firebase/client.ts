import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyBUX4jYBWxC9Zd4rdQXD_lWQNylm0kzEuM',
  authDomain: 'finance-dashboard-k4.firebaseapp.com',
  projectId: 'finance-dashboard-k4',
  storageBucket: 'finance-dashboard-k4.firebasestorage.app',
  messagingSenderId: '319019083038',
  appId: '1:319019083038:web:cf03389150bfb55166150f',
}

export const app = initializeApp(firebaseConfig)
