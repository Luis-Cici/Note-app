import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddtodoComponent, Todo } from './compoents/addtodo/addtodo.component';
import { TodoService } from './service/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'note-app';
  todoList!: Todo[];

  constructor(
    private dialogService: MatDialog,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.todoService.fetchTodo().subscribe((todos) => {
      this.todoList = todos.map((todoItem) => {
        const data = todoItem.payload.doc.data() as Todo;
        const id = todoItem.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  onAdd() {
    const dialogRef = this.dialogService.open(AddtodoComponent, {
      width: '400px',
      data: { id: '', name: '' },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res.name) {
        this.todoService.createTodo(res).then((todo) => console.log(todo));
      }
    });
  }

  onEdit(item: Todo) {
    const dialogRef = this.dialogService.open(AddtodoComponent, {
      width: '400px',
      data: { ...item },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res.name) {
        this.todoService.updateTodo(res).then((todo) => console.log(todo));
      }
    });
  }

  onDelete(item: Todo) {
    this.todoService.deleteTodo(item);
  }
}
