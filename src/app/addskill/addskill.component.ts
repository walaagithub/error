import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router} from '@angular/router';


@Component({
  selector: 'app-addskill',
  templateUrl: './addskill.component.html',
  styleUrls: ['./addskill.component.css']
})
export class AddskillComponent implements OnInit {
//var
// name :string ='walaa'
// phone : number
// province :string
// skill :string
// price:number
// comments :string

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
 
// items:Observable<any[]>;
itemList: AngularFireList<any>;

  constructor(public db:AngularFireDatabase ,public router:Router) {
    //location to save database
    this.itemList = db.list('skills');
   }

  ngOnInit() {

    console.log(this.data.name);
  }


  insertSkill()
  {
   this.itemList.push({
    name:this.data.name,
    phone:this.data.phone,
    province:this.data.province,
    skill:this.data.skill,
    price:this.data.price,
    comments:this.data.comments


   
   })

   this.router.navigate(['/myskill']);
  }
}
