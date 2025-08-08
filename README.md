# Todo API

A RESTful API built with Ruby on Rails for managing todo items. This API provides endpoints to create, read, update, and delete todos with a clean JSON interface.

## Features

- Full CRUD operations for todos
- RESTful API design
- JSON response format
- CORS enabled for frontend integration
- MySQL database support
- Docker containerization ready

## Tech Stack

- **Ruby**: 3.2.7
- **Rails**: 8.0.2
- **Database**: MySQL 2
- **Web Server**: Puma
- **CORS**: Rack-CORS

## Prerequisites

Before running the application, make sure you have the following installed:

- Ruby 3.2.7
- MySQL server running
- Bundler gem

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd todo_api
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Configure the database:
   - Update `config/database.yml` with your MySQL credentials
   - Default configuration expects MySQL running on localhost with username `root` and password `root`

4. Set up the database:
   ```bash
   rails db:create
   rails db:migrate
   rails db:seed
   ```

## How to Launch the Application

### Development Mode

1. **Using the development script (recommended):**
   ```bash
   ./bin/dev
   ```

2. **Using Rails server directly:**
   ```bash
   rails server
   ```

3. **Specifying port (optional):**
   ```bash
   rails server -p 3001
   ```

The API will be available at `http://localhost:3000` (or your specified port).

### Production Mode with Docker

1. **Build the Docker image:**
   ```bash
   docker build -t todo_api .
   ```

2. **Run the container:**
   ```bash
   docker run -d -p 80:80 -e RAILS_MASTER_KEY=<your_master_key> --name todo_api todo_api
   ```

## API Endpoints

All endpoints return JSON responses and are prefixed with `/api/v1/`.

### Todos

- `GET /api/v1/todos` - Get all todos (ordered by creation date, newest first)
- `GET /api/v1/todos/:id` - Get a specific todo
- `POST /api/v1/todos` - Create a new todo
- `PUT /api/v1/todos/:id` - Update a todo
- `DELETE /api/v1/todos/:id` - Delete a todo

### Request/Response Examples

**Create a todo:**
```bash
curl -X POST http://localhost:3000/api/v1/todos \
  -H "Content-Type: application/json" \
  -d '{"todo": {"title": "Learn Rails", "description": "Build a todo API", "completed": false}}'
```

**Response:**
```json
{
  "id": 1,
  "title": "Learn Rails",
  "description": "Build a todo API",
  "completed": false,
  "created_at": "2025-08-08T14:30:00.000Z",
  "updated_at": "2025-08-08T14:30:00.000Z"
}
```

**Get all todos:**
```bash
curl http://localhost:3000/api/v1/todos
```

## Database Schema

### Todos Table

| Field | Type | Description |
|-------|------|-------------|
| id | integer | Primary key |
| title | string | Todo title (required, max 255 chars) |
| description | text | Todo description (optional) |
| completed | boolean | Completion status (default: false) |
| created_at | datetime | Creation timestamp |
| updated_at | datetime | Last update timestamp |

## Development

### Running Tests

```bash
rails test
```

### Code Quality

Run Rubocop for style checking:
```bash
bundle exec rubocop
```

Run Brakeman for security analysis:
```bash
bundle exec brakeman
```

## Frontend Integration

This API includes CORS configuration allowing requests from any origin during development. The frontend application is located in the `todo-frontend/` directory.

To run the frontend:
```bash
cd todo-frontend
npm install
npm run dev
```

## Health Check

The application includes a health check endpoint:
```bash
curl http://localhost:3000/up
```

## Deployment

The application is configured for deployment with:
- **Kamal**: For containerized deployment
- **Docker**: Production-ready Dockerfile included
- **Thruster**: HTTP asset caching and compression

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and code quality checks
5. Submit a pull request

## License

This project is available as open source under the terms of the MIT License.
