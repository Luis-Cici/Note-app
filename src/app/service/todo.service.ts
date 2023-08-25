import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Todo } from '../compoents/addtodo/addtodo.component';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private fireService: AngularFirestore) {}

  createTodo(todo: Todo) {
    return this.fireService.collection('Todo').add(todo);
  }

  fetchTodo() {
    return this.fireService.collection('Todo').snapshotChanges();
  }

  updateTodo(todo: Todo) {
    return this.fireService.collection('Todo').doc(todo.id).update(todo);
  }

  deleteTodo(todo: Todo) {
    return this.fireService.collection('Todo').doc(todo.id).delete()
  }
}
