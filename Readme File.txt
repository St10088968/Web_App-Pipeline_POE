Before starting, make sure you have:

Node.js (v16 or later) installed
npm (comes with Node.js)
MongoDB running locally or online (Atlas)

Running the Backend

1)Open Command Prompt
Navigate to the backend folder:

code: cd C:\Program Files\customer-payments-portal\backend

2)Install dependencies

code: npm install

3)Start the server

code: node server.js

4)Once running, you should see:
Server running on port 5000

Running the Frontend

1)Open a new Command Prompt window.
Navigate to the frontend folder:

code: cd C:\Program Files\customer-payments-portal\frontend

2)Install dependencies

code: npm install

3)Start the frontend

code: npm start

4)Wait for the browser to open automatically at:
👉 http://localhost:3000

Connecting Frontend and Backend(Visual Studio Code)
The frontend uses Axios to communicate with the backend.
Make sure the backend URL in your frontend code is:

code: axios.post("https://localhost:5000/api/auth/register", form);

Also, ensure CORS is enabled in your backend server.js:

code: const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

User Registration

Once both servers are running:

Go to your browser at http://localhost:3000
Click on Register or Sign Up
Enter your details and click Submit
If everything is connected, your data will be saved in MongoDB, and you’ll see a “Registration Successful” message.

Troubleshooting

Network Error: Check that the backend port matches https://localhost:5000
Certificate Error: Run backend using plain HTTP or trust your .crt file
Port in use: Change the port in server.js (e.g., to 5001)
CORS issue: Ensure frontend URL is correctly whitelisted in backend CORS settings.
