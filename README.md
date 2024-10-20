
MERN Stack Roxiler Coding Challenge

This project is a full stack MERN application that interacts with data from a third-party API. It includes features for listing transactions,displaying charts , and showing statistics using the data.

Features

Fetch Data: Retrieve data from a third-party API and store it in MongoDB.

List Transactions: Display a list of transactions with search functionality and pagination.

View Statistics: Analyze total sales, sold items, and unsold items for a specified month.

Bar Chart: Visualize the distribution of items across different price ranges.

Pie Chart: Show the distribution of items based on categories.


Technologies Used

Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB

API: Data from a third-party URL

How to Run the Project

Install Dependencies First, clone the project and install the required packages.

git clone https://github.com/Abdul8971/Roxiler-Mern-Assignment.git
cd Roxiler-Mern-Assignment npm install

For the frontend, go to the client folder and install the packages: cd frontend npm install

Set Up Environment Variables Create a .env file in the project folder with these variable:
PORT=8080
MONGO_URI=your_mongodb_connection_URL

Start the Backend server: npm run index.js

Start the Frontend Go to the client folder and start the frontend server: cd frontend npm run dev


