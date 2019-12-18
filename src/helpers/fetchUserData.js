import { storeArray } from "./indexDbModels";

export const fetchUserData = async (userid) => {   

    const BASE_URL = 'https://plantarfuturo.com/ws';

    const GET_PROJECTS_BY_USER = BASE_URL+"/api/users/projects/";

    const GET_FUNCTIONAL_UNITS = BASE_URL+"/api/project/functional-units/";

    const GET_FORESTAL_UNITS_URL = BASE_URL+'/api/functional-unit/forest-units/';
    //Get user projects

    let projects = await fetch(GET_PROJECTS_BY_USER+userid)
                                    .then(response => response.json());
                                
    console.log(projects);

      //here the project must be save on indexed db on a asynchronous way
      storeArray("projects",projects);
      //---------------------------------------------------------------------

    return Promise.all(

        projects.map( async project => {

            if(project.phase != 4 && project.phase != 5 && project.phase != 6)
            {
                //here fetch functional units for forestal projects in background 

                let functionalUnits = await fetch(GET_FUNCTIONAL_UNITS+project.id)
                            .then(response => response.json());

                console.log("functional units");
                console.log(functionalUnits);
                storeArray("functionalUnits",functionalUnits);

                return Promise.all(

                    functionalUnits.map(async functional =>{
                        let forestalUnits = await fetch(GET_FORESTAL_UNITS_URL +functional.id)
                                .then(response => response.json());
                        
                        console.log("forestal units");
                        console.log(forestalUnits);
                        
                        storeArray("forestalUnits",forestalUnits);
                    }));
               
            }

    }));     

       
}    


