import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/servicios/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private postsService:PostsService ) {}

  ngOnInit() {
    this.postsService.getPosts().subscribe((data)=>{
      console.log(data);
    });
  }
}
