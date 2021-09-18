import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import firebase from 'firebase/compat';

import { PostService } from 'src/app/services/post.service';
import Task from 'src/app/types/TaskType';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  posts: any[] = [];
  user?: firebase.User;
  subs: Subscription[] = [];
  todoTasks: Task[] = [
    {
      id: 1,
      title: 'Learn Rxjs',
      description: 'googling by my self',
      status: 'TODO',
    }
  ];
  inprogressTasks: Task[] = [
    {
      id: 2,
      title: 'Implement Rxjs',
      description: 'googling by my self',
      status: 'INPROGRESS',
    },
    {
      id: 3,
      title: 'Learn Pipe',
      description: 'googling by my self',
      status: 'INPROGRESS',
    }
  ];
  doneTasks: Task[] = [
    {
      id: 4,
      title: 'Reaching out to Rxjs',
      description: 'googling by my self',
      status: 'DONE',
    }
  ];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.subs.push(
      this.postService.getAllPost().subscribe(posts => {
        this.posts = posts;
      })
    )
  }

  ngOnDestroy(): void {
    this.subs.map(sub => sub.unsubscribe());
  }

}
