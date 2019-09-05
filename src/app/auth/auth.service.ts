import { Injectable } from '../../../node_modules/@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';

interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string
}

@Injectable({providedIn : 'root'})
export class AuthService {

    constructor(private http: HttpClient) {}

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBQaKonz9S4SqSa1z7Fw9F-VSl3Zglrnic', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
    }
}