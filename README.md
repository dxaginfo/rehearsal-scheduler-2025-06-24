# Rehearsal Scheduler

A comprehensive web application designed for bands and music groups to streamline the process of scheduling rehearsals, tracking attendance, sending reminders, and suggesting optimal rehearsal times based on member availability.

## Features

- **User Authentication and Band Management**
  - Create band profiles and invite members
  - Role-based permissions (band leaders vs. members)

- **Availability Management**
  - Set regular weekly availability patterns
  - Mark exceptions to regular availability
  - View availability commitments calendar

- **Rehearsal Scheduling**
  - Schedule sessions with date, time, location, and agenda
  - View optimal rehearsal times based on member availability
  - Manage recurring rehearsal patterns

- **Notifications and Reminders**
  - Automatic notifications for new/changed rehearsals
  - Attendance confirmation system
  - Pre-rehearsal reminders

- **Setlist and Notes Management**
  - Attach setlists to rehearsal sessions
  - Collaborative notes and discussion points
  - Practice history tracking

- **Statistics and Reporting**
  - Attendance statistics and analytics
  - Rehearsal history visualization
  - Optimization suggestions based on historical data

## Technology Stack

### Frontend
- React.js with TypeScript
- Redux Toolkit for state management
- Material-UI for component library
- Formik with Yup for form validation
- FullCalendar for calendar visualization

### Backend
- Node.js with Express
- RESTful API architecture
- JWT authentication
- Prisma ORM

### Database
- PostgreSQL
- Redis for caching

### DevOps
- Docker containerization
- AWS deployment
- GitHub Actions for CI/CD
- Sentry for error tracking

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database
- Redis server

### Development Environment Setup

1. Clone the repository
```bash
git clone https://github.com/dxaginfo/rehearsal-scheduler-2025-06-24.git
cd rehearsal-scheduler-2025-06-24
```

2. Install dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. Configure environment variables
```bash
# In backend directory
cp .env.example .env
# Edit .env with your database credentials and JWT secret
```

4. Initialize the database
```bash
npm run db:migrate
npm run db:seed # Optional, adds sample data
```

5. Start development servers
```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm start
```

### Docker Setup

```bash
# Build and start all services
docker-compose up -d
```

## Project Structure

```
rehearsal-scheduler/
├── frontend/               # React frontend application
│   ├── public/             # Static files
│   ├── src/                # Source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── store/          # Redux store configuration
│   │   ├── utils/          # Utility functions
│   │   └── App.tsx         # Main application component
│   └── package.json        # Frontend dependencies
│
├── backend/                # Node.js backend application
│   ├── src/                # Source code
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Data models
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic
│   │   └── app.js          # Express application setup
│   ├── prisma/             # Prisma schema and migrations
│   └── package.json        # Backend dependencies
│
├── docker-compose.yml      # Docker configuration
└── README.md               # Project documentation
```

## API Documentation

The API follows RESTful conventions and is organized around resources:

- `/api/auth` - Authentication endpoints
- `/api/users` - User management
- `/api/bands` - Band management
- `/api/availability` - Availability tracking
- `/api/rehearsals` - Rehearsal scheduling
- `/api/setlists` - Setlist management
- `/api/songs` - Song management

Detailed API documentation is available at `/api/docs` when running the development server.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the needs of musicians and bands worldwide
- Built with modern web technologies
- Designed for mobile-first usage