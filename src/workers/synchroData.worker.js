import { getAllFromStore , storeData , getFromDb, deleteFromDb } from "../helpers/indexDbModels";

const DB_NAME = 'plantar'

const BASE_URL = 'https://plantarfuturo.com/ws';

const FUNCTIONAL_UNIT_URL = BASE_URL+"/api/functional-unit";

const FIRST_PHASE = BASE_URL+"/api/forest-unit/first-phase";

const SECOND_PHASE = BASE_URL+"/api/forest-unit";

const THIRD_PHASE = BASE_URL+"/api/forest-unit/third-phase";

var promisesArray = [];

let responseResolve = "done";

function UpdateFunctionalUnit(cursor){

    responseResolve = "update";

    let data = cursor.value;

    return new Promise( async (resolve,reject) =>{

        await fetch(FUNCTIONAL_UNIT_URL+"/"+data.id, { 
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cursor.value)
        }).then(response =>  response.json() );

        data.synchroState = true;
        console.log("data to change in db",data);
        await storeData("functionalUnits",data);
        resolve("done");

    });

        
}

function CreateFunctionalUnit(cursor){

    responseResolve = "update";

    let data = cursor.value;

    let oldId = data.id;

    return new Promise( async (resolve,reject) =>{

        let functionalU = await fetch(FUNCTIONAL_UNIT_URL, { 
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
       
        }).then(response => response.json());         
        
        console.log("id generado",functionalU);

        data.id =  functionalU.id;
        data.synchroState = true;
        await storeData("functionalUnits",data);

        await new Promise( (resolve,reject) =>{

            let req = indexedDB.open(DB_NAME);  
        
            req.onsuccess = async function (evt) {
        
                const db = this.result;
        
                let tx = db.transaction(["functionalUnits","forestalUnits"], 'readonly');

                let store = tx.objectStore("forestalUnits");
                let index = store.index("functional_unit_id");
                console.log("id value to filter",oldId);
                let singleKeyRange = IDBKeyRange.only(oldId);
                let req = index.openCursor(singleKeyRange);
                req.onsuccess = async function(event) {
                    let cursor = event.target.result;
                    if (cursor) {
                        // Do something with the matches.                      
                        let data = cursor.value;
                        data.functional_unit_id = functionalU.id;
                        console.log("data to update",data);                        
                        storeData("forestalUnits",data);
                        
                        cursor.continue();
                    }
                    else{
                        console.log("last filtered data");
                        resolve("done");
                    }
                };
                req.onerror = evt => {
                    reject(error);
                }
            
            }            
            
        });

        await deleteFromDb("functionalUnits",oldId);

        resolve("Update functional Done");

    });

}

function updateForestalUnit(cursor){

    responseResolve = "update";

    let data = cursor.value;
    return new Promise( async (resolve,reject) =>{
        let funcUnit = await getFromDb("functionalUnits",data.functional_unit_id);
        console.log("registered fi",funcUnit);
        let project = await getFromDb("projects",funcUnit.project_id);
        console.log("project",project);
        let URL;
        switch(project.phase)
        {
            case "1":
                URL = FIRST_PHASE;
            break;

            case "2":
                URL = SECOND_PHASE;
            break;

            case "3":
                URL = THIRD_PHASE;
            break;

        }

        await fetch(URL+"/"+data.id, { 
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response =>  response.json() );

        data.synchroState = true;

        await storeData("forestalUnits",data);

        resolve("done");

    });
}

function createForestalUnit(cursor){

    responseResolve = "update";

    let data = cursor.value;

    let oldId = cursor.value.id;
    return new Promise( async (resolve,reject) =>{
        let funcUnit = await getFromDb("functionalUnits",data.functional_unit_id);
        console.log("registered fi",funcUnit,"original data",data);
        let project = await getFromDb("projects",funcUnit.project_id);
        console.log("project",project);
        let URL;
        switch(project.phase)
        {
            case "1":
                URL = FIRST_PHASE;
            break;

            case "2":
                URL = SECOND_PHASE;
            break;

            case "3":
                URL = THIRD_PHASE;
            break;

        }
        
        let newData = await fetch(URL, { 
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
       
        }).then(response => response.json());
        
        if(newData.id)
        {
            data.id = newData.id
            data.synchroState = true;
            await storeData("forestalUnits",data);
            await deleteFromDb("forestalUnits",oldId);
        }
        

        resolve("done");

    });
}


self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals

    console.log("on synchro worker");    

    let req = indexedDB.open(DB_NAME);  
        
    req.onsuccess = async function (evt) {

        const db = this.result;

        let tx = db.transaction(["functionalUnits","forestalUnits"], 'readonly');
        let store = tx.objectStore("functionalUnits");
        
        let req = store.openCursor();

        await new Promise( (resolve,reject) =>{

            req.onsuccess = async function(event) {
                let cursor = event.target.result;
                if (cursor) {              

                    if(cursor.value.synchroState == false)
                    {
                        console.log(cursor.value);
                        console.log("data to send");                    


                        if(!Number.isInteger(cursor.value.id))
                        {
                            console.log("special send");
                            promisesArray.push(CreateFunctionalUnit(cursor));                         
                            
                        }
                        else{
                            promisesArray.push(UpdateFunctionalUnit(cursor));
                        }
                    }
                    
                    cursor.continue();

                }
                else {
                    console.log("last data");
                    //postMessage("done");
                    Promise.all(promisesArray).then(values => { 
                        console.log(values);
                        resolve("done");      
                      }, reason => {
                        console.log(reason);
                        reject("error in promise array");
                    });                    
                    
                }
            };

            req.onerror = function(event){
                console.log("error",event);
                //postMessage("error");
                reject(error)
            }
        
        });

      

        tx = db.transaction(["functionalUnits","forestalUnits"], 'readonly');

        await new Promise( (resolve,reject) =>{

            store = tx.objectStore("forestalUnits");
            
            req = store.openCursor();

            req.onsuccess = async function(event) {

                let cursor = event.target.result;
                if (cursor) {

                    if(!cursor.value.synchroState)
                    {
                        console.log(cursor.value);
                        console.log("data to send");
                        if(!Number.isInteger(cursor.value.id))
                        {
                            console.log("new data");
                            promisesArray.push(createForestalUnit(cursor)); 
                        }
                        else{
                            console.log("update data");
                            promisesArray.push(updateForestalUnit(cursor)); 
                        }
                    }
                    
                    cursor.continue();
                }
                else {
                    console.log("last data");
                    
                    
                    Promise.all(promisesArray).then(values => { 
                        console.log(values);
                        postMessage(responseResolve);        
                      }, reason => {
                        console.log(reason);
                        postMessage("done with errors");
                    });
                    
                }

            }

            req.onerror = function(event){
                console.log("error",event);
                postMessage("error");
            }
        
        });

    }
    req.onerror = function (evt) {
        console.log("error opening db",evt);
        postMessage("error");
    }

    

    

});