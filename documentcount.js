     // Import the functions you need from the SDKs you need
     import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
     import {getFirestore,addDoc,collection,getDocs,getCountFromServer} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
  
      import {getStorage,ref,uploadBytes,getDownloadURL} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";
  
     import {firebaseConfig} from './firebaseconfig.js';


   // firebase intialization
   const app = initializeApp(firebaseConfig);
    
   // call the  get database method
const db = getFirestore();



 // call firebase auth
 
// const auth = getAuth(app);
const storage = getStorage();


let availableroomstotal = document.getElementById("availableroomstotal");
let bookedroomstotalnumber = document.getElementById("bookedroomstotalnumber");
let userstotalnumber = document.getElementById("userstotalnumber");


availableroomstotal.innerHTML = 'Loading...';
bookedroomstotalnumber.innerHTML = 'Loading...';
userstotalnumber.innerHTML = 'Loading...';
async function gettotalbookedroomsnumber(){

    const ref = collection(db,"bookedrooms");
    const snapshot = await getCountFromServer(ref);
    bookedroomstotalnumber.innerHTML = snapshot.data().count
 
}


async function gettotalavailableroomsnumber(){

    const ref = collection(db,"roomsinformation");
    const snapshot = await getCountFromServer(ref);
    availableroomstotal.innerHTML = snapshot.data().count
 
}
async function gettotalusersnumber(){

    const ref = collection(db,"users");
    const snapshot = await getCountFromServer(ref);
    userstotalnumber.innerHTML = snapshot.data().count
 
}
gettotalbookedroomsnumber();
gettotalavailableroomsnumber();
gettotalusersnumber();