import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAuIVkRV631ciIoSj3N6_P6LnCvrE29Xh8',
  authDomain: 'meeting-summaries-fb8cd.firebaseapp.com',
  projectId: 'meeting-summaries-fb8cd',
  storageBucket: 'meeting-summaries-fb8cd.appspot.com',
  messagingSenderId: '32597340476',
  appId: '1:32597340476:web:8c7bf600675e008ccbee39',
}

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db = getFirestore(app)

export default db
