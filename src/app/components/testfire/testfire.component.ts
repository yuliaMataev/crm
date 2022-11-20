import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-testfire',
  templateUrl: './testfire.component.html',
  styleUrls: ['./testfire.component.css']
})
export class TestfireComponent implements OnInit {

  constructor(private afs:AngularFirestore) { }

  async ngOnInit(): Promise<void> {
    //this.afs.collection('test').doc('testdoc').set({firstName:"atara",lastName:"levi"}).then((a)=>console.log(a));
  //   const data=await this.readdoc('test/testdoc');
  //  console.log(data);
  // this.getalldocfrom ('test')
this.getCollectionInRealTime('test')

  }


  async readdoc(path:string){
    try{
   const doc=await this.afs.doc(path).ref.get();
   if(doc.exists){
   return doc.data();
   }
    return null;
   }
   catch(e){
    console.log(e);   
   }
  }

  getalldocfrom (collection:string){
    this.afs.collection(collection).ref.get().then((doc)=>{
      doc.forEach((doc) => {
        console.log(doc.data());     
    })
  }) 
    .catch((e)=>console.log(e)); 
  }

   getCollectionInRealTime(collection: string) { 
    this.afs.collection(collection).ref.onSnapshot((documents) => {
      documents.forEach((doc) => {
        console.log(doc.data());
      })
     },error => console.error(error))
  }

}
