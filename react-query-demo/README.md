# React Query Demo

## Project Overview
This project demonstrates advanced data fetching and management using React Query. It integrates with the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API to fetch, cache, and update posts efficiently, optimizing data interactions in a React application.

## Features
- Fetch posts from JSONPlaceholder API using React Query
- Caching of API responses to minimize unnecessary network requests
- Manual refetching of posts to update data on demand
- React Query DevTools integration for debugging

## Technologies Used
- React
- Vite
- React Query (@tanstack/react-query)
- Axios

## Setup Instructions
1. **Clone the Repository**
   ```sh
   git clone https://github.com/alx-fe-reactjs/react-query-demo.git
   cd react-query-demo
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Run the Application**
   ```sh
   npm run dev
   ```

## File Structure
```
react-query-demo/
│── src/
│   ├── components/
│   │   ├── PostsComponent.jsx
│   ├── App.jsx
│   ├── main.jsx
│── package.json
│── README.md
```

## How It Works
- `PostsComponent.jsx` uses React Query's `useQuery` hook to fetch posts.
- Data is cached and automatically updated based on React Query's cache policies.
- A "Refetch Posts" button allows users to manually refresh the data.

## Debugging with React Query DevTools
1. Install DevTools (if not already installed):
   ```sh
   npm install @tanstack/react-query-devtools
   ```
2. Import and add `<ReactQueryDevtools />` in `App.jsx`.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## Author
[alx-fe-reactjs](https://github.com/ndrew98/alx-fe-reactjs)
