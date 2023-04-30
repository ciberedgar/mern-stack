import React from 'react';
import { BrowserRouter as Router, Route, Routes, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NotesList />,
    },
    {
      path: "/user",
      element: <CreateUser />,
    },
    {
      path: "/create",
      element: <CreateNote />,
    },
    {
      path: "/edit/:id",
      element: <CreateNote />,
    },
  ]);
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Routes>
          <Route path="/" element={<NotesList></NotesList>} />
          <Route path="/user" element={<CreateUser></CreateUser>} />
          <Route path="/create" element={<CreateNote></CreateNote>} />
          <Route path="/edit/:id" element={<CreateNote></CreateNote>} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
