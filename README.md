
# 🔗 URL Shortener – Full Stack DevOps Project

A complete full-stack URL Shortener application using **React**, **Node.js**, **MongoDB**, **Docker**, and **AWS EC2**. This guide includes all steps from setting up your local environment to deploying the app live using **Git Bash on Windows**.

---

## 📦 Tech Stack

| Layer        | Tech              |
|--------------|-------------------|
| Frontend     | React             |
| Backend      | Node.js + Express |
| Database     | MongoDB           |
| DevOps       | Docker, Docker Compose |
| Deployment   | AWS EC2 (Ubuntu 22.04) |
| Terminal     | Git Bash (Windows) |

---

## 📁 Project Structure

```
url-shortener/
├── backend/
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
├── front_end/
│   ├── Dockerfile
│   └── React source files
├── docker-compose.yml
└── README.md
```

---

## 🚀 Phase 1: Set Up Project Locally

### 1. Clone or Initialize

```bash
git clone https://github.com/yourname/url-shortener.git
cd url-shortener
```

### 2. File Structure

Place your frontend in `front_end/` and backend in `backend/`.

---

## 🐳 Phase 2: Dockerize the App

### 1. Dockerfile for Backend

`backend/Dockerfile`:
```Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]
```

### 2. Dockerfile for Frontend

`front_end/Dockerfile`:
```Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### 3. Docker Compose File

`docker-compose.yml`:
```yaml
version: '3.8'

services:
  mongo:
    image: mongo
    container_name: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  backend:
    build: ./backend
    container_name: backend
    ports:
      - "5000:5000"
    depends_on:
      - mongo
    environment:
      - MONGO_URL=mongodb://mongo:27017/urlshortener

  frontend:
    build:
      context: ./front_end
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  mongo_data:
```

---

## 🧪 Phase 3: Test Locally

```bash
cd url-shortener
sudo docker-compose up --build -d
```

Visit:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

---

## ☁️ Phase 4: Deploy on AWS EC2

### 1. Launch EC2 Instance

- OS: Ubuntu 22.04 LTS
- Create or select a key pair (`.pem` file)
- **Security Group - Inbound Rules**:
  - TCP 22 – SSH
  - TCP 3000 – Frontend
  - TCP 5000 – Backend

### 2. SSH from Git Bash

```bash
chmod 400 /d/keypairs/url_key.pem
ssh -i /d/keypairs/url_key.pem ubuntu@<your-public-ip>
```

---

## 📤 Phase 5: Copy Code to EC2

On **Git Bash**:

```bash
scp -i /d/keypairs/url_key.pem -r /d/url-shortener ubuntu@<your-public-ip>:~/
```

> 🔥 If `.git/objects` give permission errors, remove `.git` before copying:
```bash
rm -rf .git
```

---

## 🛠️ Phase 6: Build and Run on EC2

SSH into EC2:

```bash
ssh -i /d/keypairs/url_key.pem ubuntu@<your-public-ip>
cd ~/url-shortener
sudo docker-compose up --build -d
```

---

## 🌐 Access Deployed App

- Frontend: `http://<your-ec2-ip>:3000`
- Backend: `http://<your-ec2-ip>:5000`

---

## ⚠️ Troubleshooting

### ❌ "Permission Denied" during `scp`

Delete `.git` before uploading:

```bash
rm -rf .git
```

---

### ❌ Frontend not loading?

Check if port `3000` is open in the **EC2 Security Group**.

---

### ❌ Network Error from Frontend

Update `axios` base URL in `App.js`:

```js
const response = await axios.post("http://<your-ec2-ip>:5000/shorten", { longUrl: url });
```

---

## 🧼 Optional Clean-Up

```bash
sudo docker-compose down
```

---

## 📜 License

MIT © 2025 Manoj Kumar
