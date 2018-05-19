import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  itemList: AngularFireList<any>;
  itemArray = []
  id: any

  data =
    {
      name: '',
      phone: '',
      province: '',
      skill: '',
      price: '',
      comments: '',
      email:''

    }
  constructor(public db: AngularFireDatabase, private route: ActivatedRoute) {
    //ياخذ الرقم من url
    this.route.params.subscribe(params => {
      this.id = params;
      this.itemList = db.list('skills');
      this.itemList.snapshotChanges().subscribe(actions => {
        actions.forEach(action => {
          let y = action.payload.toJSON()
          y['$key'] = action.key

          if (action.key === this.id['id']) {
            this.itemArray.push(y as ListItemArrayClass)
            this.data.name=this.itemArray[0]['name']
            this.data.phone=this.itemArray[0]['phone']
            this.data.province=this.itemArray[0]['province']
            this.data.skill=this.itemArray[0]['skill']
            this.data.price=this.itemArray[0]['price']
            this.data.comments=this.itemArray[0]['comments']
            this.data.email=this.itemArray[0]['email']
           
          }
        })
      })
    })
  }

  ngOnInit() {
    console.log(" id : "+ this.id['id'])
    console.log(this.data)
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
  email:string;
}