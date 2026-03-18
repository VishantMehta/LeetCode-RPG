# ⚔️ CodeQuest: LeetCode RPG Gamification Engine

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

CodeQuest is a full-stack gamification dashboard that transforms your LeetCode grinding journey into an immersive RPG (Role-Playing Game) experience. It fetches real-time LeetCode stats and converts them into Experience Points (XP), RPG Levels, Class Skills, and Unlockable Loot/Badges.

---

## ✨ Core Features

* **🛡️ Dynamic RPG Leveling:** Converts Easy/Medium/Hard problems into a mathematically balanced XP system.
* **🧙‍♂️ Skill Tree Mapping:** Maps standard LeetCode topics (Arrays, DP, Graphs) into RPG Attributes (Strength, Intelligence, Magic).
* **🏆 Rules & Badge Engine:** A backend-driven inventory system that unlocks achievements based on player progression.
* **⚔️ Battle Log (Activity Feed):** Real-time tracking of recently solved problems with timestamps.
* **💾 ACID Compliant:** Ensures bulletproof data integrity using PostgreSQL transactions (Rollback/Commit) during profile syncs.

---

## 🏗️ System Architecture & Workflows

### 1. The Sync Workflow (Data Flow)
When a user clicks **"Enter Dungeon"**, the following sequence occurs:

1. **Client (React):** Sends a `GET` request with the LeetCode username to the Node.js Backend.
2. **API Gateway (Node.js):** Calls the unofficial LeetCode GraphQL API to fetch user stats, topic tags, and recent submissions.
3. **Gamification Engine:** Parses the raw data and calculates `Total XP`, `Current Level`, and individual `Skill Levels`.
4. **Database Transaction (PostgreSQL):** * `BEGIN` Transaction.
   * *Upserts* the `Users` table with new XP and Level.
   * *Upserts* the `User_Skills` table mapping topics to RPG attributes.
   * Evaluates the **Rules Engine** and unlocks new badges in `User_Badges`.
   * `COMMIT` Transaction (or `ROLLBACK` if any step fails).
5. **Client (React):** Receives the calculated JSON payload and animates the UI using Framer Motion.

### 2. Database Schema (Relational Design)
* `Users`: Stores primary stats (XP, Level, Coins).
* `Questions` & `User_Submissions`: Tracks idempotency to prevent duplicate XP for the same problem.
* `User_Skills`: 1-to-Many mapping for the Skill Tree (Strength, Magic, etc.).
* `Badges` & `User_Badges`: Many-to-Many mapping for the inventory and loot system.

---

## 💻 Tech Stack

**Frontend:**
* React.js (Vite)
* Tailwind CSS (Styling & Dark Theme)
* Framer Motion (Complex SVG & Layout Animations)
* Lucide React (Gaming Iconography)
* Axios (HTTP Client)

**Backend:**
* Node.js & Express.js
* PostgreSQL (Database)
* `pg` (PostgreSQL Client for Node)
* GraphQL (External LeetCode Data Fetching)

---

## 🚀 Local Setup & Installation

### Prerequisites
* Node.js (v18+)
* PostgreSQL installed and running locally.

### 1. Database Setup
Log into your PostgreSQL terminal and create the database:
```sql
CREATE DATABASE leetcode_rpg;
```
### 2. Backend Setup
```bash
cd leetcode-rpg-backend
npm install
```
# Create a .env file in the root of the backend folder:
    # PORT=5000
    # DB_USER=postgres
    # DB_PASSWORD=your_password
    # DB_HOST=localhost
    # DB_PORT=5432
    # DB_NAME=leetcode_rpg

# Initialize Database Tables
```bash
node src/config/initDb.js
```

# Seed Master Badges
```bash
node src/config/seedBadges.js
```

# Start the Server
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd leetcode-rpg-frontend
npm install

# Start the Vite Development Server
npm run dev
```
---

* Navigate to `http://localhost:5173` in your browser. Enter a valid LeetCode username (e.g., `vishant_mehta` or `striver_79`) and click **Enter Dungeon!**

### 🔮 Future Roadmap
* [ ] Global Leaderboard: Rank players based on their RPG levels.

* [ ] Daily Quests: "Solve 2 DP problems today for a 2x XP boost."

* [ ] Guilds/Clans: Allow users to form teams and grind together.
---

## 🚀 Local Setup & Installation

### Prerequisites
* Node.js (v18+)
* PostgreSQL installed and running locally.

### 1. Database Setup
Log into your PostgreSQL terminal and create the database:
```sql
CREATE DATABASE leetcode_rpg;
```

### 2. Backend Setup
```bash
cd leetcode-rpg-backend
npm install

# Create a .env file in the root of the backend folder:
# PORT=5000
# DB_USER=postgres
# DB_PASSWORD=your_password
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=leetcode_rpg

# Initialize Database Tables
node src/config/initDb.js

# Seed Master Badges
node src/config/seedBadges.js

# Start the Server
npm run dev
```

### 3. Frontend Setup
```bash
cd ../leetcode-rpg-frontend
npm install

# Start the Vite Development Server
npm run dev
```

Navigate to `http://localhost:5173` in your browser. Enter a valid LeetCode username (e.g., `vishant_mehta` or `striver_79`) and click **Enter Dungeon**!
```
