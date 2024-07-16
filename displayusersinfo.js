  // Import the functions you need from the SDKs you need
  import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
  import {getFirestore,addDoc,collection,getDocs,doc,deleteDoc, updateDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
  import {getAuth} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

  import {firebaseConfig} from './firebaseconfig.js';

       // firebase intialization
   const app = initializeApp(firebaseConfig);
   
       // call the  get database method
   const db = getFirestore();

  const auth = getAuth(app);



  const url = window.location.search;
  let updateurl = url.slice(1,7);
  let updateid =  url.slice(8,180);
  
  let tableofuser = document.getElementById('tableofuser');
  let updateform = document.getElementById('update');
 
  let deleteurl = url.slice(1,7);
  let deleteid =  url.slice(8,180);


  if(updateurl == 'update'){
    tableofuser.style.display = 'none';
    updateform.style.display = 'block';

   let  fullname = document.getElementById("fullname");
   let  email = document.getElementById("email");
   let  address = document.getElementById("address");
   let  phone = document.getElementById("phone");
   let  role = document.getElementById("role");
   let  msg = document.getElementById("msg");
   let  submit = document.getElementById("submit");

   msg.innerHTML = 'loading...';

   displaysingleuser();


   submit.addEventListener('click',function(e){
    e.preventDefault();
    updatesingleuserinfo(updateid);

   })




   
  }else if(deleteurl == 'delete'){
    dletesingleuserinformation(deleteid);
  }



// delet single user
async function dletesingleuserinformation(documentid){

      
    const docRef  = doc(db,'users',documentid);
    deleteDoc(docRef).then(() =>{
            alert('user deleted successfully');
            window.location.href = 'viewusers.html';
        }).catch((e)=>{
        alert('failed to delete user ',e);
        window.location.href = 'viewusers.html';

    });
    
  }

//   delete_single_room(singleroomidd);

//   display single selected user before updating

async function displaysingleuser(){
    const ref = collection(db,"users");
    const docref = await getDocs(ref);
        msg.innerHTML = '';
    docref.forEach((doc)=>{
       if(doc.id == updateid){
        fullname.value = doc.data().fullname,
        email.value = doc.data().email,
        address.value = doc.data().address,
        phone.value = doc.data().phone,
        role.innerHTML = doc.data().role == 'customer'? `<option value='${doc.data().role}'>${doc.data().role}</option><option value='admin'>admin</option>`:doc.data().role == 'admin'?`<option value='${doc.data().role}'>${doc.data().role}</option><option value='admin'>customer</option>`:'';
       }
    });
}


// update single user information
async function updatesingleuserinfo(documentid){
    const currentDate = new Date().toDateString();

    const ref = doc(db,"users",documentid);
     await updateDoc(ref,{
        "fullname":fullname.value,
        "email":email.value,
        "address":address.value,
        "phone":phone.value,
        "role":role.value,
        "created_at":currentDate
     }).then(()=>{
        alert('user information updated successfully');
        window.location.href = 'viewusers.html';
     }).catch((error)=>{
        alert('failed to update user data');
        console.log(error);
        window.location.href = 'viewusers.html';
     });
}

  // view all service category
  async function displayallusers(){
   let tr = document.querySelector('#displayusersinfo');
   var ref = collection(db,'users');
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
                   <td>${doc.data().email}</td>
                   <td>${doc.data().phone}</td>
                   <td>${doc.data().role}</td>
                   <td>${doc.data().created_at}</td>
                   <td><a href='viewusers.html?update=${doc.id}' class="btn btn-primary">Update</a>&numsp; <a href='viewusers.html?delete=${doc.id}' class="btn btn-danger">Delete</a></td>
                   </tr>                    
               `;
               
               
               number ++;
           });
       }
   } catch (error) {
       console.log(error);
   }

   
}




window.onload = displayallusers();




