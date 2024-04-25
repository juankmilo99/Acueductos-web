import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../../../core/services/tasks.service';
import { marked } from 'marked';



@Component({
  selector: 'app-detail-blogs',
  templateUrl: './detail-blogs.component.html',
  styleUrl: './detail-blogs.component.css'
})
export class DetailBlogsComponent implements OnInit {
  blog: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('codigo');    

    this.tasksService.obtenerBlogsId(id).subscribe(
      (res: any) => {
        this.blog = res.blogResponse.blogPosts.map((blogPost: any) => ({
          ...blogPost,
          content: marked(blogPost.content)
        }));      
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
