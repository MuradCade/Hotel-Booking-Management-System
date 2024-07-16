
   // Import the functions you need from the SDKs you need
   import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
   import {getFirestore,addDoc,collection,getDocs} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
   import {getAuth} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

   import {firebaseConfig} from './firebaseconfig.js';
        // firebase intialization
    const app = initializeApp(firebaseConfig);
    
        // call the  get database method
    const db = getFirestore();
const url = window.location.search;
let urlpath = url.slice(1,7);
let singleroomidd =  url.slice(8,30);
let updatesingleroominformation = document.getElementById("updatesingleroominformation");
let viewallroomstable = document.getElementById("viewallroomstable");
// console.log(urlpath);
if(urlpath == 'update'){
    viewallroomstable.style.display = "none";
    updatesingleroominformation.style.display = "block";

    roomname = document.getElementById("roomname");
    roomdesc = document.getElementById("roomdesc");
    roomprice = document.getElementById("roomprice");
    breakfast = document.getElementById("breakfast");
    let tv = document.getElementById("tv");
    let roomstatus = document.getElementById("roomstatus");
    let hotelname = document.getElementById("hotelname");
    let rating = document.getElementById("rating");
    
    wifi = document.getElementById("wifi");
    loadmsg = document.getElementById("loadmsg");

    loadmsg.innerHTML = 'Loading...';
    async function displaysingleroomdata(){
        var ref = collection(db,"roomsinformation");
        const displayselectedcompany = await getDocs(ref);
        displayselectedcompany.forEach(doc => {
            // check if doc.id  from firestore collection equals the uid or(company id)
            if(doc.id == singleroomidd){
                roomname.value = ` ${doc.data().roomname}`;
                roomdesc.value = `${doc.data().roomdescription}`;
                roomprice.value = `${doc.data().roomprice}`;
                breakfast.innerHTML  += `<option value='${doc.data().free_breakfast}'>${doc.data().free_breakfast}</option>` +
                 `<option value='${doc.data().free_breakfast=='yes' ? 'no' : 'yes'}'>${doc.data().free_breakfast=="yes" ? "no" : "yes"}</option>`;
                 wifi.innerHTML  += `<option value='${doc.data().free_wifi}'>${doc.data().free_wifi}</option>` +
                 `<option value='${doc.data().free_wifi=='yes' ? 'no' : 'yes'}'>${doc.data().free_wifi=="yes" ? "no" : "yes"}</option>`;
                 tv.innerHTML  += `<option value='${doc.data().free_tv}'>${doc.data().free_tv}</option>` +
                 `<option value='${doc.data().free_tv=='yes' ? 'no' : 'yes'}'>${doc.data().free_tv=="yes" ? "no" : "yes"}</option>`;
                 roomstatus.innerHTML  += `<option value='${doc.data().roomstatus}'>${doc.data().roomstatus}</option>` +  `<option value='${doc.data().roomstatus=='Available' ? 'Booked' : 'Available'}'>${doc.data().roomstatus=="Available" ? "Booked" : "Available"}</option>`;
                 hotelname.value = `${doc.data().hotelname}`;
                 rating.value = `${doc.data().star}`;

                ;
              
            }
    
            loadmsg.innerHTML = '';
    
    
    
        });
    
    }
    
       window.Location.load = displaysingleroomdata();

}else{
    viewallroomstable.style.display = "block";
    updatesingleroominformation.style.display = "none";
}