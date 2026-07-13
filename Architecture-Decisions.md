## ADR-001

Decision

Microservice Architecture

Reason

Independent scalability of Authentication, Video, Moderation and Event Store.

---

## ADR-002

Decision

RabbitMQ

Reason

Reliable asynchronous communication and retry support.

---

## ADR-003

Decision

MongoDB for Video

Reason

Flexible metadata schema and high write throughput.

---

## ADR-004

Decision

PostgreSQL for User Service

Reason

Strong ACID guarantees for authentication and user management.

---

## ADR-005

Decision

Event Sourcing

Reason

Complete audit trail, replay capability, debugging, and immutable history.

---

## ADR-006

Decision

Python Moderation Service

Reason

Access to mature AI/ML libraries and efficient ONNX inference.