export let pProjects = [
  {
    "id": 777,
    "name": "Proyecto Plantacion Test 1",
    "inspector": "Marlon",
    "responsible": "Camilo",
    "representative_name": "Jesus",
    "representative_position": "Representante legal",
    "administrative_act": "N/A",
    "enviromental_control": "ANLA",
    "east_coord": "123345",
    "north_coord": "345123",
    "location": "Bogota",
    "phase": "5",
    "customer_id": 1,
    "created_at": "2019-05-27 08:05:53",
    "updated_at": "2019-05-27 08:05:53",
    "customer": {
      "id": 1,
      "name": "N/A",
      "created_at": null,
      "updated_at": null
    }
  },
  {
    "id": 778,
    "name": "Proyecto Plantacion Test 2",
    "inspector": "Linda Linares",
    "responsible": "Linda Linares",
    "representative_name": "Tito Garcia",
    "representative_position": "Coordinador inventario",
    "administrative_act": "NA",
    "enviromental_control": "ANLA",
    "east_coord": "1156117.93197",
    "north_coord": "1160429.0514",
    "location": "Antioquia",
    "phase": "5",
    "customer_id": 1,
    "created_at": "2019-05-17 19:40:31",
    "updated_at": "2019-05-17 19:40:31",
    "customer": {
      "id": 1,
      "name": "N/A",
      "created_at": null,
      "updated_at": null
    }
  },
  {
    "id": 779,
    "name": "Proyecto Plantacion Test 3",
    "inspector": "Marlon",
    "responsible": "Camilo",
    "representative_name": "Jesus",
    "representative_position": "Representante",
    "administrative_act": "Acto",
    "enviromental_control": "ANLA",
    "east_coord": "123456",
    "north_coord": "123456",
    "location": "Bogota",
    "phase": "5",
    "customer_id": 1,
    "created_at": "2019-05-21 04:51:05",
    "updated_at": "2019-05-21 04:51:05",
    "customer": {
      "id": 1,
      "name": "N/A",
      "created_at": null,
      "updated_at": null
    }
  }
];

export let exampleActivities = [
  {
    "activity": "Rocerio",
    "meditionUnit": "Unidades"
  },
  {
    "activity": "Plateo",
    "meditionUnit": "Metros"
  },
  {
    "activity": "Ahoyado",
    "meditionUnit": "Metros"
  },
  {
    "activity": "Plantacion",
  },
  {
    "activity": "Tutorado",
  },
  {
    "activity": "Fertilizacion",
    "meditionUnit": "Metros"
  },
  {
    "activity": "Podas",
  },
  {
    "activity": "Resiembra",
  },
  {
    "activity": "Riego",
    "meditionUnit": "Litros"
  },
];

