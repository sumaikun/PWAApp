import { storeArray } from "./indexDbModels";

export const fetchUserData = async (userid) => {   

    const BASE_URL = 'https://plantarfuturo.com/ws';

    const GET_PROJECTS_BY_USER = BASE_URL+"/api/users/projects/";

    const GET_FUNCTIONAL_UNITS = BASE_URL+"/api/project/functional-units/";

    const GET_FORESTAL_UNITS_URL = BASE_URL+'/api/functional-unit/forest-units/';
    //Get user projects

    const GET_DEFAULT_ACTIVITIES_BY_TYPE = BASE_URL+"/api/default-activity/";

    const GET_DAILY_REPORTS_BY_PROJECT = BASE_URL+"/api/daily-report/project/";
    //Plantation and civil


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
                            .then(response => {
                                return response.status === 200 ? response.json() : [];
                            });

                console.log("functional units");
                console.log(functionalUnits);
                storeArray("functionalUnits",functionalUnits);

                return Promise.all(

                    functionalUnits.map(async functional =>{
                        let forestalUnits = await fetch(GET_FORESTAL_UNITS_URL +functional.id)
                        .then(response => {
                            return response.status === 200 ? response.json() : [];
                        });
                        
                        console.log("forestal units");
                        console.log(forestalUnits);
                        
                        storeArray("forestalUnits",forestalUnits);
                    }));
               
            }else{
                if( project.phase == 5 || project.phase == 6 )
                {
                    let dailyReports = await fetch(GET_DAILY_REPORTS_BY_PROJECT+project.id)
                    .then(response => {
                        return response.status === 200 ? response.json() : [];
                    });
                    console.log("dailyReports",dailyReports);

                    storeArray("dailyReports",dailyReports);

                    let defaultActivities = await fetch(GET_DEFAULT_ACTIVITIES_BY_TYPE+project.id)
                    .then(response => {
                        return response.status === 200 ? response.json() : [];
                    });
                    console.log("defaultActivities",defaultActivities);

                    defaultActivities.forEach( (data) => {
                        data.project = project.id;
                    });

                    storeArray("defaultActivities",defaultActivities);

                }
            }

    }));     

       
}    


