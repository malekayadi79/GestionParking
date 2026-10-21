# 🅿️ Gestion Parking — Smart Parking Reservation API

REST API for managing parkings, parking spots and time-slot reservations, built with **Spring Boot** and **MongoDB**, containerized and ready for **Kubernetes**.
It is the parking module of a larger cloud-based attraction park management platform.

![CI](https://github.com/malekayadi79/GestionParking/actions/workflows/ci.yml/badge.svg)
![Java](https://img.shields.io/badge/Java-17-ED8B00?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4-6DB33F?logo=springboot&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-manifests-326CE5?logo=kubernetes&logoColor=white)

## Features

- **Parkings** by vehicle type (`VOITURE`, `MOTO`, `CAMION`, `BUS`, `VOITURE_HANDICAPE`), with promotional pricing periods and event parkings
- **Spots** with live status (`LIBRE`, `RESERVE`, `MAINTENANCE`) and "available spots per parking" query
- **Reservations** with:
  - **overlap detection** — a spot cannot be booked twice for intersecting time slots
  - **automatic price calculation** from entry/exit time (minimum 1 hour)
  - a unique **QR-code token** generated per reservation
  - lookup by spot or by **licence plate**
- **Soft delete** (`isDeleted`) and audit timestamps on every document
- **OpenAPI / Swagger UI** documentation
- Startup **database connectivity check** that logs the available collections

## Architecture

```mermaid
flowchart LR
    client[Client / Frontend] -->|REST| api
    subgraph api[Spring Boot API]
        c[Controllers] --> s[Services<br/>business rules] --> r[Spring Data<br/>repositories]
    end
    r --> db[(MongoDB<br/>parking · spots · reservation)]
```

```mermaid
erDiagram
    PARKING ||--o{ SPOT : contains
    SPOT ||--o{ RESERVATION : "is booked by"
    PARKING {
        string nom
        TypeParking typeParking
        double prixInitial
        double prixPromos
        boolean isEvent
    }
    SPOT {
        string nom
        StatutSpot statut
    }
    RESERVATION {
        string matricule
        datetime datetimeEntree
        datetime datetimeSortie
        double montant
        string qrCode
    }
```

## API

| Method | Endpoint | Description |
|---|---|---|
| GET / POST | `/api/parkings` | List / create parkings |
| GET / PUT / DELETE | `/api/parkings/{id}` | Read / update / soft-delete a parking |
| GET | `/api/parkings/promotions` | Parkings with an active promotion |
| GET / POST | `/api/spots` | List / create spots |
| GET / PUT / DELETE | `/api/spots/{id}` | Read / update / delete a spot |
| PATCH | `/api/spots/{id}/status` | Change a spot's status |
| GET | `/api/spots/parking/{parkingId}` | Spots of a parking |
| GET | `/api/spots/parking/{parkingId}/available` | Free spots of a parking |
| GET / POST | `/api/reservations` | List / create reservations (conflict check + pricing) |
| GET / DELETE | `/api/reservations/{id}` | Read / cancel a reservation |
| GET | `/api/reservations/spot/{spotId}` | Reservations of a spot |
| GET | `/api/reservations/vehicle/{matricule}` | Reservations of a vehicle |

Interactive documentation: **http://localhost:8080/swagger-ui.html**

## Run it

### With Docker Compose (recommended)

```bash
docker compose up -d --build                    # API + MongoDB
docker compose --profile debug up -d            # + Mongo Express on :8081
```

### On Kubernetes

```bash
kubectl apply -f k8s/mongo.yaml    # MongoDB StatefulSet + persistent volume
kubectl apply -f k8s/api.yaml      # API Deployment (2 replicas, rolling update) + Service
kubectl port-forward svc/parking-api 8080:80
```

### Locally

```bash
docker run -d -p 27017:27017 mongo:7
./mvnw spring-boot:run
```

## CI

GitHub Actions builds and tests the project against a real MongoDB service container, builds the Docker image and scans it with **Trivy** (pipeline fails on fixable HIGH/CRITICAL vulnerabilities).

## Tech stack

Java 17 · Spring Boot 4 · Spring Data MongoDB · Lombok · springdoc-openapi · Maven · Docker (multi-stage, non-root) · Docker Compose · Kubernetes · GitHub Actions · Trivy

---
**Malek Ayadi** · [LinkedIn](https://www.linkedin.com/in/malek-ayadi) · [GitHub](https://github.com/malekayadi79)
