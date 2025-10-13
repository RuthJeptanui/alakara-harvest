# Alakara Harvest

A scalable and maintainable MERN stack app using MongoDB, Express, React (Vite), and Node.js — containerized with Docker for easy development and deployment.

# 📁 Project Structure
```
alakara-harvest/
│
├── client/                 # React frontend (Vite + Tailwind)
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                 # Node.js + Express backend
│   ├── app.js / server.js
│   ├── package.json
│   ├── .env
│   └── models/
│
├── shared/ (optional)      # Shared code (types, utils)
│
├── docker-compose.yml
├── Dockerfile.client
├── Dockerfile.server
└── README.md
```

# ⚙️ Setup Instructions

## 1️⃣ Backend Setup (`server/`)

```bash
cd server
npm init -y
npm install express mongoose dotenv cors
npm install --save-dev nodemon
```

**Example `server.js`:**
```js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

    dotenv.config();
    const app = express();
    app.use(cors());
    app.use(express.json());

    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("✅ MongoDB connected"))
        .catch(err => console.error("❌ MongoDB connection error:", err));

    app.get("/", (req, res) => res.send("Backend running..."));
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
    ```

**Example `.env`:**
```
MONGO_URI=mongodb://mongo:27017/alakara-harvest
PORT=5000
```

---

## 2️⃣ Frontend Setup (`client/`)

```bash
cd ../client
npm create vite@latest . -- --template react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Update `tailwind.config.js`:**
```js
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: { extend: {} },
    plugins: [],
};
```

**Add Tailwind to `src/index.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Run the frontend locally:**
```bash
npm run dev
```

---

## 3️⃣ Root Setup (Optional: Run Both Concurrently)

At the project root:

```bash
npm init -y
npm install concurrently
```

**In root `package.json`:**
```json
{
    "scripts": {
        "dev": "concurrently \"npm run dev --prefix server\" \"npm run dev --prefix client\""
    }
}
```



# 🐳 Docker Setup

Containerize the entire stack for one-command startup.

# 🧩 Dockerfile.server (Backend)
FROM node:20-alpine
WORKDIR /app

COPY server/package*.json ./
RUN npm install

COPY server/ .
EXPOSE 5000
CMD ["npm", "run", "dev"]

# 🧩 Dockerfile.client (Frontend)
FROM node:20-alpine
WORKDIR /app

COPY client/package*.json ./
RUN npm install

COPY client/ .
RUN npm run build

EXPOSE 5173
CMD ["npm", "run", "dev"]

# 🧩 docker-compose.yml
```yaml
version: "3.9"

services:
    mongo:
        image: mongo:7
        container_name: alakara-mongo
        restart: always
        ports:
            - "27017:27017"
        volumes:
            - mongo-data:/data/db

    server:
        build:
            context: .
            dockerfile: Dockerfile.server
        container_name: alakara-server
        restart: always
        env_file: ./server/.env
        ports:
            - "5000:5000"
        depends_on:
            - mongo
        volumes:
            - ./server:/app
            - /app/node_modules

    client:
        build:
            context: .
            dockerfile: Dockerfile.client
        container_name: alakara-client
        ports:
            - "5173:5173"
        depends_on:
            - server
        volumes:
            - ./client:/app
            - /app/node_modules

volumes:
    mongo-data:
```

# 🚀 Running the App with Docker

## From the project root, run:

docker-compose up --build


# Access:

- Frontend: http://localhost:5173

- Backend: http://localhost:5000

- MongoDB: runs internally as mongo

# Stop everything:

docker-compose down

## 🧰 Useful Commands
## 🧰 Useful Commands

| Task                        | Command                           |
|-----------------------------|-----------------------------------|
| Run both locally            | `npm run dev`                     |
| Build Docker images         | `docker-compose build`            |
| Start containers            | `docker-compose up`               |
| Stop containers             | `docker-compose down`             |
| Remove all unused images    | `docker system prune -a`          |

---

## 🧱 Future Improvements

- Add `shared/` folder for reusable logic or TypeScript types
- Integrate NGINX as a reverse proxy
- Add CI/CD pipeline (GitHub Actions)
- Deploy with AWS ECS, Render, or Vercel + Railway combo

# 👩🏽‍💻 Author

- Ruth Jeptanui
- Frontend Engineer | System Designer
- Building scalable and modern applications in MERN + Docker.