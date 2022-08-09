import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isLoggedIn() {
    const token = localStorage.getItem('token'); // get token from local storage
    if (token && token !== 'undefined') {
      const payload = atob(token.split('.')[1]); // decode payload of token
      const parsedPayload = JSON.parse(payload); // convert payload into an Object

      return parsedPayload.exp > Date.now() / 1000; // check if token is expired
    } else {
      localStorage.removeItem('token');
      return false;
    }
  }

  getLogInUser() {
    const token = localStorage.getItem('token'); // get token from local storage
    if (token) {
      const payload = atob(token.split('.')[1]); // decode payload of token
      const parsedPayload = JSON.parse(payload); // convert payload into an Object

      if (parsedPayload.exp > Date.now() / 1000) // check if token is expired
        return parsedPayload;

    }
    return null;
  }
}
