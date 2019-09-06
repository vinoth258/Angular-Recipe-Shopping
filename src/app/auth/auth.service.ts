import { Injectable } from '../../../node_modules/@angular/core';
import { HttpClient, HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { catchError, tap } from '../../../node_modules/rxjs/operators';
import { throwError, Subject } from '../../../node_modules/rxjs';
import { User } from './user.model';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn : 'root'})
export class AuthService {

    user = new Subject<User>();
    constructor(private http: HttpClient) {}

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBQaKonz9S4SqSa1z7Fw9F-VSl3Zglrnic', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn)
        }))
    }


    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBQaKonz9S4SqSa1z7Fw9F-VSl3Zglrnic',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn)
        }));
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: string) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn *1000);
        const user = new User (email, userId, token, expirationDate);
        this.user.next(user);
    }    

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = "An unknown error occurred!!";
        if(! errorRes.error || ! errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message) {
            case "EMAIL_EXISTS" : 
                errorMessage = "Email already exists!!";
                break;
            
            case "EMAIL_NOT_FOUND" :
                errorMessage = "Email does not exists!!";
                break;

            case "INVALID_PASSWORD" :
                errorMessage = "Invalid Password!!";
                break;
                                
        }
        return throwError(errorMessage);
    }
}