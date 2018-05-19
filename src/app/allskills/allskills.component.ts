import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Action } from 'rxjs/scheduler/Action';
import { forEach } from '@firebase/util';
import { Router } from '@angular/router';



@Component({
  selector: 'app-allskills',
  templateUrl: './allskills.component.html',
  styleUrls: ['./allskills.component.css']
})
export class AllskillsComponent implements OnInit {
   
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

  constructor(public db: AngularFireDatabase ,public router:Router) { 
    this.itemList = db.list('skills');
    this.itemList.snapshotChanges().subscribe(actions=> {
        actions.forEach(action=> {
          let y = action.payload.toJSON()
          y['$key'] = action.key
          this.itemArray.push(y as ListItemArrayClass)
        })
      })

    console.log(this.itemArray)

  }
   

  ngOnInit() 
  {
  
  }

  moreInfo(key)
  {
    
    this.router.navigate(['details/'+key])
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