export let exampleReports = [
  {
    "id": "1",
    "responsible": "Camilo",
    "assistant": "Pedro",
    "place": "Guayabetal",
    "date": "16-07-2019 09:33",
    "people": "5",
    "activities": [
      {
        "activity": "Riego",
        "activity_id": "1",
        "hours": "4",
        "quantityMeditionUnit": "4",
      },
      {
        "activity": "Rocerio",
        "activity_id": "2",
        "hours": "3",
        "quantityMeditionUnit": "3",
      },
      {
        "activity": "Rocerio",
        "activity_id": "3",
        "hours": "2",
        "quantityMeditionUnit": "6",
      },
      {
        "activity": "Ahoyado",
        "activity_id": "4",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Plantacion",
        "activity_id": "5",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Tutorado",
        "activity_id": "6",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Fertilizacion",
        "activity_id": "7",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Podas",
        "activity_id": "8",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Resiembra",
        "activity_id": "9",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Riego",
        "activity_id": "10",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
    ],
    "type": "1",
    "project_id": "777"
  },
  {
    "id": "2",
    "responsible": "Marlon",
    "assistant": "Pedro",
    "place": "Guayabetal",
    "date": "16-07-2019 09:33",
    "people": "5",
    "activities": [
      {
        "activity": "Riego",
        "activity_id": "1",
        "hours": "4",
        "quantityMeditionUnit": "4",
      },
      {
        "activity": "Rocerio",
        "activity_id": "2",
        "hours": "3",
        "quantityMeditionUnit": "3",
      },
      {
        "activity": "Rocerio",
        "activity_id": "3",
        "hours": "2",
        "quantityMeditionUnit": "6",
      },
      {
        "activity": "Ahoyado",
        "activity_id": "4",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Plantacion",
        "activity_id": "5",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Tutorado",
        "activity_id": "6",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Fertilizacion",
        "activity_id": "7",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Podas",
        "activity_id": "8",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Resiembra",
        "activity_id": "9",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Riego",
        "activity_id": "10",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
    ],
    "type": "2",
    "project_id": "777"
  },
  {
    "id": "3",
    "responsible": "Camilo",
    "assistant": "Pedro",
    "place": "Guayabetal",
    "date": "16-07-2019 09:33",
    "people": "5",
    "activities": [
      {
        "activity": "Riego",
        "activity_id": "1",
        "hours": "4",
        "quantityMeditionUnit": "4",
      },
      {
        "activity": "Rocerio",
        "activity_id": "2",
        "hours": "3",
        "quantityMeditionUnit": "3",
      },
      {
        "activity": "Rocerio",
        "activity_id": "3",
        "hours": "2",
        "quantityMeditionUnit": "6",
      },
      {
        "activity": "Ahoyado",
        "activity_id": "4",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Plantacion",
        "activity_id": "5",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Tutorado",
        "activity_id": "6",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Fertilizacion",
        "activity_id": "7",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Podas",
        "activity_id": "8",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Resiembra",
        "activity_id": "9",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Riego",
        "activity_id": "10",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
    ],
    "type": "1",
    "project_id": "777"
  },
  {
    "id": "4",
    "responsible": "Marlon",
    "assistant": "Pedro",
    "place": "Guayabetal",
    "date": "16-07-2019 09:33",
    "people": "5",
    "activities": [
      {
        "activity": "Riego",
        "activity_id": "1",
        "hours": "4",
        "quantityMeditionUnit": "4",
      },
      {
        "activity": "Rocerio",
        "activity_id": "2",
        "hours": "3",
        "quantityMeditionUnit": "3",
      },
      {
        "activity": "Rocerio",
        "activity_id": "3",
        "hours": "2",
        "quantityMeditionUnit": "6",
      },
      {
        "activity": "Ahoyado",
        "activity_id": "4",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Plantacion",
        "activity_id": "5",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Tutorado",
        "activity_id": "6",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Fertilizacion",
        "activity_id": "7",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Podas",
        "activity_id": "8",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Resiembra",
        "activity_id": "9",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Riego",
        "activity_id": "10",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
    ],
    "type": "2",
    "project_id": "778"
  },
  {
    "id": "5",
    "responsible": "Marlon",
    "assistant": "Pedro",
    "place": "Guayabetal",
    "date": "16-07-2019 09:33",
    "people": "5",
    "activities": [
      {
        "activity": "Riego",
        "activity_id": "1",
        "hours": "4",
        "quantityMeditionUnit": "4",
      },
      {
        "activity": "Rocerio",
        "activity_id": "2",
        "hours": "3",
        "quantityMeditionUnit": "3",
      },
      {
        "activity": "Rocerio",
        "activity_id": "3",
        "hours": "2",
        "quantityMeditionUnit": "6",
      },
      {
        "activity": "Ahoyado",
        "activity_id": "4",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Plantacion",
        "activity_id": "5",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Tutorado",
        "activity_id": "6",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Fertilizacion",
        "activity_id": "7",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Podas",
        "activity_id": "8",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Resiembra",
        "activity_id": "9",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Riego",
        "activity_id": "10",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
    ],
    "type": "2",
    "project_id": "778"
  },
  {
    "id": "6",
    "responsible": "Marlon",
    "assistant": "Pedro",
    "place": "Guayabetal",
    "date": "16-07-2019 09:33",
    "people": "5",
    "activities": [
      {
        "activity": "Riego",
        "activity_id": "1",
        "hours": "4",
        "quantityMeditionUnit": "4",
      },
      {
        "activity": "Rocerio",
        "activity_id": "2",
        "hours": "3",
        "quantityMeditionUnit": "3",
      },
      {
        "activity": "Rocerio",
        "activity_id": "3",
        "hours": "2",
        "quantityMeditionUnit": "6",
      },
      {
        "activity": "Ahoyado",
        "activity_id": "4",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Plantacion",
        "activity_id": "5",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Tutorado",
        "activity_id": "6",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Fertilizacion",
        "activity_id": "7",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Podas",
        "activity_id": "8",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Resiembra",
        "activity_id": "9",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Riego",
        "activity_id": "10",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
    ],
    "type": "2",
    "project_id": "778"
  },
  {
    "id": "7",
    "responsible": "Marlon",
    "assistant": "Pedro",
    "place": "Guayabetal",
    "date": "16-07-2019 09:33",
    "people": "5",
    "activities": [
      {
        "activity": "Riego",
        "activity_id": "1",
        "hours": "4",
        "quantityMeditionUnit": "4",
      },
      {
        "activity": "Rocerio",
        "activity_id": "2",
        "hours": "3",
        "quantityMeditionUnit": "3",
      },
      {
        "activity": "Rocerio",
        "activity_id": "3",
        "hours": "2",
        "quantityMeditionUnit": "6",
      },
      {
        "activity": "Ahoyado",
        "activity_id": "4",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Plantacion",
        "activity_id": "5",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Tutorado",
        "activity_id": "6",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Fertilizacion",
        "activity_id": "7",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Podas",
        "activity_id": "8",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Resiembra",
        "activity_id": "9",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Riego",
        "activity_id": "10",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
    ],
    "type": "2",
    "project_id": "779"
  },
  {
    "id": "8",
    "responsible": "Marlon",
    "assistant": "Pedro",
    "place": "Guayabetal",
    "date": "16-07-2019 09:33",
    "people": "5",
    "activities": [
      {
        "activity": "Riego",
        "activity_id": "1",
        "hours": "4",
        "quantityMeditionUnit": "4",
      },
      {
        "activity": "Rocerio",
        "activity_id": "2",
        "hours": "3",
        "quantityMeditionUnit": "3",
      },
      {
        "activity": "Rocerio",
        "activity_id": "3",
        "hours": "2",
        "quantityMeditionUnit": "6",
      },
      {
        "activity": "Ahoyado",
        "activity_id": "4",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Plantacion",
        "activity_id": "5",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Tutorado",
        "activity_id": "6",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Fertilizacion",
        "activity_id": "7",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Podas",
        "activity_id": "8",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Resiembra",
        "activity_id": "9",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Riego",
        "activity_id": "10",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
    ],
    "type": "2",
    "project_id": "779"
  },
  {
    "id": "9",
    "responsible": "Marlon",
    "assistant": "Pedro",
    "place": "Guayabetal",
    "date": "16-07-2019 09:33",
    "people": "5",
    "activities": [
      {
        "activity": "Riego",
        "activity_id": "1",
        "hours": "4",
        "quantityMeditionUnit": "4",
      },
      {
        "activity": "Rocerio",
        "activity_id": "2",
        "hours": "3",
        "quantityMeditionUnit": "3",
      },
      {
        "activity": "Rocerio",
        "activity_id": "3",
        "hours": "2",
        "quantityMeditionUnit": "6",
      },
      {
        "activity": "Ahoyado",
        "activity_id": "4",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Plantacion",
        "activity_id": "5",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Tutorado",
        "activity_id": "6",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Fertilizacion",
        "activity_id": "7",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Podas",
        "activity_id": "8",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Resiembra",
        "activity_id": "9",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
      {
        "activity": "Riego",
        "activity_id": "10",
        "hours": "2",
        "quantityMeditionUnit": "2",
      },
    ],
    "type": "2",
    "project_id": "779"
  },
];