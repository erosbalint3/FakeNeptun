db = db.getSiblingDB('fakeNeptun')

db.createCollection('users')
db.createCollection('courses')
db.createCollection('courseCalendar')
db.createCollection('participation')
db.createCollection('courseEnrollment')

db.users.insertMany([
    {
        _id: 1,
        username: 'admin',
        name: 'Admin',
        password: 'YWRtaW4=',
        email: 'erosbalint3@gmail.com',
        role: 'ADMIN',
        telephone: '+36201234567'
    },
    {
        _id: 2,
        username: 'johndoe',
        name: 'John Doe',
        password: 'dGVhY2hlcjEyMw==',     
        email: 'johndoe@example.com',
        role: 'TEACHER',
        telephone: '+36123456784'
    },
    {
        _id: 3,
        username: 'janesmith',
        name: 'Jane Smith',
        password: 'dGVhY2hwYXNzNDU2', 
        email: 'janesmith@example.com',
        role: 'TEACHER',
        telephone: '+36876543212'
    },
    {
        _id: 4,
        username: 'robertbrown',
        name: 'Robert Brown',
        password: 'bXlwYXNzd29yZA==', 
        email: 'robertbrown@example.com',
        role: 'TEACHER',
        telephone: '+3812345678'
    },
    {
        _id: 5,
        username: 'emilywilliams',
        name: 'Emily Williams',
        password: 'c2VjdXJlcGFzcw==', 
        email: 'emilywilliams@example.com',
        role: 'TEACHER',
        telephone: '+365567889875'
    },
    {
        _id: 6,
        username: 'davidmiller',
        name: 'David Miller',
        password: 'c3Ryb25ncGFzczc4OQ==', 
        email: 'davidmiller@example.com',
        role: 'TEACHER',
        telephone: '+345345345345'
    }
])