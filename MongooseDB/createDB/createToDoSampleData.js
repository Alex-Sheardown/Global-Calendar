db = db.getSiblingDB('globalCalendar')
db.createCollection('users')
usersCollection = db.getCollection("users")
usersCollection.remove({})
usersCollection.insert(
    {
        name: "Nick",
        userID: 1,
        timeZone: "USA/Los_Angeles",
        startDate: "2020-01-01",
        endDate: "2021-01-31",
        isActive: false

    }
)
usersCollection.insert(
    {
        name: "Nick",
        userID: 1,
        timeZone: "USA/Los_Angeles",
        startDate: "2021-02-01",
        endDate: null,
        isActive: true
    }
)
usersCollection.insert(
    {
        name: "Emma",
        userID: 2,
        timeZone: "Asia/Tokyo",
        startDate: "2020-01-01",
        endDate: null,
        isActive: true

    }
)
usersCollection.insert(
    {
        name: "Alex",
        userID: 3,
        timeZone: "USA/New_York",
        startDate: "2020-01-01",
        endDate: null,
        isActive: true

    }
)

db.createCollection('tasks')
tasksCollection = db.getCollection("tasks")
tasksCollection.remove({})
tasksCollection.insert(
    {
        listId: 1,
        tasks: [
            {
                description: "Pick up 2 cans of tomato",
                taskId: 1,
                shared: "N",
                status: "I"
            },
            {
                description: "Pick up 2 onions",
                taskId: 2,
                shared: "N",
                status: "I"
            },
            {
                description: "Pick up 1 box of spagetti",
                taskId: 3,
                shared: "N",
                status: "I"
            },
            {
                description: "Pick up 1 (3 litter) Coke",
                taskId: 4,
                shared: "N",
                status: "I"
            },
            {
                description: "Cook recipe http://recipe.com/spagetti",
                taskId: 5,
                shared: "wife",
                status: "I"
            }
        ]
    }
)
tasksCollection.insert(
    {
        listId: 2,
        tasks: [
            {
                description: "Test drive a Porsche Boxter",
                taskId: 1,
                shared: "N",
                status: "I"
            },
            {
                description: "To be gas consious, test drive a Tesla",
                taskId: 2,
                shared: "N",
                status: "I"
            },
            {
                description: "Ask your friend to give you a ride in his Lotus",
                taskId: 3,
                shared: "N",
                status: "I"
            },
            {
                description: "Ask to barrow the Mustang from my mom :-)",
                taskId: 4,
                shared: "N",
                status: "I"
            },
            {
                description: "Rent a Corvette",
                taskId: 5,
                shared: "N",
                status: "I"
            }
        ]
    }
)
tasksCollection.insert(
    {
        listId: 3,
        tasks: [
            {
                description: "Pick drawing boards from friend",
                taskId: 1,
                shared: "N",
                status: "I"
            },
            {
                description: "Buy pencils, pens, and notebooks from Staples",
                taskId: 2,
                shared: "N",
                status: "I"
            },
            {
                description: "Go to the MS Store to buy a new Surface 3",
                taskId: 3,
                shared: "N",
                status: "I"
            },
            {
                description: "Pick up a printer at Frys",
                taskId: 4,
                shared: "N",
                status: "I"
            },
            {
                description: "Get a couple of XBox Games to relax",
                taskId: 5,
                shared: "N",
                status: "I"
            }
        ]
    }
)
