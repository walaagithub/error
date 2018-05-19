import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Action } from 'rxjs/scheduler/Action';
import { forEach } from '@firebase/util';
import { Router} from '@angular/router';

@Component({
  selector: 'app-myskill',
  templateUrl: './myskill.component.html',
  styleUrls: ['./myskill.component.css']
})



export class MyskillComponent implements OnInit {


  itemList: AngularFireList<any>;
  itemArray = []

  data=
{
  name:'',
  phone:'',
  province:'',
  skill:'',
  price:'',
  comments:''

}

myUid:any


  constructor(public db: AngularFireDatabase ,public router:Router) {
    this.itemList = db.list('skills');
    this.itemList.snapshotChanges().subscribe(actions=> {
        actions.forEach(action=> {
          let y = action.payload.toJSON()
          y['$key'] = action.key
          this.itemArray.push(y as ListItemArrayClass)
        })
      })

      this.myUid=localStorage.getItem('uid')

    console.log(this.itemArray)
  }

  ngOnInit() {
  }

  editForm($key) {
    for (let value of this.itemArray) {
      
      if (value['$key'] == $key) {
        console.log(value['key'])
        this.data.name = value['name'];
        this.data.phone = value['phone'];
        this.data.province = value['province'];
        this.data.skill = value['skill'];
        this.data.price = value['price'];
        this.data.comments = value['comments'];
      }
    }
  }

  onEdit($key)
   {
    this.data.name 
    this.data.phone 
    this.data.province 
    this.data.skill
    this.data.price
    this.data.comments 

  //   console.log(" key: " + $key + "name : " + this.data.name + " phone :" + this.data.phone + " province : " + this.data.province + " skill : " +  this.data.skill + " price : " + this.data.price + " comment : " + this.data.comments )
  // 
  this.itemList.set($key , {
    name:this.data.name,
    phone:this.data.phone,
    province:this.data.province,
    skill:this.data.skill,
    price:this.data.price,
    comments:this.data.comments
  })

  this.itemArray = []
  
   }



  onDelete($key) {
    this.itemList.remove($key);
    this.itemArray = []
  }
}

export class ListItemArrayClass {
  $key: string;
  name: string;
  phone: string;
  province: string;
  skill: string;
  price: string;
  comments: string;
}



