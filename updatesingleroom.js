// Import the functions you need from the SDKs you need
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {getFirestore,collection,getDocs,doc,updateDoc,deleteDoc,getDoc,addDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import {getStorage,ref,uploadBytes,getDownloadURL} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";
import {firebaseConfig} from './firebaseconfig.js';


     // firebase intialization
 const app = initializeApp(firebaseConfig);
 
     // call the  get database method
 const db = getFirestore();

 const storage = getStorage();

 const url = window.location.search;
 let urlpath = url.slice(1,7);
 let singleroomidd =  url.slice(8,30);


roomname = document.getElementById("roomname");
roomdesc = document.getElementById("roomdesc");
roomprice = document.getElementById("roomprice");
roomimage = document.getElementById("roomimage");
breakfast = document.getElementById("breakfast");
let tv = document.getElementById("tv");
let roomstatus = document.getElementById("roomstatus");
let hotelname = document.getElementById("hotelname");
let rating = document.getElementById("rating");
wifi = document.getElementById("wifi");
submit = document.getElementById("submit");

// console.log(roomimage.value == "" ? 'empty':'not empty');


// console.log(singleroomidd);


// current day of date
const date = new Date();



    
    async function updatedatawithoutimage(uid){
    
   

    const ref = doc(db, "roomsinformation", uid.toString());
    await updateDoc(
        ref,{
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
        }
    ).then(()=>{
       
        alert('Data Updated Successfully');
        window.location.href = 'viewroominfo.html'
    }).catch((error)=>{
        alert('error occur while updating'+error);

        window.location.href = 'viewroominfo.html'

    });

   
    }

    async function updatedatawithimage(uid){
    
   
        let value =   uploadimagetofirebasestorage();
        // call the function that gets the returned value(downloaded imageurl from the function uploadimagetofirebasestorage  to this functions)
        let urlofimg =  await getdownloadedurlafteruploadimage(value);
        const ref = doc(db, "roomsinformation", uid.toString());
        await updateDoc(
            ref,{
                roomimage:urlofimg,
                roomname: roomname.value,
                roomdescription: roomdesc.value,
                roomprice: roomprice.value,
                free_breakfast:breakfast.value,
                free_wifi:wifi.value,
                created_date:date.toString()
            }
        ).then(()=>{
           
            alert('Data Updated Successfully');
            window.location.href = 'viewroominfo.html'
        }).catch((error)=>{
            alert('error occur while updating'+error);
    
            window.location.href = 'viewroominfo.html'
    
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
   
   


   submit.addEventListener('click',function(e) {
    e.preventDefault();

   if(roomimage.value == ""){
    // console.log('empty');
    updatedatawithoutimage(singleroomidd);
   }else{
    updatedatawithimage(singleroomidd);
    // console.log("not empty");
   }
})

   
