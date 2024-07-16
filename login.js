
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import {getAuth , 
    // createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
    import {getFirestore,where,collection,getDocs,query} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

import {firebaseConfig} from './firebaseconfig.js';


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// call the  get database method
const db = getFirestore();

// let loginform = document.getElementById('loginform');
let email = document.getElementById('email');
let pwd = document.getElementById('password');
let loginbtn = document.getElementById('loginbtn');
let msg = document.getElementById('msg');

// login function
const login = async()=>{
    signInWithEmailAndPassword(auth,email.value , pwd.value).then((usercredential)=>{
        // getting the current user that login
        const user = usercredential.user;
        checkuserrole(user.email);
        // console.log(user.email);
    }).catch((error) =>{
        //    const errorcode = error.code;
           const errormessage = error.message;
           console.log(errormessage);
           msg.style.display = 'block';
           msg.innerHTML = errormessage;
          
        
         
        

       });
}


// check logined user role

async function checkuserrole(useremail){

    const docRef = query(collection(db, "users") , where("email", "==", useremail));
    const docSnap = await getDocs(docRef);
    docSnap.forEach((doc) => {
       // doc.data() is never undefined for query doc snapshots
       // console.log(doc.id, " => ", doc.data().role);

       if(doc.data().role == 'admin'){
        //   console.log('welcome admin');
          window.location = 'dashboard.html';

       }else{
        msg.style.display = 'block';
        msg.innerHTML = 'sorry only admins are allowed';
       }


    })
}




function checkifuseralreadylogedin(user) {
    if (typeof user === "undefined") {
        // SDK has loaded but we don't know the user's real status yet
        return;
    } else if (user === null) {
        // User is definitely unauthenticated
        // window.location = 'login.html';
        console.log('there is no user loged in');
    } else {
        // User is authenticated
        window.location = 'dashboard.html';
        console.log('user is loged in');

    }
}
// onauth change
window.onload = auth.onAuthStateChanged(checkifuseralreadylogedin);


loginbtn.addEventListener('click',function(e) {
    e.preventDefault();
    
 if(email.value != "" && pwd.value != ""){
    login();
 }else{
    alert('empty fields, please enter email and password to login');
 }

    
})