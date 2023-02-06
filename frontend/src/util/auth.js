import { redirect } from 'react-router-dom';

export function getTokenDuration() {
  // we get our expiration from storage, which is set when we log in.  We put that into new Date to get that time, then we find the current time with new Date.
  // We get the time for both in miliseconds by using .getTime(); and subtracting the NOW time from the expiration time. If the time hasnt expired the number will be a positive value, if it has expired it will be a negative value.

  const storedExpirationDate = localStorage.getItem('expiration');

  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();

  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }

  return null;
}
