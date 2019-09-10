import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyACBUSdxNQ0NTRtL8JKsl2KxUkwWwjQ-l8',
  authDomain: 'digital-journal-fce16.firebaseapp.com',
  databaseURL: 'https://digital-journal-fce16.firebaseio.com',
  projectId: 'digital-journal-fce16',
  storageBucket: '',
  messagingSenderId: '384436470773',
  appId: '1:384436470773:web:226f7d5c6a30c105',
};

// Initialize Firebase

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.user = null;
  }

  isFirebaseInitialized() {
    return new Promise(resolve => {
      return this.auth.onAuthStateChanged(resolve);
    });
  }

  // authenticate user
  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // logout user
  logout() {
    return this.auth.signOut();
  }

  // register new user
  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  // get current authenticated user name
  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  // save new note to firebase
  addNote(note) {
    return this.db
      .collection('digital_notes')
      .doc(this.auth.currentUser.uid)
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  }

  // get current user all notes
  async getCurrentUserNotes() {
    await this.db
      .collection('digital_notes')
      .doc(this.auth.currentUser.uid)
      .collection('notes')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          return doc;
        });
      });
  }

  // update a note
  updateNote(data) {
    return this.db
      .collection('digital_notes')
      .doc(this.auth.currentUser.uid)
      .collection('notes')
      .doc(data.id)
      .update({ title: data.title, body: data.body });
  }

  // delete a note
  deleteNote(docID) {
    return this.db
      .collection('digital_notes')
      .doc(this.auth.currentUser.uid)
      .collection('notes')
      .doc(docID)
      .delete();
  }
}
export default new Firebase();
