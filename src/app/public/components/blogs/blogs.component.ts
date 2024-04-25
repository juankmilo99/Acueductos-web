import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../core/services/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit {
  blogs: any[] = [];

  constructor(private tasksService: TasksService,private router: Router) { }

  ngOnInit(): void {
    this.tasksService.obtenerBlogs().subscribe(
      (res: any) => {
        this.blogs = res.blogResponse.blogPosts; // Ajusta esto según la estructura de tus datos
        
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  public abrirDetailBlog(codBlog:any): void {
    this.router.navigate(['/public/blogs/detail/'+ codBlog]);
  }

}
