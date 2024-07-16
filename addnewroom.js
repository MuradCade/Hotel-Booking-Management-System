     // Import the functions you need from the SDKs you need
     import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
     import {getFirestore,addDoc,collection,getDocs} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
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
const storage = getStorage();



let roomimage = document.getElementById('roomimage');
let roomname = document.getElementById('roomname');
let roomdesc = document.getElementById('roomdesc');
let roomprice = document.getElementById('roomprice');
let breakfast = document.getElementById('breakfast');
let wifi = document.getElementById('wifi');
let submit = document.getElementById('submit');
let tv = document.getElementById("tv");
let roomstatus = document.getElementById("roomstatus");
let hotelname = document.getElementById("hotelname");
let rating = document.getElementById("rating");
// let msg = document.getElementById('msg');
let errormsg = document.getElementById('error');
let success = document.getElementById('success');


// current day of date
const date = new Date();



   submit.addEventListener("click",function(e){
    e.preventDefault();

    if(roomimage.value != '' && roomname.value != '' && roomdesc != '' && roomprice != '' && breakfast != '' && wifi != ''
        && tv.value != "" && hotelname.value != "" && rating.value !=""
    ){
        addroomdataintodatabase();
        
    }else{
        errormsg.style.display = 'block';
        errormsg.innerHTML = 'please fill the form below to create new room';
        success.style.display = "none"; 

    }
   });



//    add data into database

async  function addroomdataintodatabase(){
    var ref = collection(db,'roomsinformation');
    
                // call the function that uploads the ikmage to firebase storage
                let value =   uploadimagetofirebasestorage();
                // call the function that gets the returned value(downloaded imageurl from the function uploadimagetofirebasestorage  to this functions)
                let urlofimg =  await getdownloadedurlafteruploadimage(value);
        const docRef = await addDoc(
            ref,{
                roomimage:urlofimg,
                roomname: roomname.value,
                roomdescription: roomdesc.value,
                roomprice: roomprice.value,
                free_breakfast:breakfast.value,
                free_wifi:wifi.value,
                free_tv:tv.value,
                roomstatus: roomstatus.value,
                hotelname:hotelname.value,
                star:rating.value,
                created_date:date.toString()
            }).then(()=>{
                errormsg.style.display = 'none';
                success.style.display = 'block';
                success.innerHTML = 'New Room Added Successfully';
               
            }).catch((error)=>{
                errormsg.style.display = 'block';
                success.style.display = 'none';
                errormsg.innerHTML = error;
            });
}






  // store room image into firebase storage
  async function uploadimagetofirebasestorage(){

 // const ref= app.storage().ref()
 const file  =  roomimage.files[0];
 const name = new Date() + '-' + file.name;
 let downloadedimageurl= [];
 let getdata;
 let result;
 // /create child refrence
 const imageref = ref(storage,`images/${name}`);
 // file metadata
 const metadata = {
     contentType: 'image/jpeg',
   };
   
 // 'file' comes from the Blob or File API
      await uploadBytes(imageref, file,metadata).then((snapshot) => {
     

         // const downloadurl = ref().getDownloadURL();
         console.log('Image Uploaded Successfully');
     getdata =  getDownloadURL(ref(storage, `images/${name}`))
                 .then((url) =>  {
                     // `url` is the download URL for 'images/stars.jpg'
                    
                    

                      return downloadedimageurl[0] = url;
                 })
                 .catch((error) => {
                     // Handle any errors
                      console.log(`error message: ${error}`);
                 });

                 return downloadedimageurl[0]
                 
             });
             
            
             
            result = await getdata;

           return result
  
}




// get the url of stored image
async function getdownloadedurlafteruploadimage(result){
    const a = await result;
    console.log('from below function ',a);
    return a;
}
   