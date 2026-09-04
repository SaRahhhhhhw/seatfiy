import { get, post, patch, del } from './Api';

export function getScreens() {
  return get('/bookings/screens');
}

export function getSeats(movieId, params) {
  return get(`/bookings/${movieId}/seats`, { params });
}

export function createBooking(bookingData) {
  return post('/bookings', bookingData).then((res) => res.booking);
}

export function getMyBookings() {
  return get('/bookings/me').then((res) => res.bookings);
}

export function updateBookingStatus(bookingId, status) {
  return patch(`/bookings/${bookingId}/status`, { status }).then((res) => res.booking);
}

export function deleteBooking(bookingId) {
  return del(`/bookings/${bookingId}`);
}
