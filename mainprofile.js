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


  let  fullname = document.getElementById("fullname");
  let  email = document.getElementById("email");
  let  address = document.getElementById("address");
  let  phone = document.getElementById("phone");
  let  role = document.getElementById("role");
  let  msg = document.getElementById("msg");
  let  submit = document.getElementById("submit");

    msg.innerHTML = 'Loading ... ';
    auth.onAuthStateChanged((user)=>{
        msg.innerHTML = '';
        if(user){
         let useruid = user.uid;
         // console.log(user.uid);
         // getdocumentidofcurrentadmin(useruid);
         displayadmininformation(useruid)
        }else{
         console.log('no user is found');
        }
       });

    submit.addEventListener('click',function(e){
    e.preventDefault();
        if(fullname.value != "" && email.value != ""
            && address.value != "" && phone.value != ""){
                auth.onAuthStateChanged((user)=>{
                    if(user){
                     let useruid = user.uid;
                     // console.log(user.uid);
                     updateadmininformation(useruid);
                    }else{
                     console.log('no user is found');
                    }
                    msg.innerHTML = `<p class='bg-success text-white p-2'>Admin Data Updated Successfully</p>`;

                   });
            }else{
                msg.innerHTML = `<p class='bg-danger text-white p-2'>Fill The Form To Update Admin Data</p>`;
            }
    
    });
//  
// console.log(useruid);

async function updateadmininformation(documentid){
    const ref = collection(db,'users');
    const docref = await getDocs(ref);
    docref.forEach(doc=>{
        if(doc.data().id == documentid){
            updatesingleuserinfo(doc.id);
        }
    });
}

async function displayadmininformation(documentid){
    const ref = collection(db,'users');
    const docref = await getDocs(ref);
    docref.forEach(doc=>{
        if(doc.data().id == documentid){
       
            fullname.value = doc.data().fullname,
            email.value = doc.data().email,
            address.value = doc.data().address,
            phone.value = doc.data().phone,
            role.innerHTML = doc.data().role == 'customer'? `<option value='${doc.data().role}'>${doc.data().role}</option><option value='admin'>admin</option>`:doc.data().role == 'admin'?`<option value='${doc.data().role}'>${doc.data().role}</option><option value='admin'>customer</option>`:'';
        }else{
            console.log('failed to fetch');
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
        msg.innerHTML = `<p class='bg-success text-white p-2'>Admin Data Updated Successfully</p>`;
        // alert('user information updated successfully');
        // window.location.href = 'viewusers.html';
     }).catch((error)=>{
        msg.innerHTML = `<p class='bg-danger text-white p-2'>Failed to update Admin Data</p>`;
        console.log(error);
        window.location.href = 'viewusers.html';
     });
}
