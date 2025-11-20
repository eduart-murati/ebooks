# eBook

**eBook** is a minimal web application built with **React + TypeScript + Vite** that allows you to search and read books online. It supports searching by **genre**, **author**, and **keywords**, and features a responsive UI built with **Chakra UI**. Books available online can be read directly.

<img width="1024" height="509" alt="eBook" src="https://github.com/user-attachments/assets/8a515f74-e747-4a61-9c6e-8c58b48cac9b" />

## Getting Started

To get started with eBook, follow these steps:

1. **Clone** this repository to your local machine.
2. Run `npm install` to install all dependencies.
3. Run `npm run dev` to start the local development server.
4. Open your browser at [http://localhost:5173](http://localhost:5173) to see the app in action.

## Features

- Search books by **genre**, **author**, and **keywords**.
- Display books with cover images, author names, and publication year.
- **Read / Audio** button for books available online.
- Responsive UI for desktop and mobile devices.
- Pagination support for large book lists.
- Simple, modular, and reusable React components.

## Project Structure

- **src/components/** – UI components such as `BookCard`, `BookGrid`, `NavBar`.
- **src/hooks/** – Custom hooks like `useBooks` and `useGenres`.
- **src/services/** – Functions for fetching API data and data processing.
- **App.tsx** – Main application entry point.
- **main.tsx** – Renders React into the DOM.

## Learnings

This project is useful for learning how to:

- Build a modern front-end application with React and TypeScript.
- Manage application **state** using custom hooks.
- Create reusable and modular React components.
- Use UI libraries like Chakra UI effectively.
- Connect front-end apps to external APIs.
- Apply best practices for clean code and TypeScript.

eBook is minimal and can be extended further with new features or backend integrations.
