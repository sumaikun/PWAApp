import { getAllFromStore , storeData , getFromDb, deleteFromDb } from "../helpers/indexDbModels";

const DB_NAME = 'plantar'

const BASE_URL = 'https://plantarfuturo.com/ws';

const FUNCTIONAL_UNIT_URL = BASE_URL+"/api/functional-unit";

const FIRST_PHASE = BASE_URL+"/api/forest-unit/first-phase";

const SECOND_PHASE = BASE_URL+"/api/forest-unit";

const THIRD_PHASE = BASE_URL+"/api/forest-unit/third-phase";

const PLANTATION_REPORT_URL = BASE_URL+"/api/daily-report";

const CIVIL_REPORT_URL = BASE_URL+"/api/civil-report";

const EXPENSES_URL = BASE_URL+"/api/expense";

const EXPENSES_BOX_URL = BASE_URL+"/api/bill";

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
        }).then(response =>  response.json() ).catch( err => {
            console.error("updating functional unit",err);
            reject("error");
        });

        data.synchroState = true;
        console.log("data to change in db",data);
        await storeData("functionalUnits",data);
        resolve("done");

    });

        
}

function CreateFunctionalUnit(cursor){

    let dbProccessArray = [];

    responseResolve = "update";

    let data = cursor.value;

    let oldId = data.id;

    return new Promise( async (resolve,reject) =>{

        try{
            console.log("Init fetching functional unit --------");

            let functionalU = await fetch(FUNCTIONAL_UNIT_URL, { 
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
           
            }).then(response => response.json()).catch((error) => {
                // Your error is here!
                console.log("creating functional unit",error)
                reject("error");
            });;         
            
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
                            dbProccessArray.push(storeData("forestalUnits",data));                        
                            cursor.continue();
                        }
                        else{
                            console.log("last filtered data");
                            
                            Promise.all(dbProccessArray).then(values => { 
                                console.log(values);
                                resolve("done");
                            }, reason => {
                                console.log(reason);
                                postMessage("done with errors");
                            });                      
                        }
                    };
                    req.onerror = evt => {
                        reject(error);
                    }
                
                }            
                
            });

            await deleteFromDb("functionalUnits",oldId);

            resolve("Update functional Done");

        }catch(error){
            console.log("error creating functional unit ",error);
            reject("error");
        }
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
        }).then(response =>  { 
            
            if(response.status == 500 )
            {
                console.log("error detectado");
                response.text().then(
                    data => {
                        console.log(data);
                    }
                );
            }
        
        }).catch( err => {
            console.error("updating forestal unit",err);
            reject("error");
        });

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
       
        }).then( async response => {  
            
            if(response.status == 500 )
            {
                //console.log(response);
                console.log("error detectado");

                response.text().then(
                    data => {
                        console.log(data);
                    }
                );
            }else{
                return await response.json();
            }            
            
         }).catch( err => {
            console.error("creating forestal unit",err);
            reject("error");
        });
        
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

