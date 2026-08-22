# 🎬 VidMod

<div align="center">

![Status](https://img.shields.io/badge/Backend-99%25-success?style=for-the-badge)
![Status](https://img.shields.io/badge/Frontend-10%25-orange?style=for-the-badge)
![Status](https://img.shields.io/badge/Project-In%20Progress-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

### AI-Powered Video Hosting & Moderation Platform

*A production-oriented microservices application for secure video uploading, AI-powered moderation, and scalable content management.*

</div>

---

# 📖 Overview

**VidMod** is a scalable, production-ready video hosting platform built using a **microservices architecture**.

The project focuses on solving one of the biggest challenges in modern content platforms—**automatic moderation of uploaded videos**.

Whenever a user uploads a video, the system processes it asynchronously through RabbitMQ, extracts frames using FFmpeg, scans them using an AI moderation service, and only publishes approved videos to the platform.

The project has been built with scalability, reliability, and clean architecture as the primary goals.

---

# 🚧 Project Status

> **This project is actively under development.**

| Component | Progress |
|-----------|----------|
| Backend | **99% Complete** ✅ |
| Frontend | **10% Complete** 🚧 |
| Documentation | In Progress |
| Testing | Ongoing |
| Deployment | Planned |

---

# 📢 Note for Reviewers

The backend is almost entirely complete and contains the primary implementation of this project.

The frontend has recently entered development and currently contains the foundational structure only.

If you're reviewing this repository:

- Focus primarily on the backend implementation.
- The frontend will continue receiving updates.
- New commits will be pushed regularly.

⭐ **Please revisit the repository periodically to see new features and improvements.**

---

# ✨ Features

## Authentication

- User Registration
- User Login
- Secure JWT Authentication
- Refresh Tokens
- Protected Routes
- Password Hashing
- Email Verification (Planned)
- Forgot Password (Planned)

---

## Video Service

- Upload Videos
- Store Metadata
- Video Validation
- File Size Validation
- MIME Type Validation
- Thumbnail Support
- Video Streaming (Planned)

---

## AI Moderation

- Automatic NSFW Detection
- Frame Extraction using FFmpeg
- NudeNet AI Detection
- Reject Unsafe Videos
- Approve Safe Videos
- Async Processing

---

## Event Driven Architecture

- RabbitMQ Messaging
- Producer/Consumer Pattern
- Loose Coupling
- Reliable Processing

---

## Event Store

- Event Logging
- Upload Events
- Moderation Events
- Error Tracking
- Audit Logs

---

## Future Features

- Google Authentication
- Comments
- Likes
- Playlists
- Notifications
- Analytics Dashboard
- Video Recommendations
- Search
- User Profiles

---

# 🏗️ Architecture

```
                           React Frontend
                                 │
                                 │
                      Authentication Service
                                 │
                                 ▼
                         User Service (Node.js)
                                 │
               ┌─────────────────┼─────────────────┐
               │                 │                 │
               ▼                 ▼                 ▼
        Video Service     RabbitMQ Queue    Event Store
               │                 │                 │
               ▼                 ▼                 ▼
         MongoDB Database  AI Moderation      MongoDB
                                 │
                                 ▼
                        FastAPI + NudeNet
                                 │
                                 ▼
                         FFmpeg Frame Extraction
```

---

# 🧱 Microservices

## 👤 User Service

Responsible for

- Registration
- Login
- Authentication
- Authorization
- JWT
- Refresh Tokens

**Tech**

- Node.js
- Express
- TypeScript
- PostgreSQL
- Drizzle ORM

---

## 📹 Video Service

Responsible for

- Upload
- Metadata
- Storage
- Validation

**Tech**

- Node.js
- Express
- MongoDB
- Multer

---

## 🤖 Moderation Service

Responsible for

- Frame Extraction
- AI Detection
- Video Approval

**Tech**

- Python
- FastAPI
- NudeNet
- FFmpeg

---

## 📜 Event Store

Responsible for

- Logging
- Auditing
- Events

**Tech**

- Node.js
- MongoDB

---

# ⚙️ Tech Stack

## Backend

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- MongoDB
- RabbitMQ
- Docker
- FastAPI
- Python
- FFmpeg
- JWT
- Drizzle ORM
- Multer
- Redis
- Docker Compose

---

## Frontend

- React
- TypeScript
- TailwindCSS
- React Router
- React Hook Form
- Axios

---

# 📂 Project Structure

```
VidMod/

├── frontend/
│
├── backend/
│   ├── user-service/
│   ├── video-service/
│   ├── moderation-service/
│   ├── event-store/
│   ├── rabbitmq/
│   └── docker/
│
├── docs/
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/your-username/vidmod.git

cd vidmod
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file inside each service.

Example

```env
PORT=

DATABASE_URL=

JWT_SECRET=

RABBITMQ_URL=

MONGODB_URI=

REDIS_URL=
```

---

## Run with Docker

```bash
docker compose up --build
```

---

## Run Services Individually

```bash
npm run dev
```

---

# 🧪 Current Development Progress

## Backend

✅ User Authentication

✅ JWT

✅ Refresh Tokens

✅ RabbitMQ

✅ AI Moderation

✅ Event Store

✅ MongoDB

✅ PostgreSQL

✅ Docker Support

✅ FFmpeg Integration

🟡 Final Testing

🟡 Optimization

---

## Frontend

✅ Project Setup

✅ Routing

✅ Authentication Pages

🟡 Dashboard

🟡 Upload UI

🟡 Video Feed

🟡 Profile

🟡 Settings

---

# 🛣️ Roadmap

## Phase 1

- Authentication
- Upload Service
- AI Moderation
- Event Store

✅ Completed

---

## Phase 2

- Frontend Development
- Responsive UI
- Dashboard

🚧 In Progress

---

## Phase 3

- Video Streaming
- Comments
- Likes
- Search
- Analytics

📅 Planned

---

# 🤝 Contributing

Contributions are welcome.

If you'd like to contribute:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

# 📌 Repository Updates

This repository is actively maintained.

Expect:

- Frequent commits
- New features
- Bug fixes
- Performance improvements
- Better documentation

---

# 🙏 A Note to Reviewers

Thank you for taking the time to review **VidMod**.

The backend represents the primary focus of the project and is **approximately 99% complete**.

The frontend is **currently around 10% complete** and is being developed in parallel. Significant UI improvements and additional functionality will be added in upcoming commits.

If something appears unfinished on the frontend, it is expected at this stage of development.

⭐ **Please consider starring the repository if you find the project interesting, and check back later for future updates.**

---

# 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

### 🚀 Built with ❤️ using Node.js, TypeScript, Python, React & Microservices

**VidMod — Secure • Scalable • AI Powered**

</div>
