# egreig-vistnes.no

A modern web application built with **Next.js** frontend and **Flask** backend, ready for Vercel deployment.

## Project Structure

```
├── frontend/          # Next.js frontend application
│   ├── app/          # App router pages and layouts
│   ├── public/       # Static assets
│   └── ...
├── backend/          # Flask backend API service
│   ├── app.py       # Main Flask application
│   └── requirements.txt
├── vercel.json       # Vercel deployment configuration
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ (for frontend)
- Python 3.10+ (for backend)
- npm or yarn

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The backend API will be available at [http://localhost:5000](http://localhost:5000).

### Environment Variables

#### Frontend (`frontend/.env.local`)

Copy `frontend/.env.example` to `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### Backend (`backend/.env`)

Copy `backend/.env.example` to `backend/.env`:

```env
FLASK_DEBUG=true
PORT=5000
ALLOWED_ORIGINS=http://localhost:3000
```

## API Endpoints

The Flask backend provides the following endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check / root endpoint |
| `/api/health` | GET | API health check |
| `/api/hello` | GET | Example hello endpoint (accepts `name` query param) |
| `/api/data` | GET, POST | Example data endpoint |

## Deployment

### Deploy Frontend to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Vercel will automatically detect the Next.js project
4. Set environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
5. Deploy!

The `vercel.json` configuration file is already set up for deployment.

### Deploy Backend

For the Flask backend, you have several options:

- **Vercel Serverless Functions** (limited Python support)
- **Railway** - Easy Python/Flask deployment
- **Render** - Free tier available
- **Fly.io** - Global deployment
- **AWS Lambda** with API Gateway
- **Google Cloud Run**

Example for production with Gunicorn:

```bash
gunicorn app:app --bind 0.0.0.0:$PORT
```

## Development

### Frontend Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Backend Commands

```bash
python app.py              # Start development server
gunicorn app:app           # Start production server
pip freeze > requirements.txt  # Update dependencies
```

## Tech Stack

### Frontend
- [Next.js 16](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [App Router](https://nextjs.org/docs/app) - File-based routing

### Backend
- [Flask 3](https://flask.palletsprojects.com/) - Python web framework
- [Flask-CORS](https://flask-cors.readthedocs.io/) - Cross-origin resource sharing
- [python-dotenv](https://github.com/theskumar/python-dotenv) - Environment variables
- [Gunicorn](https://gunicorn.org/) - WSGI HTTP server

## Extending the Application

### Adding New Pages (Frontend)

Create new pages in `frontend/app/`:

```
frontend/app/about/page.tsx    → /about
frontend/app/blog/page.tsx     → /blog
frontend/app/blog/[id]/page.tsx → /blog/:id
```

### Adding New API Endpoints (Backend)

Add new routes in `backend/app.py`:

```python
@app.route("/api/your-endpoint")
def your_endpoint():
    return jsonify({"data": "your data"})
```

## License

MIT
