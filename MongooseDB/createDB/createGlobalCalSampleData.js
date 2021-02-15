db = db.getSiblingDB('globalCalendar')
db.createCollection('users')
usersCollection = db.getCollection("users")
usersCollection.remove({})
usersCollection.insert(
    {
        name: "Nick",
        userId: 1,
        timeZone: "USA/Chicago",
        startDate: "2021-02-01",
        endDate: null,
        isActive: true
    }
)

usersCollection.insert(
    {
        name: "Emma",
        userId: 2,
        timeZone: "Asia/Tokyo",
        startDate: "2020-01-01",
        endDate: null,
        isActive: true
    }
)
usersCollection.insert(
    {
        name: "Alex",
        userId: 3,
        timeZone: "USA/New_York",
        startDate: "2020-01-04",
        endDate: null,
        isActive: true
    }
)

usersCollection.insert(
    {
        name: "Justin",
        userId: 4,
        timeZone: "USA/Los_Angeles",
        startDate: "2021-02-11",
        endDate: null,
        isActive: true
    }
)
usersCollection.insert(
    {
        name: "Dr. H",
        userId: 5,
        timeZone: "USA/Los_Angeles",
        startDate: "2020-01-01",
        endDate: "2021-01-31",
        isActive: false
    }
)

db.createCollection('calendars')
calendarsCollection = db.getCollection("calendars")
calendarsCollection.remove({})
calendarsCollection.insert(
    {
        calendarId: 1,
        userId: 1,
        name: "Nick's Seattle U Classes",
        description: "For Seattle University Winter 2021 Quarter",
        events: [
            {
                eventId: 1
            },
            {
                eventId: 3
            }
        ]
    }
)
calendarsCollection.insert(
    {
        calendarId: 2,
        userId: 2,
        name: "Emma's Seattle U Classes",
        description: "For Seattle University Winter 2021 Quarter",
        events: [
            {
                eventId: 2
            },
            {
                eventId: 3
            }
        ]
    }
)
calendarsCollection.insert(
    {
        calendarId: 3,
        userId: 3,
        name: "Alex's Seattle U Classes",
        description: "For Seattle University Winter 2021 Quarter",
        events: [
            {
                eventId: 3
            },
            {
                eventId: 4
            }
        ]
    }
)
calendarsCollection.insert(
    {
        calendarId: 4,
        userId: 4,
        name: "Justin's Seattle U Classes",
        description: "For Seattle University Winter 2021 Quarter",
        events: [
            {
                eventId: 3
            },
            {
                eventId: 4
            }
        ]
    }
)

db.createCollection('events')
calendarsCollection = db.getCollection("events")
calendarsCollection.remove({})
calendarsCollection.insert(
    {
        eventId: 1,
        title: "Rocket Science Zoom Meeting",
        category: "Classes",
        description: "To the moon!",
        startDate: "2021-02-13",
        endDate: "2021-02-13",
        startTime: "13:00",
        endTime: "14:30"
    }
)
calendarsCollection.insert(
    {
        eventId: 2,
        title: "Capstone Zoom Meeting",
        category: "Classes",
        description: "",
        startDate: "2021-06-14",
        endDate: "2021-06-14",
        startTime: "11:00",
        endTime: "13:00"
    }
)
calendarsCollection.insert(
    {
        eventId: 3,
        title: "SaaS Zoom Meeting",
        category: "Classes",
        description: "Backend presentations",
        startDate: "2021-02-17",
        endDate: "2021-02-17",
        startTime: "18:00",
        endTime: "20:00"
    }
)
calendarsCollection.insert(
    {
        eventId: 4,
        title: "Group Project Meeting",
        category: "Classes",
        description: "Discuss backend via Discord",
        startDate: "2021-06-15",
        endDate: "2021-06-15",
        startTime: "14:00",
        endTime: "17:00"
    }
)


