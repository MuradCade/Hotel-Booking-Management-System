  // Import the functions you need from the SDKs you need
  import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
  import {getFirestore,addDoc,collection,getDocs,doc,deleteDoc,updateDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
  import {getAuth} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

  import {firebaseConfig} from './firebaseconfig.js';

       // firebase intialization
   const app = initializeApp(firebaseConfig);
   
       // call the  get database method
   const db = getFirestore();

  const auth = getAuth(app);


  let image_holder = document.getElementById("image-holder");
  let image_box = document.getElementById("image-box");


  const url = window.location.search;
  let urlpath = url.slice(1,4);
  let imgdisplay =  url.slice(5,180);
//   const url = window.location.search;
let canceledurl = url.slice(1,9);
let documentidtwo =  url.slice(10,30);

  


if(urlpath == 'img'){
    image_box.style.display = 'block';
    // exampleModal.appendChild('show');

    image_holder.innerHTML += `<img src="${imgdisplay}" width=200/>`;
}else{
    image_box.style.display = 'none';
}



  // view all service category
  async function displayallroomsdata(){
   let tr = document.querySelector('#displaybookedroomsinformation');
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
                   <td>${doc.data().roomname}</td>
                   <td>${doc.data().fullname}</td>
                   <td>${doc.data().email}</td>
                   <td>${doc.data().address}</td>
                   <td><a href="bookedroomsinfo.html?img=${doc.data().passportimg}"><img src="${doc.data().passportimg}" width=100/></a></td>
                   <td>${doc.data().phonenumber}</td>
                   <td>${doc.data().paymentmethod}</td>
                   <td>$${doc.data().totalprice}</td>
                   <td>${doc.data().bookingstatus == 'pending' ? `<p class='text-danger'>Pending</p>`:doc.data().bookingstatus == 'Approved'?`<p class='text-success'>Aproved</p>`:`<p class='text-danger'>Canceled</p>`}</td>
                   <td>${doc.data().bookingstatus == 'pending' ? `<a href='bookedroomsinfo.html?update=${doc.id}' class='btn btn-primary'>Approve</a>&numsp;<a href='bookedroomsinfo.html?canceled=${doc.id}' class='btn btn-danger'>Cancel</a>`:doc.data().bookingstatus == 'Approved'?`<p class='text-success'>Booking Approved</p>`:`<p class='text-danger'>Booking Canceled</p>`}</td>
                   </tr>                    
               `;
               
               number ++;
               if(canceledurl == 'canceled'){
                if(doc.id == documentidtwo){
                    // console.log(doc.data().roomid);
                    updatebookingststusonroomsinformation(doc.data().roomid);

                }
               }
           });
       }
   } catch (error) {
       console.log(error);
   }

   
}




async function updatebookingststusonroomsinformation(documentid){
    const ref = doc(db,"roomsinformation",documentid.toString());
    await updateDoc(ref,{
        "roomstatus":"Available"
    }).then(()=>{
       
      console.log('room status change');
      // window.location.href = 'bookedroomsinfo.html';
    }).catch((error)=>{
        // alert('failed to Approve Booking'+error);

        console.log('room status failed to change: '+error);


    });
    
  }


window.onload = displayallroomsdata();

