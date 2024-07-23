  // Import the functions you need from the SDKs you need
  import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
  import {getFirestore,addDoc,collection,getDocs,doc,deleteDoc,updateDoc, orderBy,query} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
  import {getAuth} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

  import {firebaseConfig} from './firebaseconfig.js';

       // firebase intialization
   const app = initializeApp(firebaseConfig);
   
       // call the  get database method
   const db = getFirestore();

  const auth = getAuth(app);
  

  // check the auth change status then get the email of the user
let useremail = '';
let userid;

    auth.onAuthStateChanged((user)=> {
    if(user){
       // console.log(user.uid);
       useremail = user.email;
       userid = user.uid;

    //    console.log(useremail);
    //    Displayprofiledata(user.email);
    displayuserinsidemessages(userid);
    // console.log('helo');
       
      
    }else{
    console.log('user not found');
    }
   });




   let userchating = document.getElementById("userchating");
   let boxmsg = document.getElementById('boxmsg');
   let personfirstletter = document.getElementById("personfirstletter");
   let personemail = document.getElementById('personemail');
   
   let mymessage = document.getElementById('mymessage');
   let otherusermessgae = document.getElementById('otherusermessgae');
   let message = document.getElementById('message');
   let send = document.getElementById('send');
   let chatbox = document.getElementById("chatbox");
   
   let messagebox = document.getElementById("messagebox");
   boxmsg.addEventListener('click',function(){
       let number = 1;
       messagebox.style.display = 'block';
       
});

   async function displayuserinsidemessages(userid){
        const ref = collection(db,"chat_rooms");
        const docref = await getDocs(ref);
        docref.forEach(doc=>{
         if(doc.data().sendid == '38KzDHX7QEfh3kMwfJBAab1bFdZ2'){
            
              personfirstletter.innerHTML = doc.data().senderemail[0];
              personemail.innerHTML = doc.data().senderemail;
              userchating.innerHTML = doc.data().senderemail;
               
              
            //   doc.data().sendid == userid ?;
            //   doc.data().sendid != userid ?otherusermessgae.innerHTML += `<p style="background-color:blue; padding:10px; margin-top:4px !important; border-radius: 10px; ">${doc.data().message}</p><br>`:mymessage.innerHTML += `<p style="background-color:red; padding:10px; margin-top:4px !important; border-radius: 10px;  !important;">${doc.data().message}</p>`;

              
            
            
        }
        console.log(doc.id);
         if(doc.data().receiverid == userid ){
             //  console.log(doc.data().message);
             mymessage.innerHTML += `<p style="background-color:wheat; padding:10px; margin-top:4px !important; border-radius: 10px;  !important;">${doc.data().message}</p>`;
            }else{
                otherusermessgae.innerHTML += `<p style="background-color:#9f75ff; color:white; padding:10px; margin-top:4px !important; border-radius: 10px; ">${doc.data().message}</p><br>`;
            // 
            // console.log(doc.data().message);
        }
         
        });
        // console.log(docref);
        // console.log(docref);
   }


   async function addmessage(uid,message){
    let timestamp = Date.now();
    const ref = collection(db,"chat_rooms");
    let now = new Date();
  let time = now.getHours() + '' + now.getMinutes();
//   let minutes = ;

    const docref = await addDoc(ref,{
        "receiverid":"38KzDHX7QEfh3kMwfJBAab1bFdZ2",
        "sendid":uid,
        "message":message.value,
        "time":timestamp
    }).then(()=>{
        console.log('message saved');
        window.onload = chatbox;
    }).catch((error)=>{
            console.log('error ocur while storing message'+error);
    });
   }


   send.addEventListener('click',function(e){
    e.preventDefault();
    
  // check the auth change status then get the email of the user
let useremail = '';
let userid;

    auth.onAuthStateChanged((user)=> {
    if(user){
       // console.log(user.uid);
       useremail = user.email;
       userid = user.uid;
    //    console.log(useremail);
    //    Displayprofiledata(user.email);
    // displayuserinsidemessages(useremail,userid);
    // console.log('helo');
    addmessage(userid,message);
    // setTimeout(function(){
    //     window.location.reload(1);
    //  }, 5000);
       
      
    }else{
        user_name1.innerHTML = 'loading...';
        user_name2.innerHTML = 'loading...';
        user_role.innerHTML = 'loading...';
    }
   });

   })