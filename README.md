# Welcome to My GitHub Profile

<div align="center">

### Gaurav Singh Yadav
**Java Backend & Full Stack Developer**

</div>

---

## 👋 About Me

Hi, I'm **Gaurav Singh Yadav**, a software developer focused on building reliable backend systems and full-stack applications. I work primarily with **Java, Spring Boot, Microservices and React.js**, and enjoy designing REST APIs, integrating databases, implementing application security and solving engineering problems.

---

## 🚆 Railway Management System

A full-stack railway reservation application built with a **Spring Boot microservices backend** and a **React frontend**. The system brings together train discovery, reservations, payment processing and administrative operations through independently running services.

[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=flat-square&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.x-6DB33F?style=flat-square&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Spring Cloud](https://img.shields.io/badge/Spring_Cloud-2023.0.x-6DB33F?style=flat-square&logo=spring&logoColor=white)](https://spring.io/projects/spring-cloud)

### Key Features

- **Train discovery:** Search and browse available trains and view train details.
- **Reservation management:** Create reservations and view booking details and booking history.
- **User accounts:** Registration, login, profile management and protected user routes.
- **Role-based administration:** Admin dashboard to manage trains, users and bookings.
- **Payment processing:** Razorpay checkout integration with backend payment verification; a mock payment flow is available for development.
- **API documentation:** OpenAPI/Swagger UI configuration for backend services.

### Architecture

The backend is split into six Spring Boot applications:

| Service | Responsibility |
|---|---|
| **API Gateway** | Entry point for frontend requests and routing to backend services |
| **Eureka Server** | Service registration and discovery |
| **User Service** | User registration, authentication and profile operations |
| **Train Info Service** | Train information and train operations |
| **Reservation Service** | Reservation and booking workflows |
| **Payment Service** | Payment processing and payment status |
| **Admin Service** | Administrative operations |

Backend services use **Eureka** for discovery and **OpenFeign** for service-to-service communication. The API Gateway uses Spring Cloud Gateway and includes JWT and role-related filters.

### Technology Stack

**Backend**

![Java](https://img.shields.io/badge/Java_17-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=flat-square&logo=springsecurity&logoColor=white)
![Spring Cloud Gateway](https://img.shields.io/badge/Spring_Cloud_Gateway-6DB33F?style=flat-square&logo=spring&logoColor=white)
![Eureka](https://img.shields.io/badge/Eureka-6DB33F?style=flat-square&logo=spring&logoColor=white)
![OpenFeign](https://img.shields.io/badge/OpenFeign-6DB33F?style=flat-square&logo=spring&logoColor=white)
![Hibernate](https://img.shields.io/badge/Hibernate-59666C?style=flat-square&logo=hibernate&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

**Frontend**

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Material UI](https://img.shields.io/badge/Material_UI-007FFF?style=flat-square&logo=mui&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)

**Database & Developer Tools**

![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=flat-square&logo=apachemaven&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=postman&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)

### Repository Structure

```text
railway-management-sys/
├── backend/
│   ├── ApiGateway/
│   ├── eurekaserver/
│   ├── user-service/
│   ├── traininfo/
│   ├── reservation/
│   ├── payment/
│   └── admin-service/
└── railway-frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── features/
    │   ├── layouts/
    │   ├── pages/
    │   └── router/
    └── package.json
```

### Getting Started

#### Prerequisites

- Java 17
- Maven (or the included Maven Wrapper in each backend service)
- Node.js and npm
- MySQL

#### 1. Clone the repository

```bash
git clone https://github.com/pseudocode21/railway-management-sys.git
cd railway-management-sys
```

#### 2. Configure the database and environment

Make sure MySQL is running. The backend services use separate databases: `users`, `traininfo`, `reservation`, `payment` and `admins`. Their default JDBC URLs create the database if it does not already exist.

Configure credentials and secrets using environment variables or the optional local properties file supported by each service. At minimum, configure:

- `DB_USERNAME` – MySQL username
- `DB_PASSWORD` – MySQL password
- `JWT_SECRET` – JWT signing secret (use a strong secret; do not commit it)

For the frontend, create `railway-frontend/.env` and configure:

```env
VITE_API_BASE_URL=http://localhost:8086
VITE_RAZORPAY_KEY=your_razorpay_test_key
VITE_ENABLE_MOCK_SERVICES=true
```

Use Razorpay test credentials for local testing. Never commit real credentials or secrets.

#### 3. Start the backend services

Run each Spring Boot application from its own directory. Start the services in this order:

1. Eureka Server (`backend/eurekaserver`, port `8761`)
2. User Service (port `8081`)
3. Admin Service (port `8082`)
4. Train Info Service (port `8083`)
5. Reservation Service (port `8084`)
6. Payment Service (port `8085`)
7. API Gateway (port `8086`)

From each service directory, run:

```bash
./mvnw spring-boot:run
```

On Windows, use:

```powershell
mvnw.cmd spring-boot:run
```

#### 4. Start the frontend

```bash
cd railway-frontend
npm install
npm run dev
```

Vite will print the local development URL in the terminal.

### API Documentation

The backend services include SpringDoc OpenAPI configuration. The API Gateway is configured to aggregate service API documentation. Once the services and gateway are running, open:

`http://localhost:8086/swagger-ui.html`

---

## 📫 Connect

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/thisisgauravyadav)
[![GitHub](https://img.shields.io/badge/GitHub-pseudocode21-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/pseudocode21)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:singhgaurav.y@gmail.com)

---

<div align="center">

**Built with Java, Spring Boot and React.**

</div>
