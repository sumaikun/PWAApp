import { fetchUserData } from "../helpers/fetchUserData";
import { storeData , getAllFromStore , clearStorages, storeArray } from "../helpers/indexDbModels"; 

// Respond to message from parent thread
self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals

    //console.log(e);
    const BASE_URL = 'https://plantarfuturo.com/ws';

    const EXPENSE_URL = BASE_URL+"/api/expense";

    const BOX_URL = BASE_URL+"/api/bill";

    fetch(BASE_URL+"/api/login", { 
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: e.data.email,
            password: e.data.password,
        })
    }).then( async function(response) {          
        
        console.log(response.status);

        if(response.status === 200)
        {           
            const userData = await response.json();
            
            const users = await getAllFromStore("users");
            
            if(users.length > 0)
            {
                if(users[0].id  == userData.id)
                {
                    console.log("same user");
                }
                else{
                    console.log("different user");
                    await clearStorages(["projects","functionalUnits","forestalUnits","users"]);
                }
            }

            storeData("users",userData);
            await fetchUserData(userData.id);

            if( userData.position_id  === 2 )
            {
                //modulo gastos
                let requiredExpenses = await fetch(EXPENSE_URL)
                    .then(response => {
                        return response.status === 200 ? response.json() : [];
                });

                storeArray("expenses",requiredExpenses);

                let boxExpenses = await fetch(BOX_URL)
                    .then(response => {
                        return response.status === 200 ? response.json() : [];
                });

                storeArray("boxExpenses",boxExpenses);
            }

            postMessage("success");       
        }
        else{
            postMessage("unauthorized");
        }
       
    }).catch(function(err) {
        console.error("error:",err)
        postMessage("error");    
    });

    
});