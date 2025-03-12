# Test task

This repository contains both the **client** (frontend) and **server** (backend) of the project.

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- **Node.js** (Latest LTS version recommended)
- **yarn** or **npm**

## 📂 Project Structure
```
root/
│── client/      # Frontend (Next.js)
│── server/      # Backend (Nest.js)
│── README.md    # Documentation
```

## 🖥️ Client Setup (Next.js)

### Navigate to the client folder:
```sh
cd client
```

### Install dependencies:
```sh
yarn install
```

### Start the client:
```sh
yarn run dev
```

The client runs on `http://localhost:3000` by default.

## 🖥️ Server Setup (Nest.js)

### Navigate to the server folder:
```sh
cd server
```

### Install dependencies:
```sh
yarn install
```

### Start the server:
```sh
yarn run start:dev
```

The server runs on `http://localhost:5000` by default.

## 🌍 Environment Variables
Ensure you create `.env` files for both **client** and **server**.

### Client `.env.local` Example:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Server `.env` Example:
```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=Test-Task
JWT_SECRET=your_secret_key

```

## 📜 API Documentation
For API endpoints, refer to the `server/` folder where the Nest.js backend is configured.

## 🛠️ Useful Commands

| Command           | Description                  |
|------------------|------------------------------|
| `yarn run dev` (Client) | Starts the Next.js frontend |
| `yarn run start:dev` (Server) | Starts the Nest.js backend |
| `yarn install` | Installs dependencies |

