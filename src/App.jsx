import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import RequireAuth from './components/UI/RequireAuth';
import { CartProvider } from './context/CartContext';

import {
  Home,
  Movies,
  MovieDetails,
  Booking,
  Cart,
  Bookings,
  Admin,
  AdminUsers,
  Login,
  Register,
  NotFound,
} from './components/Pages';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/book/:id" element={<RequireAuth><Booking /></RequireAuth>} />
            <Route path="/cart" element={<RequireAuth><Cart /></RequireAuth>} />
            <Route path="/my-bookings" element={<RequireAuth><Bookings /></RequireAuth>} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
