export const pets = [
    {
        name:'Valid pet',
        pet: {
            "id": Date.now(),
            "category": {
                "id": 1563,
                "name": "cat"
            },
            "name": "Puffy",
            "photoUrls": [
                "string"
            ],
            "tags": [
                {
                    "id": 1708,
                    "name": "black"
                }
            ],
            "status": "available"
        },
        status: 200
    },
    {
        name:'Invalid pet',
        pet: undefined,
        status: 415
    }

]