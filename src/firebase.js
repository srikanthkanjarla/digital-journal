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

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  addNote(note) {
    if (!this.auth.currentUser) {
      return null;
    }
    this.db
      .collection('digital_notes')
      .doc(this.auth.currentUser.uid)
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(docRef => {
        console.log('Document written with ID', docRef.id);
      })
      .catch(error => {
        console.log('Error adding document', error);
      });
  }

  // get current user all notes
  async getCurrentUserNotes() {
    if (!this.auth.currentUser) {
      return null;
    }
    await this.db
      .collection('digital_notes')
      .doc(this.auth.currentUser.uid)
      .collection('notes')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          //   // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data());
          return doc;
        });
      });
  }

  // update a note
  updateNote(note) {
    // TODO - doc id, note text
    if (!this.auth.currentUser) {
      return null;
    }
    this.db
      .collection('digital_notes')
      .doc(this.auth.currentUser.uid)
      .collection('notes')
      .doc(note.id)
      .update({ title: note.title, body: note.body })
      .then(() => {
        console.log('Document successfully updated');
      })
      .catch(error => {
        console.log('Error updaing document', error);
      });
  }

  // delete a note
  deleteNote(docID) {
    // TODO - doc id
    if (!this.auth.currentUser) {
      return null;
    }
    this.db
      .collection('digital_notes')
      .doc(this.auth.currentUser.uid)
      .collection('notes')
      .doc(docID)
      .delete()
      .then(() => {
        console.log('Document successfully deleted');
      })
      .catch(error => {
        console.log('Error removing document', error);
      });
  }
}
export default new Firebase();
