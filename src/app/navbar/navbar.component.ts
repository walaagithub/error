import { Component, OnInit } from '@angular/core';


import { Router} from '@angular/router';
import{ AngularFireAuth} from 'angularfire2/auth'; 
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 user : Observable<firebase.User>;
 private isLoggedIn : Boolean=false;//تسجيل الدخول ام لا
 private emali :String;
  constructor(public afAuth:AngularFireAuth,public router:Router) {  
   
    let stats= localStorage.getItem('isLoggedIn')
    console.log(stats)

if (stats == 'true')
{
this.isLoggedIn=true;
}
else{
  if (stats =='false')
  this.isLoggedIn=false;
}
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     // User is signed in.

    //     this.isLoggedIn=true;
    //   } else {
    //     // No user is signed in.
    //     this.isLoggedIn=false;
    //     this.router.navigate(['/login']);

    //   }
    // });
    

   

  }

  ngOnInit() {
  }

  logout()
  {
    this.afAuth.auth.signOut();
    this.isLoggedIn=true;
    localStorage.setItem('isLoggedIn','false')
    this.router.navigate(['/login']);
  }

}
