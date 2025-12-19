# PickupComps V2 - Expansion Verify & Launch

You have successfully added Profiles, Login, Database Persistence, and Social Sharing to your app!

## 1. Setup Environment
You need to create a [.env](file:///Users/edubs5/Desktop/Pickup_Basketball_Comp/pickupcompsv2/.env) file in the root directory ([/Users/edubs5/Desktop/Pickup_Basketball_Comp/pickupcompsv2/.env](file:///Users/edubs5/Desktop/Pickup_Basketball_Comp/pickupcompsv2/.env)) with the following secrets:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/pickupcomps?retryWrites=true&w=majority
JWT_SECRET=mysecrettoken_change_this_to_something_complex
NODE_ENV=development
```
*   **MONGO_URI**: Get this from your MongoDB Atlas dashboard (Connect -> Connect your application).
*   **JWT_SECRET**: Can be any random string.

## 2. Run the App
Since this is now a full-stack app, you should run the server and client.

### Development Mode (Recommended)
open a new terminal:
```bash
npm run start
```
*Note: We might need to adjust [package.json](file:///Users/edubs5/Desktop/Pickup_Basketball_Comp/pickupcompsv2/package.json) to run both simultaneously if you want a single command, but for now:*
1.  **Terminal 1 (Backend)**: `nodemon server.js` (or `node server.js`)
2.  **Terminal 2 (Frontend)**: `npm start` (This will proxy requests to the backend if we configure `setupProxy.js` or add `"proxy": "http://localhost:5000"` to package.json. **Important:** Add `"proxy": "http://localhost:5000"` to your [package.json](file:///Users/edubs5/Desktop/Pickup_Basketball_Comp/pickupcompsv2/package.json) so the React app talks to the Express backend).

### Production Build
```bash
npm run build
node server.js
```
The app will be available at `http://localhost:5000`.

## 3. Verification Checklist

- [ ] **Login/Signup**: Navigate to `/Signup`. Create an account. You should be redirected to `/Profile`.
- [ ] **Profile**: Verify your username and email are displayed.
- [ ] **Save Result**: Go to `/Results` (after taking the quiz or editing data). Click "Save Result".
- [ ] **Persistence**: Go back to `/Profile`. You should see your saved result in the history list.
- [ ] **Share**: Click the "Share" button on the Results page.

## 4. Deployment to Render
Refer to the [deployment_prompt.md](file:///Users/edubs5/.gemini/antigravity/brain/803afbc6-5dc8-442e-850d-4e0fdd7542fb/deployment_prompt.md) artifact for the "startup pitch" and deployment details.
