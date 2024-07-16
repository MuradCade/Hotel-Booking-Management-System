 // Import the functions you need from the SDKs you need
 import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
 import {getFirestore,collection,getDocs,query,where,doc, updateDoc,deleteDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

 import {firebaseConfig} from './firebaseconfig.js';
      // firebase intialization
  const app = initializeApp(firebaseConfig);
  
      // call the  get database method
  const db = getFirestore(app);


const url = window.location.search;
let urlpath = url.slice(1,7);
let singleroomidd =  url.slice(8,30);


if(urlpath == 'delete'){
    async function delete_single_room(uid){

      
        const docRef  = doc(db,'roomsinformation',uid);
        deleteDoc(docRef).then(() =>{
                alert('room information deleted successfully');
                window.location.href = 'viewroominfo.html'
            }).catch((e)=>{
            alert('failed to delete company data',e);
        });
        
      }

      delete_single_room(singleroomidd);
}