import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient:HttpClient) { }

  baseUrl="http://localhost:8000/api/task/";

  headers = new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization':'Bearer '+JSON.parse(localStorage.getItem('token')||'{}')
  })

  getAllTasks(){
    return this.httpClient.get(this.baseUrl ,{headers:this.headers});
  }
  getTask(id:any){
    return this.httpClient.get(this.baseUrl + id ,{headers:this.headers})
  }

  addTask(task:any, id:any){
    return this.httpClient.post(this.baseUrl+id , task );
  }

  updateTask(id:any,task:any){
    return this.httpClient.put(`${this.baseUrl}${id}`, task );
  }

  makeAccepted(project_id:any){
    return this.httpClient.post(`${this.baseUrl}accept/${project_id}`,{headers:this.headers});
  }
  deleteTask(id:any){
    return this.httpClient.delete(this.baseUrl + id,{headers:this.headers});
  }




  getActiveProjects(id:any){
    return this.httpClient.get(this. baseUrl +'active/'+ id ,{headers:this.headers});
  }

  download(fileName: string): Observable <Blob> {
    return this.httpClient.get(fileName, {
      responseType: 'blob'
    })
  }

}