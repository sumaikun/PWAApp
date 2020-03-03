const DB_NAME = 'plantar';
const DB_VERSION = 11; 

export function generateDb() {    
     console.log("openDb ...");
     let req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onsuccess = function (evt) {
      const db = this.result;
      console.log("openDb DONE");
      db.close();
      console.log("closeDb DONE");
    };
    req.onerror = function (evt) {
      console.error("openDb:", evt.target.errorCode);
    };

    //this function is executed just one time when the db is deffined
    req.onupgradeneeded = function (evt) {
        
        console.log("openDb.onupgradeneeded");
        
        let db = evt.target.result;

        try {
          store = this.transaction.objectStore('projects');
          db.deleteObjectStore('projects');
          db.deleteObjectStore('functionalUnits');
          db.deleteObjectStore('forestalUnits');
          db.deleteObjectStore('users');
          db.deleteObjectStore('dailyReports');
          db.deleteObjectStore('defaultActivities');  
        }
        catch(e) {
         
        }        

        let store = db.createObjectStore(
            "projects", { keyPath: 'id', autoIncrement: true });
    
          store.createIndex('administrative_act', 'administrative_act', { unique: false });
          store.createIndex('created_at', 'created_at', { unique: false });
          store.createIndex('customer', 'customer', { unique: false });
          store.createIndex('customer_id', 'customer_id', { unique: false });
          store.createIndex('east_coord', 'east_coord', { unique: false });
          store.createIndex('enviromental_control', 'enviromental_control', { unique: false });  
          store.createIndex('inspector', 'inspector', { unique: false });  
          store.createIndex('location', 'location', { unique: false });
          store.createIndex('name', 'name', { unique: false });
          store.createIndex('phase', 'phase', { unique: false });
          store.createIndex('north_coord', 'north_coord', { unique: false });
          store.createIndex('representative_name', 'representative_name', { unique: false });
          store.createIndex('representative_position', 'representative_position', { unique: false });
          store.createIndex('responsible', 'responsible', { unique: false });
          store.createIndex('role_id', 'role_id', { unique: false });
          store.createIndex('updated_at', 'updated_at', { unique: false });
          store.createIndex('synchroState', 'synchroState', { unique: false });


        store = db.createObjectStore(
            "functionalUnits", { keyPath: 'id', autoIncrement: true });
            
           store.createIndex('code', 'code', { unique: false });
           store.createIndex('created_at', 'created_at', { unique: false });
           store.createIndex('project_id', 'project_id', { unique: false });
           store.createIndex('type', 'type', { unique: false });
           store.createIndex('updated_at', 'updated_at', { unique: false });
           store.createIndex('synchroState', 'synchroState', { unique: false });
           store.createIndex('localComment', 'localComment', { unique: false });
           
        store = db.createObjectStore(
            "forestalUnits", { keyPath: 'id', autoIncrement: true });
            
           store.createIndex('after_image', 'after_image', { unique: false });
           store.createIndex('cap_cm', 'cap_cm', { unique: false });
           store.createIndex('code', 'code', { unique: false });
           store.createIndex('commercial_heigth_m', 'commercial_heigth_m', { unique: false });
           store.createIndex('common_name', 'common_name', { unique: false });
           store.createIndex('condition', 'condition', { unique: false });
           store.createIndex('created_at', 'created_at', { unique: false });
           store.createIndex('cup_density', 'cup_density', { unique: false });
           store.createIndex('east_coord', 'east_coord', { unique: false });
           store.createIndex('end_treatment', 'end_treatment', { unique: false });
           store.createIndex('epiphytes', 'epiphytes', { unique: false }); 
           store.createIndex('family', 'family', { unique: false });             
           store.createIndex('functional_unit_id', 'functional_unit_id', { unique: false });
           store.createIndex('general_image', 'general_image', { unique: false });
           store.createIndex('health_status', 'health_status', { unique: false });
           store.createIndex('id_image', 'id_image', { unique: false });
           store.createIndex('margin', 'margin', { unique: false });
           store.createIndex('north_coord', 'north_coord', { unique: false });
           store.createIndex('note', 'note', { unique: false });
           store.createIndex('origin', 'origin', { unique: false });
           store.createIndex('products', 'products', { unique: false });
           store.createIndex('reference_image', 'reference_image', { unique: false });
           store.createIndex('resolution', 'resolution', { unique: false });
           store.createIndex('scientific_name', 'scientific_name', { unique: false });
           store.createIndex('start_treatment', 'start_treatment', { unique: false });
           store.createIndex('state', 'state', { unique: false });
           store.createIndex('total_heigth_m', 'total_heigth_m', { unique: false });
           store.createIndex('treatment', 'treatment', { unique: false });
           store.createIndex('updated_at', 'updated_at', { unique: false });
           store.createIndex('waypoint', 'waypoint', { unique: false });
           store.createIndex('x_cup_diameter_m', 'x_cup_diameter_m', { unique: false });
           store.createIndex('y_cup_diameter_m', 'y_cup_diameter_m', { unique: false });
           store.createIndex('synchroState', 'synchroState', { unique: false });
           store.createIndex('localComment', 'localComment', { unique: false });
           
           store = db.createObjectStore(
            "users", { keyPath: 'id' });
            
           store.createIndex('address', 'address', { unique: false });
           store.createIndex('created_at', 'created_at', { unique: false });
           store.createIndex('document', 'document', { unique: false });
           store.createIndex('document_type_id', 'document_type_id', { unique: false });
           store.createIndex('email', 'email', { unique: false });
           store.createIndex('lastname', 'lastname', { unique: false });
           store.createIndex('updated_at', 'created_at', { unique: false });
           store.createIndex('position_id', 'position_id', { unique: false });
           store.createIndex('name', 'name', { unique: false });
           store.createIndex('phone', 'phone', { unique: false });
           store.createIndex('synchroState', 'synchroState', { unique: false });


           //plantation and civil

           store = db.createObjectStore(
            "dailyReports", { keyPath: 'id' });
            
           store.createIndex('responsible', 'responsible', { unique: false });
           store.createIndex('field_assistant', 'field_assistant', { unique: false });
           store.createIndex('location', 'location', { unique: false });
           store.createIndex('report_date', 'report_date', { unique: false });
           store.createIndex('people_number', 'people_number', { unique: false });
           store.createIndex('type', 'type', { unique: false });
           store.createIndex('officials', 'officials', { unique: false });
           store.createIndex('assistants', 'assistants', { unique: false });
           store.createIndex('notes', 'notes', { unique: false });
           store.createIndex('civil_image_1', 'civil_image_1', { unique: false });
           store.createIndex('civil_image_2', 'civil_image_2', { unique: false });
           store.createIndex('civil_image_3', 'civil_image_3', { unique: false });
           store.createIndex('project_id', 'project_id', { unique: false });
           store.createIndex('created_at', 'created_at', { unique: false });
           store.createIndex('updated_at', 'updated_at', { unique: false });
           store.createIndex('report_activities', 'report_activities', { unique: false });
           store.createIndex('required_staffs', 'required_staffs', { unique: false });
           store.createIndex('required_tools', 'required_tools', { unique: false });
           store.createIndex('civil', 'civil', { unique: false });
           store.createIndex('synchroState', 'synchroState', { unique: false });

           store = db.createObjectStore(
            "defaultActivities", { keyPath: 'id' });
            
           store.createIndex('name', 'name', { unique: false });
           store.createIndex('measuring_unit', 'measuring_unit', { unique: false });
           store.createIndex('activity_type_id', 'activity_type_id', { unique: false });
           store.createIndex('created_at', 'created_at', { unique: false });
           store.createIndex('updated_at', 'updated_at', { unique: false });
           store.createIndex('synchroState', 'synchroState', { unique: false });


           store = db.createObjectStore(
            "expenses", { keyPath: 'id' });
            
           store.createIndex('synchroState', 'synchroState', { unique: false });

           store = db.createObjectStore(
            "boxExpenses", { keyPath: 'id' });
            
           store.createIndex('synchroState', 'synchroState', { unique: false });

    };
}

