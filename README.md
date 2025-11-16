# Fake Neptun

![CI/CD Pipeline](https://github.com/erosbalint3/FakeNeptun/workflows/CI/CD%20Pipeline/badge.svg)
![Monitoring](https://github.com/erosbalint3/FakeNeptun/workflows/Monitoring%20&%20Health%20Checks/badge.svg)
![Code Coverage](https://codecov.io/gh/erosbalint3/FakeNeptun/branch/main/graph/badge.svg)
![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=erosbalint3_FakeNeptun&metric=alert_status)
![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=erosbalint3_FakeNeptun&metric=security_rating)
![Maintainability](https://sonarcloud.io/api/project_badges/measure?project=erosbalint3_FakeNeptun&metric=sqale_rating)

This project is a **Fake Neptun** system built with Angular, ExpressJS, and MongoDB.

📖 **For complete CI/CD pipeline documentation, see [CI-CD-README.md](./CI-CD-README.md)**

## ✨ Technologies

- **Frontend**: Angular `23.9.0`  
- **Backend**: ExpressJS `^5.0.0`, NodeJS `23.9.0`  
- **Database**: MongoDB (dockerized with `docker-compose`)

---

## 📦 MongoDB Setup

The MongoDB instance is configured using `docker-compose.yml` located in the root directory.

The users for the application, can be found in the users table. The Teachers and Admin have been pre setup.

### Connection details

| Parameter      | Value        |
|---------------|--------------|
| Host         | `localhost`  |
| Port        | `27017`      |
| Username     | `progr`      |
| Password     | `progr`      |
| Database Name| `fakeNeptun` |

You can connect and browse the database using tools like **MongoDB Compass**.

---

## 🌍 Frontend

- **Host**: `localhost`  
- **Port**: `4200`

---

## 🔧 Backend

- **Host**: `localhost`  
- **Port**: `3000`

---

## 🚀 Startup Instructions

1. **Start MongoDB**  
   From the project root directory, run:

   docker-compose up

2. **Start Frontend Application**
    From the frontend root directory, run:

    npm install -f
    
    npm start

3. **Start Backend Application**
    From the backend root directory, run:

    npm install -f

    npm start

