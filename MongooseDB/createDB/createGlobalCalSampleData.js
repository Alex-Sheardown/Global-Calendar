db = db.getSiblingDB('globalCalendar')
db.createCollection('users')
usersCollection = db.getCollection("users")
usersCollection.remove({})
usersCollection.insert(
    {
        name: "Nick",
        userId: 1,
        timeZone: "USA/Los_Angeles",
        startDate: "2020-01-01",
        endDate: "2021-01-31",
        isActive: false
    }
)
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
        calendarId: 3,
        userId: 2,
        name: "Emma's Seattle U Classes",
        description: "For Seattle University Winter 2021 Quarter",
        events: [
            {
                eventId: 2
            }
        ]
    }
)
calendarsCollection.insert(
    {
        calendarId: 2,
        userId: 3,
        name: "Alex's Seattle U Classes",
        description: "For Seattle University Winter 2021 Quarter",
        events: [
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
        eventId: 1
    }
)
calendarsCollection.insert(
    {
        eventId: 2
    }
)
calendarsCollection.insert(
    {
        eventId: 3
    }
)
calendarsCollection.insert(
    {
        eventId: 4
    }
)


