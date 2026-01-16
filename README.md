# Pokedex Full-Stack Application

Laravel backend + Next.js frontend fetching from PokeAPI.

## Setup Instructions

### Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan install:api
php artisan serve
```
Runs on: `http://localhost:8000`

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Runs on: `http://localhost:3000`

---

## API Documentation

### Endpoint
```
GET /api/pokemons?page=<number>&limit=<number>
```

### Parameters
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 20) - Items per page

### Example Request
```
GET http://localhost:8000/api/pokemons?page=1&limit=10
```

### Example Response
```json
[
  {
    "name": "bulbasaur",
    "image": "https://raw.githubusercontent.com/.../1.png",
    "types": ["grass", "poison"],
    "height": 7,
    "weight": 69
  }
]
```

---

## Features
- ✅ Paginated Pokemon list
- ✅ Auto-rotating carousel (3 banners)
- ✅ Search by name
- ✅ Infinite scroll
- ✅ Sticky sidebars

## Tech Stack
**Backend:** Laravel 11, PHP 8.2+  
**Frontend:** Next.js 14, TypeScript, Tailwind CSS  
**API:** PokeAPI

## AI Usage

AI tools were used selectively to support my understanding and implementation, while I remained responsible for the overall architecture, logic, and testing.

### Where I Used AI
- **Understanding the project flow**
  - I asked AI clarifying questions to validate my understanding of the expected full-stack flow (frontend → API → UI rendering) and to ensure my approach matched the intended user experience.
- **Carousel implementation (frontend)**
  - I referenced an AI-suggested pattern for implementing an auto-rotating carousel using `useEffect` + `setInterval`, including proper cleanup (`clearInterval`) to avoid memory leaks.
- **TypeScript Types**
  - Interface syntax for Pokemon data structure
- **Tailwind Utilities**
  - Specific class names for sticky positioning
