import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyABVV2BneQyXmTvl9lr6w6kzk2Fraex2YE",
    authDomain: "kanji-b875f.firebaseapp.com",
    databaseURL: "https://kanji-b875f.firebaseio.com",
    projectId: "kanji-b875f",
    storageBucket: "kanji-b875f.appspot.com",
    messagingSenderId: "936742228449"
};

firebase.initializeApp(config);
const database = firebase.database();

const api = {
    database: database
};

export default api;
