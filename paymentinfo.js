  // Import the functions you need from the SDKs you need
  import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
  import {getFirestore,addDoc,collection,getDocs,doc,deleteDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
  import {getAuth} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

  import {firebaseConfig} from './firebaseconfig.js';

       // firebase intialization
   const app = initializeApp(firebaseConfig);
   
       // call the  get database method
   const db = getFirestore();

  const auth = getAuth(app);



  // view all service category
  async function displayallroomsdata(){
   let tr = document.querySelector('#displaypaymentinformation');
   var ref = collection(db,'bookedrooms');
   tr.innerHTML = 'Loading Please Wait';

   try {
       const docSnap = await getDocs(ref);
       if(docSnap.empty){
           tr.innerHTML = 'There is no data to be fetched , please add new room to be displayed here.';
       }
       else{
           tr.innerHTML = '';
           let number =1;
           docSnap.forEach(doc => {
            //    if(doc.data().deleted_status == "false"){
              

                   tr.innerHTML += `
                   <tr>
                   <td>${number}</td>
                   <td>${doc.data().fullname}</td>
                   <td>${doc.data().phonenumber}</td>
                   <td>${doc.data().email}</td>
                   <td>${doc.data().roomname}</td>
                   <td>${doc.data().paymentmethod}</td>
                   <td>$${doc.data().totalprice}</td>
                   </tr>                    
               `;
               
               
               number ++;
           });
       }
   } catch (error) {
       console.log(error);
   }

   
}




window.onload = displayallroomsdata();

