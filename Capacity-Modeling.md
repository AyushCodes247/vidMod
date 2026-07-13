# Capacity Modeling

# User Estimation

Registered Users

1,000,000

Daily Active Users

25%

250,000

Concurrent Users

20%

50,000

---

# Upload Estimation

Average Uploads Per Day

10,000

Average Video Size

2GB

Maximum Video Size

5GB

Daily Storage

20TB

---

# Read Traffic

Playback Requests

150,000/day

Peak Playback

5,000/sec

---

# Write Traffic

User Requests

20,000/day

Video Upload Requests

10,000/day

Moderation Reports

10,000/day

---

# Event Estimation

Average Events Per User Login

4

Average Events Per Upload

8

Average Events Per Moderation

5

Estimated Events Per Day

150,000+

---

# Database

PostgreSQL

Authentication

MongoDB

Video Metadata

MongoDB

Event Store

---

# Cache

Redis

Sessions

Playback Metadata

Rate Limiting

---

# Message Queue

RabbitMQ

Upload Queue

Moderation Queue

Notification Queue

Retry Queue

Dead Letter Queue

---

# Storage

Object Storage

Amazon S3 / MinIO

Estimated Initial Storage

20TB

Annual Growth

7PB (depending on upload assumptions)

---

# Performance Goals

Authentication

<200ms

Playback Metadata

<200ms

Moderation

<2s

Upload Initialization

<200ms