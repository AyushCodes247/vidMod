# VidMod - High Level Design (HLD)

This document contains the High Level Design (HLD) diagrams for the VidMod distributed video hosting platform.

---

# 1. Overall System Architecture

```mermaid
flowchart LR

Client[Client]

Gateway[API Gateway]

User[User Service<br/>Node.js + PostgreSQL]

Video[Video Service<br/>Node.js + MongoDB]

Moderation[Moderation Service<br/>Python]

EventStore[Event Store Service<br/>Node.js + MongoDB]

RabbitMQ[RabbitMQ]

Redis[(Redis)]

Storage[(Object Storage)]

Client --> Gateway

Gateway --> User
Gateway --> Video

User --> RabbitMQ
Video --> RabbitMQ
Moderation --> RabbitMQ

RabbitMQ --> EventStore

Video --> Storage

Video --> RabbitMQ
RabbitMQ --> Moderation

User --> Redis
Video --> Redis
```

---

# 2. User Service

```mermaid
flowchart TD

Gateway --> Auth

Auth --> Register
Auth --> Login
Auth --> Logout
Auth --> Refresh
Auth --> Profile
Auth --> Update

Register --> Controller1
Login --> Controller2
Logout --> Controller3
Refresh --> Controller4
Profile --> Controller5
Update --> Controller6

Controller1 --> Service
Controller2 --> Service
Controller3 --> Service
Controller4 --> Service
Controller5 --> Service
Controller6 --> Service

Service --> PostgreSQL

Service --> RabbitMQ

RabbitMQ --> EventStore
```

---

# 3. Video Service

```mermaid
flowchart TD

Gateway --> Upload
Gateway --> Delete
Gateway --> Playback

Upload --> Auth

Delete --> Auth

Playback --> ControllerPlayback

Auth --> UploadController
Auth --> DeleteController

UploadController --> VideoService

DeleteController --> VideoService

ControllerPlayback --> VideoService

VideoService --> ObjectStorage

VideoService --> MongoDB

VideoService --> RabbitMQ

RabbitMQ --> Moderation

Moderation --> RabbitMQ

RabbitMQ --> EventStore
```

---

# 4. Moderation Service

```mermaid
flowchart TD

RabbitMQ --> Consumer

Consumer --> DownloadVideo

DownloadVideo --> FFmpeg

FFmpeg --> FrameSampler

FrameSampler --> NudeNet

NudeNet --> Aggregator

Aggregator --> DecisionEngine

DecisionEngine --> Safe

DecisionEngine --> Blocked

Safe --> RabbitMQ

Blocked --> RabbitMQ

RabbitMQ --> EventStore
```

---

# 5. Event Store Service

```mermaid
flowchart TD

RabbitMQ --> Consumer

Consumer --> Validation

Validation --> Metadata

Metadata --> MongoDB

MongoDB --> Replay

Replay --> Projection
```

---

# 6. Event Flow

```mermaid
flowchart LR

UserService --> RabbitMQ

VideoService --> RabbitMQ

ModerationService --> RabbitMQ

RabbitMQ --> EventStore

EventStore --> EventDatabase
```

---

# 7. Upload Pipeline

```mermaid
flowchart LR

Client

--> API

--> Upload

--> ObjectStorage

--> RabbitMQ

--> Moderation

--> RabbitMQ

--> VideoService

--> PlaybackReady
```

---

# 8. Authentication Flow

```mermaid
flowchart LR

Client

--> API Gateway

--> User Service

--> PostgreSQL

User Service

--> RabbitMQ

RabbitMQ

--> Event Store
```

---

# 9. Moderation Pipeline

```mermaid
flowchart LR

VideoUploaded

--> RabbitMQ

--> Consumer

--> Download

--> FFmpeg

--> Sample Frames

--> NudeNet

--> Aggregate

--> Decision

Decision

--> Safe

Decision

--> Blocked

Safe --> RabbitMQ

Blocked --> RabbitMQ
```

---

# 10. Service Communication

```mermaid
flowchart LR

Gateway

--> User

Gateway

--> Video

Video

--> RabbitMQ

RabbitMQ

--> Moderation

RabbitMQ

--> EventStore
```

---

# Legend

| Component | Description |
|-----------|-------------|
| API Gateway | Entry point for all client requests |
| User Service | Authentication & User Management |
| Video Service | Upload, Playback, Metadata |
| Moderation Service | AI-powered NSFW Detection |
| Event Store | Immutable Event Sourcing Database |
| RabbitMQ | Asynchronous Message Broker |
| Redis | Cache & Rate Limiting |
| PostgreSQL | User Database |
| MongoDB | Video Metadata & Event Store |
| Object Storage | Video File Storage (S3 / MinIO) |
