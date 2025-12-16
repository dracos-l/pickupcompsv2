# Pickup Basketball Comp - Startup & Deployment Manual

## 1. App Overview & "Startup" Pitch
**Name**: PickupComps
**Tagline**: "Analytics for the Playground"
**Elevator Pitch**: PickupComps brings the sophistication of professional sports analytics to the casual basketball world. By analyzing playstyle through a streamlined questionnaire, we generate comparable professional profles, giving competitive insight to recreational players. It's not just a quiz; it's a data-driven identity platform for the basketball community.

**Architecture (The "Impressive" Stack)**:
-   **Frontend**: React.js with D3.js for high-performance data visualization.
-   **Backend**: Node.js & Express REST API (Scalable event-driven architecture).
-   **Database**: MongoDB (NoSQL document store for flexible data modeling of complex player stats).
-   **Security**: JSON Web Tokens (JWT) for stateless authentication and bcrypt for comprehensive password security.

## 2. Technical Context for Deployment (Render.com)

This application is designed as a **Monorepo** (or decoupled structure) deployable on platforms like Render.

### How it Works:
1.  **Frontend**: The React app lives in `src/`. It consumes the API.
2.  **Backend**: The Node/Express server lives in the root (or `server/`) and serves the API endpoints.
    -   In production, the backend *also* serves the static frontend build files, creating a unified single-origin deployment.

### Deployment Instructions (Render.com)
**Service 1: The Web Service (Backend + Frontend)**
1.  **Link GitHub Repo**.
2.  **Runtime**: Node.
3.  **Build Command**: `npm install && npm run build`. (This installs backend deps *and* builds the React frontend).
4.  **Start Command**: `node server.js`.
5.  **Environment Variables**:
    -   `MONGO_URI`: (Connection string from MongoDB Atlas)
    -   `JWT_SECRET`: (A long random string)
    -   `NODE_ENV`: `production`

**Database**:
-   Use **MongoDB Atlas** (Free Tier).
-   Create a Cluster -> "PickupComps" Database.
-   Network Access: Allow 0.0.0.0/0 (or Render's IP range if you want to be strict).

## 3. Key Startup Features Added
-   **User Profiles**: Persistent identity.
-   **History**: "Season stats" tracking (saved attempts).
-   **Virality**: Native sharing integration to post results to social media.
