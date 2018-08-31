var config = {
    apiKey: "AIzaSyDgl3nyuro0aofZFSd1wuBxqwDtueCdAo4",
    authDomain: "moviequeuelist.firebaseapp.com",
    databaseURL: "https://moviequeuelist.firebaseio.com",
    projectId: "moviequeuelist",
    storageBucket: "moviequeuelist.appspot.com",
    messagingSenderId: "642705972248"
};
firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);
