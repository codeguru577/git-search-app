# GitHub Repository Search Application

This is a full-stack single-page application built with **React.js** (frontend), **Django DRF** (backend), and **REDIS** (caching).
The application allows users to search for GitHub repositories or users by typing in a search term and selecting an entity type (User or Repository) from a dropdown. The results are fetched from the GitHub API, cached using REDIS, and displayed in a responsive grid layout.

### Frontend

- **Search Functionality**: Users can search for GitHub repositories or users by typing in a search term.
- **Entity Type Selection**: A dropdown allows users to select between "User" or "Repository" as the search entity.
- **Debounced API Calls**: API calls are debounced and triggered only after the user has typed 3 or more characters.
- **Responsive Design**: The UI adapts to different screen sizes (2 columns for screens ≤ 768px).
- **Caching**: Results are cached to avoid redundant API calls for the same search term.
- **State Management**: Handles various states (initial, loading, error, empty) with appropriate user feedback.
- **Repository and User Cards**: Displays detailed information for repositories (name, author, stars, etc.) and users (profile picture, name, location, etc.).

### Backend

- **Search API**: A `/api/search` endpoint that fetches data from the GitHub API and caches it in REDIS for 2 hours.
- **Clear Cache API**: A `/api/clear-cache` endpoint to manually clear the REDIS cache.
- **Caching**: REDIS is used to cache search results, reducing the load on the GitHub API.
- **Unit Tests**: Backend code is covered with unit tests to ensure reliability.
- **Optional Swagger Documentation**: API endpoints are documented using Swagger for easy testing and integration.

---

## Technologies Used

### Frontend

- **React.js**: For building the user interface.
- **Vanilla CSS/Styled Components**: For styling the components (no CSS frameworks used).
- **Optional**: TypeScript, Redux, Redux-Persist, and React Router for enhanced functionality.

### Backend

- **Django DRF**: For building the RESTful API.
- **REDIS**: For caching search results.
- **GitHub API**: For fetching repository and user data.

---

## High-Level Solution

### Frontend

1. **Input Fields**: Two input fields are provided—one for the search term and a dropdown for selecting the entity type (User or Repository).
2. **Debounced Search**: The search input is debounced using `lodash.debounce` to minimize API calls. API calls are made only after the user has typed 3 or more characters.
3. **Dynamic Results Display**: Results are displayed in a grid layout. The layout adjusts to 2 columns on smaller screens (≤ 768px).
4. **State Management**: The application handles various states (initial, loading, error, empty) and provides appropriate feedback to the user.
5. **Caching**: Results are cached in REDIS to avoid redundant API calls for the same search term.

### Backend

1. **Search API**: The `/api/search` endpoint accepts a POST request with the search type (users or repositories) and search text. It fetches data from the GitHub API and caches it in REDIS for 2 hours.
2. **Clear Cache API**: The `/api/clear-cache` endpoint clears the REDIS cache manually.
3. **Caching**: REDIS is used to cache search results, ensuring efficient use of the GitHub API.
4. **Unit Tests**: Backend code is covered with unit tests to ensure reliability and maintainability.
5. **Optional Swagger Documentation**: API endpoints are documented using Swagger for easy testing and integration.

---

## Installation and Setup

### Prerequisites

- Node.js and npm (for frontend)
- Python and pip (for backend)
- REDIS (for caching)

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Start the development server:
   ```bash
   python manage.py runserver
   ```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
