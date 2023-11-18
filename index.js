import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://champion-960b8-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementInDB = ref(database, "endorsement")

const endorsementInputEl = document.getElementById("endorsement-input-el")
const fromInputEl = document.getElementById("from-input-el")
const toInputEl = document.getElementById("to-input-el")
const endorsementContainer = document.getElementById("endorsements-container")
const btn = document.getElementById("btn")

btn.addEventListener("click", function() {
    const endorsement = {
        "to": toInputEl.value,
        "from": fromInputEl.value,
        "msg": endorsementInputEl.value
    }
    
    push(endorsementInDB, endorsement)
    clearInputs()
})

onValue(endorsementInDB, function(snapshot) {
   if(!snapshot.exists()) {
       endorsementContainer.innerHTML = `<p class="note">Be the first one to endorse!</p>`
       return
   }
   
   const endorsementArray = Object.entries(snapshot.val())
   clearEndorsementContainer()
   
   for(let i = endorsementArray.length - 1; i >= 0; i--) {
       appendItemToEndorsementContainer(endorsementArray[i])
   }
})

function appendItemToEndorsementContainer(endorsementItem) {
    const itemId = endorsementItem[0]
    const item = endorsementItem[1]
    
    endorsementContainer.innerHTML += `
    <li class="endorsment-item">
        <h5 class="endorsement-title">To ${item.to}</h5>
        <p class="endorsement-msg">${item.msg}</p>
        <h5 class="endorsement-title">From ${item.from}</h5>
    </li>`
}

function clearInputs() {
    toInputEl.value = ""
    fromInputEl.value = ""
    endorsementInputEl.value = ""
}

function clearEndorsementContainer() {
    endorsementContainer.innerHTML = ""
}