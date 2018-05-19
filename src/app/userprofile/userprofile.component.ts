import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import{ AngularFireStorage, AngularFireStorageReference ,AngularFireUploadTask   } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  email: string;
  myid: any
  itemList: AngularFireList<any>;
  itemArray = []
  userKey: any

  ref:AngularFireStorageReference;
  task:AngularFireUploadTask;

  data =
    {
      $key: '',
      name: '',
      phone: '',
      age: '',
      address: '',
      city: '',
      job: '',
      email: ''

    }

  constructor(private afStorage: AngularFireStorage,public db: AngularFireDatabase) {
    this.email = localStorage.getItem('email');
    this.myid = localStorage.getItem('uid');


    this.itemList = db.list('user');
    this.itemList.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let y = action.payload.toJSON()
        y['$key'] = action.key
        this.userKey

        if (action.payload.child('uid').val() == this.myid) {
          this.userKey = action.key
          this.itemArray.push(y as ListItemArrayClass)
          this.data.name = this.itemArray[0]['name']
          this.data.phone = this.itemArray[0]['phone']
          this.data.age = this.itemArray[0]['age']
          this.data.address = this.itemArray[0]['address']
          this.data.city = this.itemArray[0]['city']
          this.data.job = this.itemArray[0]['job']
          this.data.email = this.itemArray[0]['email']
          console.log("userkey " + this.userKey)
      

        }
      })
    })
  }


  onEdit() {
    this.itemList.set(this.myid, {
      name: this.data.name,
      phone: this.data.phone,
      age: this.data.age,
      address: this.data.address,
      city: this.data.city,
      job: this.data.job,
      email: this.email,
      uid: this.myid
    })

  }

  ngOnInit() {
    console.log(this.email)
    // console.log(this.myid)
    console.log(this.data)
  }




  upload(event)
  {
    const id = Math.random().toString(36).substring(2);//يعمل اسم عشوائي
    this.ref =this.afStorage.ref(id);// نحديد مكان الستورج
    this.task = this.ref.put(event.target.file[0]);//رفع الصورة مع الستورج

  }

}
export class ListItemArrayClass {
  $key: string;
  name: string;
  phone: string;
  age: string;
  address: string;
  city: string;
  job: string;
  email: string;
}
