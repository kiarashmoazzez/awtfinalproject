import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Headers, Http, RequestOptions} from '@angular/http';

@Injectable()
export class QuestionService {

    options;
    currentUser = JSON.parse(localStorage.getItem('user'));
    currentCourse = JSON.parse(localStorage.getItem('course'));
    currentSession = this.currentCourse.sessions;

    constructor(private authService: AuthService,
                private http: Http) {
    }

    // Function to create headers, add token, to be used in HTTP requests
    createAuthenticationHeaders() {
        this.authService.loadToken(); // Get token so it can be attached to headers
        // Headers configuration options
        this.options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json', // Format set to JSON
                'authorization': this.authService.authToken // Attach token
            })
        });
    }

// Function to create a new blog post
    newQuestion(question) {
        question.user = this.currentUser;
        question.course = this.currentCourse;
        question.session = this.currentSession;

        console.log(question);
        this.createAuthenticationHeaders(); // Create headers
        return this.http.post('api/questions/newQuestion', question, this.options).map(res => res.json());
    }
    newAnswer(data) {
        console.log(data);
        this.createAuthenticationHeaders(); // Create headers
        return this.http.post('api/questions/newAnswer', data, this.options).map(res => res.json());
    }
    newLike(data) {
        console.log(data);
        this.createAuthenticationHeaders(); // Create headers
        return this.http.post('api/questions/newLike', data, this.options).map(res => res.json());
    }

    getQuestions(courseAndSession) {
        return this.http.post('api/questions/getQuestions', courseAndSession, this.options).map(res => res.json());
    }

    getAnswers(courseAndSession) {
        return this.http.post('api/questions/getQuestions', courseAndSession, this.options).map(res => res.json());
    }

}