function updatePlantationReport(cursor){

    let data = cursor.value;

    return new Promise( async (resolve,reject) =>{

        await fetch(PLANTATION_REPORT_URL+"/"+data.id, { 
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response =>  { 
            
            if(response.status == 500 )
            {
                console.log("error detectado");
                response.text().then(
                    data => {
                        console.log(data);
                    }
                );
            }
        
        }).catch( err => {
            console.error("updating plantation report",err);
            reject("error");
        });

        data.synchroState = true;

        await storeData("dailyReports",data);

        resolve("done");

    });
}

function createPlantationReport(cursor){

    let data = cursor.value;

    return new Promise( async (resolve,reject) =>{

        await fetch(PLANTATION_REPORT_URL, { 
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response =>  { 
            
            if(response.status == 500 )
            {
                console.log("error detectado");
                response.text().then(
                    data => {
                        console.log(data);
                    }
                );
            }
        
        }).catch( err => {
            console.error("create plantation report",err);
            reject("error");
        });

        data.synchroState = true;

        await storeData("dailyReports",data);

        resolve("done");
        
    });
}

function updateCivilReport(cursor){

    let data = cursor.value;

    return new Promise( async (resolve,reject) =>{

        await fetch(CIVIL_REPORT_URL+"/"+data.id, { 
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response =>  { 
            
            if(response.status == 500 )
            {
                console.log("error detectado");
                response.text().then(
                    data => {
                        console.log(data);
                    }
                );
            }
        
        }).catch( err => {
            console.error("update civil report",err);
            reject("error");
        });

        data.synchroState = true;

        await storeData("dailyReports",data);

        resolve("done");        

    });
}

function createCivilReport(cursor){

    let data = cursor.value;


    return new Promise( async (resolve,reject) =>{

        await fetch(CIVIL_REPORT_URL, { 
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response =>  { 
            
            if(response.status == 500 )
            {
                console.log("error detectado");
                response.text().then(
                    data => {
                        console.log(data);
                    }
                );
            }
        
        }).catch( err => {
            console.error("create plantation report",err);
            reject("error");
        });

        data.synchroState = true;

        await storeData("dailyReports",data);

        resolve("done");

    });
}

function updateExpense(cursor){

    let data = cursor.value;

    return new Promise( async (resolve,reject) =>{

        await fetch(EXPENSES_URL+"/"+data.id, { 
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response =>  { 
            
            if(response.status == 500 )
            {
                console.log("error detectado");
                response.text().then(
                    data => {
                        console.log(data);
                    }
                );
            }
        
        }).catch( err => {
            console.error("update expense",err);
            reject("error");
        });

        data.synchroState = true;

        await storeData("expenses",data);

        resolve("done");        

    });
}

function createExpense(cursor){

    let data = cursor.value;


    return new Promise( async (resolve,reject) =>{

        await fetch(EXPENSES_URL, { 
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response =>  { 
            
            if(response.status == 500 )
            {
                console.log("error detectado");
                response.text().then(
                    data => {
                        console.log(data);
                    }
                );
            }
        
        }).catch( err => {
            console.error("create expenses",err);
            reject("error");
        });

        data.synchroState = true;

        await storeData("expenses",data);

        resolve("done");

    });
}

function updateBoxExpense(cursor){

    let data = cursor.value;

    return new Promise( async (resolve,reject) =>{

        await fetch(EXPENSES_BOX_URL+"/"+data.id, { 
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response =>  { 
            
            if(response.status == 500 )
            {
                console.log("error detectado");
                response.text().then(
                    data => {
                        console.log(data);
                    }
                );
            }
        
        }).catch( err => {
            console.error("update expense",err);
            reject("error");
        });

        data.synchroState = true;

        await storeData("boxExpenses",data);

        resolve("done");        

    });
}
    
function createBoxExpense(cursor){

    let data = cursor.value;

    return new Promise( async (resolve,reject) =>{

        await fetch(EXPENSES_BOX_URL, { 
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response =>  { 
            
            if(response.status == 500 )
            {
                console.log("error detectado");
                response.text().then(
                    data => {
                        console.log(data);
                    }
                );
            }
        
        }).catch( err => {
            console.error("create box expenses",err);
            reject("error");
        });

        data.synchroState = true;

        await storeData("boxExpenses",data);

        resolve("done");

    });
}


self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals

    console.log("on synchro worker");    

    let req = indexedDB.open(DB_NAME);  
        
    req.onsuccess = async function (evt) {

        const db = this.result;

        let tx = db.transaction(["functionalUnits"], 'readonly');
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
                        console.error("error in functional units",reason);
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

      

        tx = db.transaction(["forestalUnits"], 'readonly');

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
                            if(Number.isInteger(cursor.value.functional_unit_id))
                            {
                                console.log("new data");
                                promisesArray.push(createForestalUnit(cursor)); 
                            }    
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
                        //postMessage(responseResolve);
                        resolve("done");         
                      }, reason => {
                        console.error("forestal unit errors",reason);
                        //postMessage("done with errors");
                        reject("error in promise array");
                    });
                    
                }

            }

            req.onerror = function(event){
                console.log("error",event);
                //postMessage("error");
                reject(event)
            }
        
        });

        tx = db.transaction(["dailyReports"], 'readonly');

        await new Promise( (resolve,reject) =>{

            store = tx.objectStore("dailyReports");
            
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
                            if(cursor.value.civil)
                            {
                                promisesArray.push(createCivilReport(cursor));
                            }
                            else{
                                promisesArray.push(createPlantationReport(cursor));
                            }                               
                        }
                        else{
                            console.log("update data");
                            if(cursor.value.civil)
                            {
                                promisesArray.push(updateCivilReport(cursor));
                            }
                            else{
                                promisesArray.push(updatePlantationReport(cursor));
                            }                             
                        }
                    }
                    
                    cursor.continue();
                }
                else {
                    console.log("last data");
                    
                    
                    Promise.all(promisesArray).then(values => { 
                        console.log(values);
                        //postMessage(responseResolve);
                        resolve("done");         
                      }, reason => {
                        console.error(" plantation and civil errors",reason);
                        //postMessage("done with errors");
                        reject("error in promise array");
                    });
                    
                }

            }

            req.onerror = function(event){
                console.log("error",event);
                //postMessage("error");
                reject(event)
            }
        })

        tx = db.transaction(["expenses"], 'readonly');

        await new Promise( (resolve,reject) =>{

            store = tx.objectStore("expenses");
            
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
                            
                            promisesArray.push(createExpense(cursor));
                                                       
                        }
                        else{
                            console.log("update data");
                            
                            promisesArray.push(updateExpense(cursor));
                                                         
                        }
                    }
                    
                    cursor.continue();
                }
                else {
                    console.log("last data");
                    
                    
                    Promise.all(promisesArray).then(values => { 
                        console.log(values);
                        //postMessage(responseResolve);
                        resolve("done");         
                      }, reason => {
                        console.error(" expenses errors",reason);
                        //postMessage("done with errors");
                        reject("error in promise array");
                    });
                    
                }

            }

            req.onerror = function(event){
                console.log("error",event);
                //postMessage("error");
                reject(event)
            }
        })

        tx = db.transaction(["boxExpenses"], 'readonly');

        await new Promise( (resolve,reject) =>{

            store = tx.objectStore("boxExpenses");
            
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
                            
                            promisesArray.push(createBoxExpense(cursor));
                                                       
                        }
                        else{
                            console.log("update data");
                            
                            promisesArray.push(updateBoxExpense(cursor));
                                                         
                        }
                    }
                    
                    cursor.continue();
                }
                else {
                    console.log("last data");
                    
                    
                    Promise.all(promisesArray).then(values => { 
                        console.log(values);
                        //postMessage(responseResolve);
                        resolve("done");         
                      }, reason => {
                        console.error(" box expenses errors",reason);
                        //postMessage("done with errors");
                        reject("error in promise array");
                    });
                    
                }

            }

            req.onerror = function(event){
                console.log("error",event);
                //postMessage("error");
                reject(event)
            }
        })

    }
    req.onerror = function (evt) {
        console.log("error opening db",evt);
        postMessage("error");
    }

    

    

});