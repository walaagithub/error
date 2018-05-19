import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import{ AngularFireAuth} from 'angularfire2/auth'
import { Router} from '@angular/router';


import { Path } from '@firebase/database/dist/src/core/util/Path';


@Component({
  selector: 'app-addskill',
  templateUrl: './addskill.component.html',
  styleUrls: ['./addskill.component.css']
})
export class AddskillComponent implements OnInit {

//object
data=
{
  name:'',
  phone:'',
  province:'',
  skill:'',
  price:'',
  comments:''

}

email:string='';
uid: any;
 
itemList: AngularFireList<any>;

  constructor( private fire:AngularFireAuth,public db:AngularFireDatabase ,public router:Router) {
    //location to save database
    this.itemList = db.list('skills');
   }

  ngOnInit() {
let user= localStorage.getItem('email')
this.email=user
console.log(user);
console.log('-------------------------');



this.uid =localStorage.getItem('uid')
    console.log('uid : '+ this.uid);


    // this.fire.authState.subscribe(auth=>{

    //   if(auth){

    //     this.uid =auth.uid
    //     console.log('uis: ' + this.uid);
    //   }
    // })
  }

  insertSkill()
  {
   this.itemList.push({
    name:this.data.name,
    phone:this.data.phone,
    province:this.data.province,
    skill:this.data.skill,
    price:this.data.price,
    comments:this.data.comments,
    email:this.email,
    uid:this.uid
   })

   this.router.navigate(['/myskill']);
  }
}
