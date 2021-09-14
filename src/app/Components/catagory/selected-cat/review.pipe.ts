import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/_models/user';
@Pipe({
  name: 'review'
})
export class ReviewPipe implements PipeTransform {

  transform( Developers:User[],   searchRate:String): User[] {
    if (!Developers || ! searchRate){
      return Developers ;
    }

    return Developers.filter( User =>

      User.rate.toString().toLocaleLowerCase().includes( searchRate.toLowerCase())  
)
  }

}
