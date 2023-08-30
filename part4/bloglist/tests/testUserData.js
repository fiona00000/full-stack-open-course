const initialUsers = [
    {
        "username": "mluukkai",
        "name": "Matti Luukkainen",
        "password": "salainen"
    },
    {
        "username": "user2",
        "name": "Dummy User 2",
        "password": "dummyUser"
    }
]

const shortUserName = {
    username: 'a',
    name: 'Superuser',
    password: 'salainen',
}

const shortPassword = {
    username: 'root',
    name: 'Superuser',
    password: 'a',
}

module.exports = { initialUsers, shortUserName, shortPassword }