export const getAllFromStore = async (storeName) =>{

    let req = indexedDB.open(DB_NAME);

    return new Promise((resolve, reject) => {
        
        req.onsuccess = function (evt) {
      
            const db = this.result;
            console.log("openDb DONE");
      
            let tx = db.transaction(storeName, 'readonly');
            let store = tx.objectStore(storeName);
            let dataSet = store.getAll();
            dataSet.onsuccess = (evt) =>{
                console.log("dataSet success");               
                db.close();
                resolve(evt.target.result);
            }
            dataSet.onerror = (evt) =>{
                console.log("dataSet error");
                db.close();
                reject(this.error);
            }
        }
        
        req.onerror = function (evt){
            console.log("error opening db");           
            reject(this.error);
        }

    });

    

}


export const storeArray = (storeName, arraySet) => {

    let req = indexedDB.open(DB_NAME);

      req.onsuccess = async function (evt) {
        
        const db = this.result;
        console.log("openDb DONE");

        let tx = db.transaction(storeName, 'readwrite');
        let store = tx.objectStore(storeName);     
        
        for(let i in arraySet)
        {

            if(arraySet[i].synchroState == null)
            {
                arraySet[i].synchroState = true;
            } 

            let request = store.get(arraySet[i].id);
            
            request.onsuccess = (evt) => {
                
                console.log("success request",evt);
                
                if(this.result)
                {
                    let process = store.put(arraySet[i])
                    process.onsuccess = function(event) {                        
                        console.log("data updated",event);
                    };
                    process.onerror = function(event) {
                        console.log("error",event);
                    };

                    console.log("update");
                }
                else{
                    let proccess = store.add(arraySet[i]);
                    proccess.onsuccess = function(event) {
                        console.log("data added",event);
                    };
                    process.onerror = function(event) {
                        console.log("error",event);
                    };
                    
                    console.log("create");                    
                }
                
            };

            request.onerror = evt =>{
                console.log("error request",evt);
            }   
        
        }    
        await tx.onsuccess;
        console.log("transaction completed");    
        db.close();
        console.log("closeDb DONE");        
      };
 

}

