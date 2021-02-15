import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private paginaPosts = 0;
  constructor(private httpClient:HttpClient ) { }

  getPosts() {
    this.paginaPosts++;
    return this.httpClient.get(`${URL}/posts/?pagina=${this.paginaPosts}`)
  }
}
