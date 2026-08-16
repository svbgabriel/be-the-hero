# Be The Hero – Deno Fresh Edition

This is the **Be The Hero** project, an application that connects people who want to help with NGOs that need support
for specific cases (incidents). This version was rebuilt using the **Deno** ecosystem and the **Fresh** framework.

The application is based on the original content developed by [Rocketseat](https://www.rocketseat.com.br/).

## 🚀 Architecture

The project uses the **Islands Architecture** from the Fresh framework, which allows delivering minimal JavaScript to
the client by hydrating only the necessary interactive components.

- **Frontend:** [Fresh](https://fresh.deno.dev/) (Preact + JSX)
- **Backend:** [Deno Runtime](https://deno.com/) with API routes integrated into Fresh.
- **Persistence:** SQLite (`node:sqlite`) running in `:memory:` for development.
- **State Management:** `@preact/signals` for efficient reactivity.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) for a modern and performant design.

### Folder Structure

- `routes/`: Contains application pages and API endpoints (`routes/api/`).
- `islands/`: Interactive components that are hydrated on the client side.
- `repository/`: Data access layer that abstracts database operations.
- `model/`: TypeScript interface definitions for NGOs and Incidents.
- `static/`: Static assets such as images and global CSS files.
- `tests/`: Automated test suite (API, UI, Repositories).

## 🛠 Technologies

- **Deno:** Secure and modern runtime for JavaScript/TypeScript.
- **Fresh (v2.x):** Full-stack framework for Deno focused on performance.
- **Preact:** Lightweight React alternative for the interface.
- **SQLite (node:sqlite):** Lightweight relational database integrated with Deno.
- **Tailwind CSS v4:** Utility-first styling framework.
- **React Icons (Fi):** Feather icon set for the interface.

## 📋 Features

- **NGO Registration:** Allows new NGOs to register on the platform.
- **NGO Login:** Simple authentication via NGO ID.
- **Incident Management:**
  - Create new incidents with title, description, and required value.
  - List all incidents available on the platform (paginated).
  - List incidents specific to the logged-in NGO.
  - Delete incidents belonging to the NGO.
- **NGO Profile:** Dedicated space to view and manage registered incidents.

## ⚙️ Usage

### Prerequisites

Ensure you have **Deno** installed on your machine:
[Installation Instructions](https://deno.land/manual/getting_started/installation).

### Starting the Project

To start the development server with hot-reload:

```bash
deno task dev
```

This will start the application, by default, at `http://localhost:8000`.

### Available Commands

- `deno task dev`: Starts the development server with hot-reload support.
- `deno task start`: Starts the production server (after build).
- `deno task test`: Runs the automated test suite.
- `deno task build`: Generates the application's production build.
- `deno task check`: Runs formatting, linting, and type checking.

## 📡 API Reference

The application provides a REST API for managing NGOs and Incidents.

### NGOs

- **GET `/api/ongs`**: Lists all registered NGOs.
- **POST `/api/ongs`**: Registers a new NGO.
  - Body: `{ "name": string, "email": string, "whatsapp": string, "city": string, "uf": string }`

### Sessions

- **POST `/api/sessions`**: Authenticates an NGO.
  - Body: `{ "id": string }`
  - Returns the NGO object if successful.

### Incidents

- **GET `/api/incidents?page=1`**: Lists all incidents with pagination (5 per page).
  - Returns the `X-Total-Count` header with the total number of records.
- **POST `/api/incidents`**: Creates a new incident.
  - Body: `{ "title": string, "description": string, "value": string }`
  - Headers: `Authorization: <ong_id>`
- **DELETE `/api/incidents/[id]`**: Removes an incident.
  - Headers: `Authorization: <ong_id>`

### Profile

- **GET `/api/profile`**: Lists all incidents for a specific NGO.
  - Headers: `Authorization: <ong_id>`

## 📦 Build and Deploy

To generate the optimized production build:

```bash
deno task build
```

To run in production locally:

```bash
deno task start
```

The application can be easily deployed to [Deno Deploy](https://deno.com/deploy).
