
MERN Stack Coding Challenge

This project is a MERN stack application that works with data from a third-party API. It includes features for listing transactions, showing statistics, and displaying charts using the data.

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

git clone https://github.com/Rajeshwari159/Roxiler-assignment.git cd mern-stack-coding-challenge npm install

For the frontend, go to the client folder and install the packages: cd frontend npm install

Set Up Environment Variables Create a .env file in the project folder with these variable: PORT=8000 MONGO_URI=your_mongodb_connection_string API_URL=https://s3.amazonaws.com/roxiler.com/product_transaction.json

Start the Backend Start the backend server: npm start

Start the Frontend Go to the client folder and start the frontend server: cd frontend npm run dev

APIs in the Project Fetch Data:

GET /initialize-database Initializes the database by fetching data from the third-party API.

List Transactions:

GET /transactions?month=March Shows a list of transactions for the selected month.

Get Statistics:

GET /statistics?month=March Provides total sales, sold items, and unsold items for a selected month.

Bar Chart Data:

GET /bar-chart?month=March Returns data for the price range of items.

Pie Chart Data:

GET /pie-chart?month=March Shows the number of items in each category.
