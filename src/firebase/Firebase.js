import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase} from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBceS3KJeumbzW4VIy-GzaxtVT-jPN4Pkk",
  authDomain: "dev-lekarny.firebaseapp.com",
  projectId: "dev-lekarny",
  storageBucket: "dev-lekarny.appspot.com",
  messagingSenderId: "798781875157",
  appId: "1:798781875157:web:677b988d4eaec38887135c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);


export { app, auth, db, storage };