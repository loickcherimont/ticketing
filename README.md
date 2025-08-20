# 🎫 Ticketing Application

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://openjdk.java.net/projects/jdk/17/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.4-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.12-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern full-stack ticketing application built with **Spring Boot** backend and **React + TypeScript** frontend. Manage support tickets efficiently with a beautiful, responsive interface.

## 🚀 Features

- ✨ **Modern UI/UX** - Clean and intuitive interface built with React and Tailwind CSS
- 🎯 **Ticket Management** - Create, view, update, and close support tickets
- 📊 **Status Tracking** - Track ticket status (Open, In Progress, Closed)
- 🔍 **Real-time Updates** - Instant updates with modern React hooks
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎨 **Beautiful Components** - Custom UI components with Radix UI primitives
- ⚡ **Fast Development** - Hot reload with Vite for rapid development

## 🏗️ Architecture

This application follows a **microservices-ready** architecture with clear separation of concerns:

```
📁 ticketing-app/          # Spring Boot Backend
├── 🗄️ Model Layer         # JPA entities and DTOs
├── 🔧 Service Layer       # Business logic
├── 🌐 Controller Layer    # REST API endpoints
└── 💾 Repository Layer    # Data access

📁 ticketing-app-front/    # React Frontend
├── 🎨 Components          # Reusable UI components
├── 🪝 Custom Hooks        # React hooks for data management
├── 📝 Types               # TypeScript type definitions
└── 🎯 Pages               # Application views
```

## 🛠️ Tech Stack

### Backend
- **Java 17** - Modern Java with latest features
- **Spring Boot 3.5.4** - Rapid application development framework
- **Spring Data JPA** - Data persistence layer
- **H2 Database** - In-memory database for development
- **Lombok** - Reduces boilerplate code
- **Maven** - Dependency management and build tool

### Frontend
- **React 19.1.1** - Modern React with latest features
- **TypeScript 5.8.3** - Type-safe JavaScript
- **Vite 7.1.2** - Fast build tool and dev server
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Java 17** or higher
- **Node.js 18** or higher
- **npm** or **pnpm** (recommended)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/loickcherimont/ticketing-app.git
cd ticketing-app
```

### 2. Start the Backend

```bash
cd ticketing-app
./mvnw spring-boot:run
```

The Spring Boot application will start on `http://localhost:8080`

### 3. Start the Frontend

```bash
cd ticketing-app-front
pnpm install
pnpm dev
```

The React application will start on `http://localhost:5173`

## 📖 API Endpoints

The backend provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tickets` | Get all tickets |
| `GET` | `/api/tickets/{id}` | Get ticket by ID |
| `POST` | `/api/tickets` | Create new ticket |
| `PUT` | `/api/tickets/{id}` | Update ticket |
| `DELETE` | `/api/tickets/{id}` | Delete ticket |

## 🎯 Ticket Status Workflow

1. **🆕 Open** - New ticket created
2. **🔄 In Progress** - Ticket is being worked on
3. **✅ Closed** - Ticket resolved with solution

## 🎨 UI Components

The frontend includes several reusable components:

- **TicketModal** - Create and edit tickets
- **TicketRow** - Display individual tickets
- **Custom UI Components** - Button, Dialog, Input, Label, Textarea

## 🔧 Development

### Backend Development

```bash
# Run with hot reload
./mvnw spring-boot:run

# Run tests
./mvnw test

# Build JAR
./mvnw clean package
```

### Frontend Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Preview production build
pnpm preview
```

## 📁 Project Structure

```
ticketing-app/
├── src/main/java/dev/loickcherimont/ticketing_app/
│   ├── controller/          # REST controllers
│   ├── model/              # JPA entities
│   ├── repository/         # Data access layer
│   ├── service/            # Business logic
│   └── exception/          # Custom exceptions
└── src/main/resources/
    ├── application.properties
    └── data.sql

ticketing-app-front/
├── src/
│   ├── components/         # React components
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript definitions
│   └── lib/               # Utility functions
├── public/                # Static assets
└── package.json
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Loick Cherimont**

- GitHub: [@loickcherimont](https://github.com/loickcherimont)
- Repository: [ticketing-app](https://github.com/loickcherimont/ticketing-app)

## 🙏 Acknowledgments

- [Spring Boot](https://spring.io/projects/spring-boot) for the amazing backend framework
- [React](https://reactjs.org/) for the frontend library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Vite](https://vitejs.dev/) for the fast build tool

---

⭐ **Star this repository if you found it helpful!**