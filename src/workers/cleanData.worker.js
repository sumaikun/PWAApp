import { getAllFromStore , storeData , getFromDb, deleteFromDb } from "../helpers/indexDbModels";


const DB_NAME = 'plantar'


self.addEventListener('message', e => {

    let req = indexedDB.open(DB_NAME);  
            
    req.onsuccess = async function (evt) {

        const db = this.result;

        let tx = db.transaction(["functionalUnits","forestalUnits"], 'readonly');
        let store = tx.objectStore("forestalUnits");
        let index = store.index("SynchroState"); 
        
        let singleKeyRange = IDBKeyRange.only(true);


        let req = index.openCursor(singleKeyRange);
        req.onsuccess = async function(event) {
            let cursor = event.target.result;
            if (cursor) {
                // Do something with the matches.                      
                let data = cursor.value;
                data.after_image = "";
                data.general_image = "";
                data.id_image = "";
                data.reference_image = "";
                console.log("data to update",data);                        
                dbProccessArray.push(storeData("forestalUnits",data));                        
                cursor.continue();
            }
            else{
                postMessage("ok second thread");
            }
        }
    }

    
})