export const deleteDb = ()=>{
    let req = indexedDB.deleteDatabase(DB_NAME);
    req.onsuccess = function () {
        console.log("Deleted database successfully");
    };
    req.onerror = function () {
        console.log("Couldn't delete database");
    };
    req.onblocked = function () {
        console.log("Couldn't delete database due to the operation being blocked");
    };
}

export const getFromDb = (storeName, elementId) =>{

    let req = indexedDB.open(DB_NAME);

    return new Promise((resolve, reject) => {
        
        req.onsuccess = function (evt) {
      
            const db = this.result;
            console.log("openDb DONE");
      
            let tx = db.transaction(storeName, 'readonly');
            let store = tx.objectStore(storeName);
            let dataSet = store.get(elementId);
            dataSet.onsuccess = (evt) =>{
                console.log("data success");               
                db.close();
                resolve(evt.target.result);
            }
            dataSet.onerror = (evt) =>{
                console.log("dataSet error");
                db.close();
                reject(this.error);
            }
        }
        
        req.onerror = function (evt){
            console.log("error opening db");         
            reject(this.error);
        }

    });
}

export const storeData = (storeName, data) => {
    let req = indexedDB.open(DB_NAME);

    return new Promise((resolve, reject) => {

        req.onsuccess = async function (evt) {
            const db = this.result;
            console.log("openDb DONE");

            let tx = db.transaction(storeName, 'readwrite');
            let store = tx.objectStore(storeName);
            
                if(data.synchroState == null)
                {
                    data.synchroState = true;
                } 

                let request = store.get(data.id);
                
                request.onsuccess = (evt) => {
                    
                    console.log("success request",evt);
                    
                    if(this.result)
                    {
                        let process = store.put(data)
                        process.onsuccess = function(event) {                        
                            console.log("data updated",event);
                            resolve("done");
                        };
                        process.onerror = function(event) {
                            console.log("error",event);
                            reject(this.error);
                        };

                        console.log("update");
                    }
                    else{
                        let proccess = store.add(data);
                        proccess.onsuccess = function(event) {
                            console.log("data added",event);
                            resolve("done");
                        };
                        process.onerror = function(event) {
                            console.log("error",event);
                            reject(this.error);
                        };
                        
                        console.log("create");                    
                    }
                    
                };

                request.onerror = evt =>{
                    console.log("error request",evt);
                }       
        }
        req.onerror = function (evt){
            console.log("error opening db");         
            reject(this.error);
        }
    });
}

