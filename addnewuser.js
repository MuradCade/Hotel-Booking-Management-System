import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {getFirestore,addDoc,collection,getDocs} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import {getAuth , 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

import {firebaseConfig} from './firebaseconfig.js';





 // firebase intialization
 const app = initializeApp(firebaseConfig);
    
 // call the  get database method
const db = getFirestore();



// call firebase auth

const auth = getAuth(app);



let error = document.getElementById("error");
let success = document.getElementById("success");
let fullname = document.getElementById("fullname");
let email = document.getElementById("email");
let address = document.getElementById("address");
let phone = document.getElementById("phone");
let pwd = document.getElementById("pwd");
let role = document.getElementById("role");
let submit = document.getElementById("submit");

const currentDate = new Date().toDateString();


submit.addEventListener('click',function (e) {
    e.preventDefault();
    if(fullname.value =="" && email.value == "" && address.value == "" 
        && phone.value == "" && pwd.value == ""){
            error.style.display = 'block';
            success.style.display = 'none';
            error.innerHTML = 'Please Fill the form below to create new user';
    
    }
    
    else if(role.value == 'admin'){
        createadminnewaccount();
    }else if(role.value == 'customer'){
        createcustomeraccount();


    }
})


const Logoutclass = async() =>{
    await signOut(auth);
    console.log('logout success');
}

// step1: create user with email and password

async function createcustomeraccount(){
    createUserWithEmailAndPassword(auth,email.value,pwd.value).then((usercredential)=>{
        let userinfo = usercredential.user;
        let uid = userinfo.uid;
        let uemail  = userinfo.email;
        storecustomerdata(uid);
    }).catch((e)=>{
        success.style.display = 'none';
        error.style.display = 'block';
        error.innerHTML = 'creating new admin eror oocur ' +e.message; });
}




async function createadminnewaccount(){
    createUserWithEmailAndPassword(auth,email.value,pwd.value).then((usercredential)=>{
        let userinfo = usercredential.user;
        let uid = userinfo.uid;
        let uemail  = userinfo.email;
        storenewadminaccount(uid);
       
 
        // console.log("id is"+userinfo.uid);
    }).catch((e)=>{
        success.style.display = 'none';
        error.style.display = 'block';
        error.innerHTML = 'creating new admin eror oocur ' +e.message;
        // console.log('creating new admin eror oocur ' + e);
    });
}


// step2: store new admin data in admin collection

async function storenewadminaccount (uid){
    const ref = collection(db,"users");
    const docref = await addDoc(ref,{
        "email":email.value,
        "id":uid,
        "fullname":fullname.value,
        "phone":phone.value,
        "address":address.value,
        "created_at":currentDate,
        "role":"admin"
    }).then(()=>{
        // console.log('admin data stored successfully');
        error.style.display = 'none';
        success.style.display = 'block';
        success.innerHTML = 'admin new  account created successfully';
        Logoutclass();    


    }).catch((error)=>{
        success.style.display = 'none';
        error.style.display = 'block';
        success.innerHTML = 'Failed to create new admin account';
        console.log('storinga admin data failed' +error);
        Logoutclass();    
    });
}

// step3: store new customer data in admin collection

async function storecustomerdata (uid){
    const ref = collection(db,"users");
    const docref = await addDoc(ref,{
        "id":uid,
        "fullname":fullname.value,
        "address":address.value,
        "email":email.value,
        "phone":phone.value,
        "created_at":currentDate,
        "role":"customer"
    }).then(()=>{
        error.style.display = 'none';
        success.style.display = 'block';
        success.innerHTML = 'customer new  account created successfully';
        Logoutclass();    
    }).catch((error)=>{
        success.style.display = 'none';
        error.style.display = 'block';
        success.innerHTML = 'Failed to create new customer account';
        console.log('storinga customer data failed' +error);
        Logoutclass();    
    });
}



