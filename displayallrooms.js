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
   let tr = document.querySelector('#displayroomsinformation');
   var ref = collection(db,'roomsinformation');
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
                   <td><img src='${doc.data().roomimage}' width=100></td>
                   <td>${doc.data().roomname}</td>
                   <td>${doc.data().roomdescription}</td>
                   <td>${doc.data().roomprice}</td>
                   <td>${doc.data().free_breakfast}</td>
                   <td>${doc.data().free_wifi}</td>
                   <td>${doc.data().free_tv}</td>
                   <td>${doc.data().roomstatus}</td>
                   <td>${doc.data().hotelname}</td>
                   <td>${doc.data().star}</td>
                   <td>${doc.data().roomstatus == "Available" ? `<p class='text-success'>Available</p>`:`<p class='text-danger'>Booked</p>`}</td>
                   <td>${doc.data().created_date[0]+ doc.data().created_date[1] +
                    doc.data().created_date[2] + doc.data().created_date[3] + doc.data().created_date[4]
                    + doc.data().created_date[5] + doc.data().created_date[6] + doc.data().created_date[7]
                    + doc.data().created_date[8] + doc.data().created_date[9] + doc.data().created_date[10]
                    + doc.data().created_date[11] + doc.data().created_date[12] + doc.data().created_date[13] +
                    doc.data().created_date[14]
                   }</td>
                   <td><a href='viewroominfo.html?update=${doc.id}' class='btn btn-success'>Update</a>&numsp;<a href='viewroominfo.html?delete=${doc.id}' class='btn btn-danger mt-2'>Delete</a></td>
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