# Problem Statement

## Introduction

VidMod (Video + Moderation) is a distributed video hosting platform designed to provide secure, scalable, and intelligent video management with integrated AI-powered content moderation.

The project addresses several challenges observed in modern video hosting platforms, including inconsistent moderation quality, delayed content review, increasing amounts of inappropriate content, and the architectural limitations of monolithic systems when processing large media files.

---

## Problem

Current video hosting platforms face several technical and operational challenges:

- Growing amount of NSFW and harmful content
- Moderation pipelines that cannot keep up with upload volume
- High latency during video processing
- Large video files (4GB–5GB) requiring efficient storage and streaming
- Difficulty scaling monolithic architectures
- Limited auditing and traceability of user and system actions

---

## Proposed Solution

VidMod provides:

- Distributed microservice architecture
- Event-driven communication
- AI-powered frame moderation
- Immutable Event Store
- Secure authentication
- High-performance video playback
- Independent service scalability

---

## Objectives

- Upload videos up to 5GB
- Moderate uploaded videos automatically
- Reject unsafe content before publishing
- Generate playback links
- Maintain complete audit history
- Support high concurrent uploads
- Provide secure authentication