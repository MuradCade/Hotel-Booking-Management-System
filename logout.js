   // Import the functions you need from the SDKs you need
   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
//    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
   import {getAuth , 
       signOut} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
    import {firebaseConfig} from './firebaseconfig.js';



    
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const logout_btn = document.getElementById('logout');


// logout function
const Logoutclass = async() =>{
        await signOut(auth);
        console.log('logout success');
        window.location.href = 'index.html';
}


logout_btn.addEventListener('click',function(){
   Logoutclass();
   // console.log('helo');
});