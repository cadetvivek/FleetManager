# FleetManagerPro - Logistics and Transportation

## 🚛 Efficient Fleet Management System

FleetManagerPro is a comprehensive fleet management application designed to streamline logistics operations. It enables businesses to efficiently manage vehicles, track their locations, schedule maintenance, and monitor driver performance. The goal is to enhance operational efficiency, improve safety, and reduce costs.

## 🏆 Project Goal

Develop a scalable and user-friendly fleet management system that allows users to:
- Track vehicles in real-time
- Schedule maintenance tasks
- Manage driver information
- Optimize routes
- Generate insightful reports and analytics

---

## 📌 Tech Stack

### Frontend:
- **React.js** - For building an interactive UI
- **Tailwind CSS** - For responsive and modern styling
- **TypeScript** - For type safety and better error handling

### Backend:
- **Node.js & Express.js** - For handling API requests
- **MongoDB** - For data storage
- **Firebase** - For secure authentication

---

## ✨ Features

### 1️⃣ User Authentication
- Secure registration & login for fleet managers and drivers.
- Firebase Authentication for managing access.
- Password recovery and account verification.

### 2️⃣ Vehicle Tracking (Simulated)
- Add and manage vehicle details (Make, Model, License Plate, Initial Mileage).
- Simulated vehicle tracking with a static map.
- Manual updates for vehicle locations with markers.

### 3️⃣ Maintenance Scheduling
- Schedule routine maintenance based on mileage or time intervals.
- Calendar feature for setting reminders (e.g., oil changes, tire rotations).
- Simulated maintenance records with dummy data.

### 4️⃣ Driver Management
- Add and manage driver profiles (contact info, driving history).
- Simulated driving history (incidents, driving scores).

### 5️⃣ Route Optimization (Simulated)
- Basic route planning tool.
- Input start & end locations to receive optimal route suggestions.
- Estimated travel times based on static data.

### 6️⃣ Reports & Analytics (Simulated)
- Vehicle performance reports.
- Maintenance history and cost breakdowns.
- Driver performance analysis with visual charts.

### 7️⃣ Fuel Management System (Simulated)
- Track simulated fuel consumption for each vehicle.
- Compare actual vs. expected fuel consumption.
- Flag inefficiencies and suggest maintenance actions.

### 8️⃣ Driver Trip Logging (Simulated)
- Drivers can log trip details (start/end times, distance, purpose).
- Data stored in a mock database for analysis.

### 9️⃣ Geofencing Alerts (Simulated)
- Set geographical boundaries for vehicles.
- Trigger mock alerts when vehicles exit designated areas.

### 🔟 Emergency Response System (Simulated)
- Drivers can send simulated distress signals.
- Alerts notify fleet managers with driver location and emergency details.

### 1️⃣1️⃣ Maintenance Cost Tracker (Simulated)
- Input maintenance-related expenses (parts, labor, services).
- Generate reports summarizing total costs over time.

### 1️⃣2️⃣ User Roles & Permissions
- **Admin**: Manage vehicles, drivers, reports, and settings.
- **Fleet Manager**: Schedule maintenance, optimize routes.
- **Driver**: Log trips, update fuel usage, request maintenance.

---

## 🛠 Installation & Setup

### 📌 Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (latest version)
- **MongoDB** (local or cloud-based database)
- **Firebase** (configured for authentication)

### 🔹 Clone the Repository
```sh
git clone https://github.com/yourusername/FleetManagerPro.git
cd FleetManagerPro
```

### 🔹 Install Dependencies
```sh
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 🔹 Environment Variables
Create a `.env` file in the `backend` folder and add the required configurations:
```
MONGO_URI=your_mongodb_connection_string
FIREBASE_API_KEY=your_firebase_api_key
SECRET_KEY=your_secret_key
```

### 🔹 Start the Backend Server
```sh
cd backend
npm start
```

### 🔹 Start the Frontend App
```sh
cd frontend
npm run dev
```

---

## 🚀 Deployment

For production deployment, consider using:
- **Frontend:**  Netlify
- **Backend:** Vercel
- **Database:** MongoDB Atlas

---


---

### 💡 Happy Coding! 🚀
