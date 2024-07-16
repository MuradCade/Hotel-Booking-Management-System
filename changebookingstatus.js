import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {getFirestore,collection,getDocs,doc,updateDoc,deleteDoc,getDoc,addDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
  import {getAuth} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

  import {firebaseConfig} from './firebaseconfig.js';

       // firebase intialization
   const app = initializeApp(firebaseConfig);
   
       // call the  get database method
   const db = getFirestore();

  const auth = getAuth(app);


  

  const url = window.location.search;
  let urlpath = url.slice(1,7);
  let documentidone =  url.slice(8,30);
  let documentidtwo =  url.slice(10,30);

  let canceledurl = url.slice(1,9);
// console.log(documentidone);
  if(urlpath == 'update'){
    // console.log(updateid);
    approvebooking(documentidone);

  }else if(canceledurl == 'canceled'){
    cancelbooking(documentidtwo);
  }



  async function approvebooking(documentid){
    const ref = doc(db,"bookedrooms",documentid.toString());
    await updateDoc(ref,{
        "bookingstatus":"Approved"
    }).then(()=>{
       
        alert('Booking is Approved');
        window.location.href = 'bookedroomsinfo.html';
    }).catch((error)=>{
        alert('failed to Approve Booking'+error);

        window.location.href = 'bookedroomsinfo.html';

    });
    
  }


  async function cancelbooking(documentid){
    const ref = doc(db,"bookedrooms",documentid.toString());
    await updateDoc(ref,{
        "bookingstatus":"Canceled"
    }).then(()=>{
       
        alert('Booking is Canceled');
        window.location.href = 'bookedroomsinfo.html';
    }).catch((error)=>{
        alert('failed to Cancel Booking'+error);

        window.location.href = 'bookedroomsinfo.html';

    });
    
  }