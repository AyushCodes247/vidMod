# Requirements

# Functional Requirements

## Authentication

- User Registration
- Login
- Logout
- Refresh Token
- Google OAuth
- Profile Management

---

## Video

- Upload Video
- Delete Video
- Playback
- Metadata Management
- Video Publishing

---

## Moderation

- Extract Frames
- NSFW Detection
- Generate Moderation Report
- Block Unsafe Videos

---

## Event Store

- Store Every Domain Event
- Store Business Failures
- Store Infrastructure Errors
- Replay Events
- Audit Trail

---

# Non Functional Requirements

## Performance

User APIs

- < 200ms

Moderation

- < 2 seconds

---

## Scalability

- 1 Million Users
- 250K Daily Active Users
- 50K Concurrent Users

---

## Security

- JWT Authentication
- OAuth
- HTTPS
- ACID Transactions
- Event Integrity

---

## Reliability

- Event Sourcing
- Retry Mechanism
- Dead Letter Queue
- RabbitMQ

---

## Maintainability

- Microservices
- Independent Deployment
- Loose Coupling

---

## Availability

Target

98.9%

---

## Responsiveness

Desktop

Tablet

Mobile

---

## Observability

Structured Logs

Metrics

Audit Events

Tracing