export const clearStorages = (storeArray) =>{
    
    let req = indexedDB.open(DB_NAME);

    return new Promise((resolve, reject) => {
        req.onsuccess = async function (evt) {

            const db = this.result;
            let tx = db.transaction(storeArray, 'readwrite');
    
            for(let i in storeArray)
            {
                //console.log(storeArray.length);
                //console.log(i);
    
                let store = tx.objectStore(storeArray[i]);
    
                await store.clear();

                if(storeArray.length -1 == i )
                {
                    resolve("done");
                }
                else{
                    console.log("no yet");
                }
                
                /*request.onsuccess( evt => {
                    console.log("storage clear",storeArray[i]);                
                }) 
                request.onerror( evt =>{
                    console.log("storage clear error",storeArray[i],evt);
                })*/
            }
        }
        req.onerror = (evt) =>{
            console.log("error opening db",evt);
            reject(this.error);
        }
    });    

}

export const deleteFromDb = (storeName, elementId) =>{
    
    let req = indexedDB.open(DB_NAME);

    return new Promise((resolve, reject) => {

        req.onsuccess = function (evt) {
      
            const db = this.result;
            console.log("openDb DONE");
      
            let tx = db.transaction(storeName, 'readwrite');
            let store = tx.objectStore(storeName);
            let proc = store.delete(elementId);
            proc.onsuccess = (evt) =>{
                console.log("delete success");               
                db.close();
                resolve(evt.target.result);
            }
            proc.onerror = (evt) =>{
                console.log("delete error");
                db.close();
                reject(this.error);
            }
        }
        
        req.onerror = function (evt){
            console.log("error opening db");         
            reject(this.error);
        }
      
    });


}

export const verifyAndSaveInArray = (array,storeName) =>{

    let req = indexedDB.open(DB_NAME);

    return new Promise((resolve, reject) => {

        req.onsuccess = function (evt) {
      
            const db = this.result;
            console.log("openDb DONE");
      
            let tx = db.transaction(storeName, 'readwrite');
            let store = tx.objectStore(storeName);

            let i = 0;

            array.forEach(data => {
                
                let proc = store.get(data["id"]);

                            

                proc.onsuccess = (evt) =>{
                    
                    //console.log("get success",evt.target.result);
                    i++;

                    if(evt.target.result == null)
                    {
                        store.add(data);
                    }

                    //console.log("equal",i,array.length);

                    //console.log(i,array.length);
                    
                    if (i === array.length) {
                        db.close();
                        resolve(evt.target.result);
                    }
                    
                }
                proc.onerror = (evt) =>{
                    //console.log("error in get");
                    i++;
                    
                    if (i === array.length) {
                        db.close();
                        reject(this.error);
                    }
                    
                }

                
            });
            
        }
        
        req.onerror = function (evt){
            console.log("error opening db");         
            reject(this.error);
        }
    
    
    });

} 
