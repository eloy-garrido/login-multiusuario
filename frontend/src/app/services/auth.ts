import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: string;
  username: string;
  role: string;
  name: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  
  // Signals para manejo de estado
  currentUser = signal<User | null>(null);
  isLoggedIn = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      username,
      password
    });
  }

  setUser(user: User) {
    this.currentUser.set(user);
    this.isLoggedIn.set(true);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout() {
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    localStorage.removeItem('currentUser');
  }

  checkStoredUser() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.setUser(user);
    }
  }
}