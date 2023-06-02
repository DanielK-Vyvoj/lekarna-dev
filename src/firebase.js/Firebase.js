import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase} from "firebase/database";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
        apiKey: "AIzaSyCVJtbmo3WMhcWRWaTawhhLCQEN4IV-BNo",
        authDomain: "dental-adel.firebaseapp.com",
        projectId: "dental-adel",
        storageBucket: "dental-adel.appspot.com",
        messagingSenderId: "671673253526",
        appId: "1:671673253526:web:597487fc90fa8b88748cb7"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);


export { app, auth, db, storage };