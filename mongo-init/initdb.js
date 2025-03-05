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
        password: 'YWRtaW4=',
        email: 'erosbalint3@gmail.com',
        role: 'ADMIN'
    },
    {
        _id: 2,
        username: 'johndoe',
        password: 'dGVhY2hlcjEyMw==',     
        email: 'johndoe@example.com',
        role: 'TEACHER'
    },
    {
        _id: 3,
        username: 'janesmith',
        password: 'dGVhY2hwYXNzNDU2', 
        email: 'janesmith@example.com',
        role: 'TEACHER'
    },
    {
        _id: 4,
        username: 'robertbrown',
        password: 'bXlwYXNzd29yZA==', 
        email: 'robertbrown@example.com',
        role: 'TEACHER'
    },
    {
        _id: 5,
        username: 'emilywilliams',
        password: 'c2VjdXJlcGFzcw==', 
        email: 'emilywilliams@example.com',
        role: 'TEACHER'
    },
    {
        _id: 6,
        username: 'davidmiller',
        password: 'c3Ryb25ncGFzczc4OQ==', 
        email: 'davidmiller@example.com',
        role: 'TEACHER'
    }
])