# 🚀 Redis Worker System Design – LeetCode Problem Submission

A **system design prototype** that demonstrates how online judges like **LeetCode** handle problem submissions using **Redis queues and worker nodes**. This project focuses on **architecture, data flow, and queue-based processing**, not full code execution.

---

## 📌 Problem Statement

When a user submits a solution on platforms like LeetCode, the system must:

* Accept submissions at very high scale
* Queue them reliably
* Process them asynchronously
* Return results without blocking the user

This project models that workflow using **Redis + Worker Nodes**.

---

## 🧠 System Overview

**Key Idea:**

* API server receives submissions
* Submissions are pushed into a Redis queue
* Worker nodes consume submissions and process them

This ensures:

* High throughput
* Fault tolerance
* Horizontal scalability

---

## 🏗️ Architecture

```
Client (Postman / UI)
        |
        v
API Server (Node.js)
        |
        v
Redis Queue (LPUSH)
        |
        v
Worker Node(s)
        |
        v
Result / Logs
```

---

## 🧰 Tech Stack

* **Node.js** – API & worker implementation
* **Redis** – Message queue
* **Postman** – Submission testing
* **JavaScript** – Core logic

---

## 📂 Redis Data Design

### Queue Structure

* **Queue Name:** `problem_submissions`
* **Operation Used:**

  * `LPUSH` → Add submission to queue
  * `RPOP` → Worker consumes submission

### Example Payload

```json
{
  "userId": "123",
  "problemId": "two-sum",
  "language": "javascript",
  "code": "function twoSum() {}",
  "timestamp": 1730000000
}
```

---

## 🔁 Submission Flow

1. User submits solution (via Postman)
2. API server validates input
3. Submission pushed to Redis using `LPUSH`
4. Worker node continuously listens
5. Worker consumes job using `RPOP`
6. Submission is processed (simulated execution)
7. Logs / output generated

---

## 🧑‍💻 Worker Node Design

* Runs as an independent service
* Polls Redis queue
* Processes one submission at a time
* Can be scaled horizontally

**Why workers?**

* Decouples submission from execution
* Prevents API overload
* Enables parallel processing

---

## 🧪 Testing (Postman)

### Endpoint

```
POST /submit
```

### Sample Request Body

```json
{
  "userId": "101",
  "problemId": "valid-parentheses",
  "language": "js",
  "code": "function isValid() {}"
}
```

### Expected Behavior

* Request returns immediately
* Job appears in Redis queue
* Worker consumes and logs processing

---

## 📈 Scalability Considerations

* Add more worker nodes to handle load
* Use Redis Cluster for high availability
* Replace polling with `BRPOP` for efficiency
* Store results in DB (PostgreSQL / MongoDB)

---

## 🔐 Reliability & Improvements

Future enhancements:

* Retry mechanism for failed jobs
* Dead-letter queue
* Execution sandbox (Docker)
* Result storage & callback system
* Rate limiting submissions

---

## 🎯 Why This Design Matters

This architecture is used by:

* LeetCode
* Codeforces
* HackerRank
* Online code judges

Demonstrates understanding of:

* Distributed systems
* Message queues
* Backend scalability
* Real-world system design

---

## 🧑‍🚀 Status

✅ System design complete
✅ Redis queue implemented
✅ Worker node consuming jobs
⏳ Execution engine (out of scope)

---

## 📜 License

MIT License

---

⭐ If you like this system design, give the repo a star!
