import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyA5cXdwOdRRFykYxLdy0bXT1yHv2MOC4WQ',
  authDomain: 'global-application-example.firebaseapp.com',
  databaseURL: 'https://global-application-example.firebaseio.com',
  projectId: 'global-application-example',
  storageBucket: 'global-application-example.appspot.com',
  messagingSenderId: '218726745227',
  appId: '1:218726745227:web:47862614d48d42f3d0408e',
  measurementId: 'G-625FNWXFBN',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
