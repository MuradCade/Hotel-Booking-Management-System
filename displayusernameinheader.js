   // Import the functions you need from the SDKs you need
   import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
   import {getFirestore,getDocs,doc,updateDoc,collection, query, where} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
   import {getAuth , 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
    import {getStorage,ref,uploadBytes,getDownloadURL} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";

   import {firebaseConfig} from './firebaseconfig.js';


           // firebase intialization
           const app = initializeApp(firebaseConfig);
    
           // call the  get database method
       const db = getFirestore();
       // call firebase auth
       
      const auth = getAuth(app);

let user_name1 = document.getElementById('user_name1');
let user_name2 = document.getElementById('user_name2');
let user_role = document.getElementById('user_role');

// check the auth change status then get the email of the user
let useremail = '';
let userid;

    auth.onAuthStateChanged((user)=> {
    if(user){
       // console.log(user.uid);
       useremail = user.email;
       userid = user.uid;
    //    console.log(useremail);
       Displayprofiledata(user.email);
       
       
      
    }else{
        user_name1.innerHTML = 'loading...';
        user_name2.innerHTML = 'loading...';
        user_role.innerHTML = 'loading...';
    }
   });

   user_name1.innerHTML = 'loading...';
   user_name2.innerHTML = 'loading...';
   user_role.innerHTML = 'loading...';
  


   async function Displayprofiledata(email){
   
  

       



    const docRef = query(collection(db, "users"), where("email", "==",email));
    const result = await getDocs(docRef);
//    console.log(result);
    // console.log(result.data().id);
    result.forEach(docs => {
        // console.log(docs.data().role);

        // compare the id for company collection to current company account
            // console.log(full);
            // profile.src =`${docs.data().img}`;
            user_name1.innerHTML = `${docs.data().fullname}`
            user_name2.innerHTML = `${docs.data().fullname}`
            // role of the company will be hand coded no need for the db
            user_role.innerHTML= `${docs.data().role}`;
            // console.log(docs.data().fullname);
           
            
        
    });

    return query;
// check if collection that we are fetching if its empty excute the else statement
   // if its not empty  log this message
}