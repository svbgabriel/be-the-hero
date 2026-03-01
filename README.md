# Be The Hero – Deno Fresh Edition

This is the project **Be The Hero**, an application that connects people who want to help with NGOs that need support for specific cases (incidents). This version has been rebuilt using the **Deno** ecosystem and the **Fresh** framework.
The application is based on the original content developed by [Rocketseat](https://www.rocketseat.com.br/).

## 🚀 Architecture

The project uses the **Islands Architecture** from the Fresh framework, which allows delivering minimal JavaScript to the client by hydrating only the necessary interactive components.

- **Frontend:** [Fresh](https://fresh.deno.dev/) (Preact + JSX)
- **Backend:** [Deno Runtime](https://deno.com/) with integrated API routes in Fresh.
- **Persistence:** [Deno KV](https://deno.com/kv) (Currently configured to run in `:memory:` for development).
- **State Management:** `@preact/signals` for efficient reactivity.
- **Styling:** Vanilla CSS, focused on performance and simplicity.

### Folder Structure

- `routes/`: Contains application pages and API endpoints (`routes/api/`).
- `islands/`: Interactive components that are hydrated on the client side.
- `repositories/`: Data Access Layer that abstracts Deno KV operations.
- `types/`: TypeScript interface definitions for NGOs and Incidents.
- `static/`: Static assets such as images and global CSS files.

## 🛠 Libraries and Technologies

- **Deno:** Secure and modern JavaScript/TypeScript runtime.
- **Fresh (v1.6.8):** Full-stack framework for Deno.
- **Preact:** Lightweight React alternative for the UI.
- **Deno KV:** Native key-value database for Deno.
- **React Icons (Fi):** Feather icon set for the interface.

## 📋 Features

- **NGO Registration:** Allows new NGOs to register on the platform.
- **NGO Login:** Simple authentication via NGO ID.
- **Incident Management:**
  - Create new incidents with title, description, and required value.
  - List all incidents available on the platform (paginated).
  - List incidents specific to the logged-in NGO.
  - Delete incidents by the owning NGO.
- **NGO Profile:** A dedicated space to view and manage registered incidents.

## ⚙️ Usage

### Prerequisites

Ensure you have **Deno** installed on your machine: [Installation Instructions](https://deno.land/manual/getting_started/installation).

### Starting the Project

To start the development server with hot-reload:

```bash
deno task start
```

This will launch the application, by default, at `http://localhost:8000`.

### Available Commands

- `deno task start`: Starts the development server.
- `deno task build`: Generates the production build of the application.
- `deno task preview`: Runs the application from the generated build.
- `deno task check`: Runs formatting, linting, and type checking.

## 📡 API Reference

The application provides a REST-like API for NGOs and Incident management.

### NGOs
- **GET `/api/ongs`**: List all registered NGOs.
- **POST `/api/ongs`**: Register a new NGO.
  - Body: `{ "name": string, "email": string, "whatsapp": string, "city": string, "uf": string }`

### Sessions
- **POST `/api/sessions`**: Authenticate an NGO.
  - Body: `{ "id": string }`
  - Returns the NGO object if successful.

### Incidents
- **GET `/api/incidents?page=1`**: List all incidents with pagination (5 per page).
  - Returns `X-Total-Count` header with total count.
- **POST `/api/incidents`**: Create a new incident.
  - Body: `{ "title": string, "description": string, "value": string }`
  - Headers: `Authorization: <ong_id>`
- **DELETE `/api/incidents/[id]`**: Delete an incident.
  - Headers: `Authorization: <ong_id>`

### Profile
- **GET `/api/profile`**: List all incidents for a specific NGO.
  - Headers: `Authorization: <ong_id>`

## 📦 Build and Deploy

To generate the optimized production build:

```bash
deno task build
```

To run in production, the application can be easily deployed to [Deno Deploy](https://deno.com/deploy), taking advantage of native integration with Deno KV on a global scale.
