import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionManagementService {
  private sessionKey = 'user_session';

  setSession(sessionData: any): void {
    localStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
  }

  getSession(): any | null {
    const session = localStorage.getItem(this.sessionKey);
    return session ? JSON.parse(session) : null;
  }

  endSession(): void {
    localStorage.removeItem(this.sessionKey);
  }

  isAuthenticated(): boolean {
    return !!this.getSession();
  }
}
