/*
 * @FilePath: \TodoAppDemo\pages\todos\todos.js
 * @Description:  
 * @Author: SurpassIllusion 
 * @Date: 2023-09-20 20:37:43
 * @LastEditors: SurpassIllusion 
 */
const app = getApp();
Page({
  data: {
    input: '',
    todos: [],
    leftCount: 0,
    logs: [],
    allCompleted: false,
  },
  save() {
    my.setStorageSync({key:'todo_list', data:this.data.todos});
    my.setStorageSync({key:'todo_logs', data:this.data.logs});
  },
  onLoad() {
    app.getUserInfo().then(userInfo => {
      this.setData(userInfo);
    }, err => { });
    var todos = my.getStorageSync({key:'todo_list'}).data;
    if (todos) {
      var leftCount = todos.filter(item => {
        return !item.completed;
      }).length;
      this.setData({ todos: todos, leftCount: leftCount });
    }
    var logs = my.getStorageSync({key:'todo_logs'}).data;
    if (logs) {
      this.setData({ logs: logs });
    }
  },
  inputChangeHandle(e) {
    this.setData({ input: e.detail.value });
  },
  addTodoHandle(e) {
    if (!this.data.input || !this.data.input.trim()) return;
    var todos = this.data.todos;
    todos.push({ name: this.data.input, completed: false });
    var logs = this.data.logs;
    logs.push({ timestamp: new Date(), action: 'Add', name: this.data.input });
    this.setData({
      input: '',
      todos: todos,
      leftCount: this.data.leftCount + 1,
      logs: logs
    });
    this.save();
  },
  toggleAllHandle(e) {
    this.data.allCompleted = !this.data.allCompleted;
    var todos = this.data.todos;
    for (var i = todos.length - 1; i >= 0; i--) {
      todos[i].completed = this.data.allCompleted;
    }
    var logs = this.data.logs;
    logs.push({
      timestamp: new Date(),
      action: this.data.allCompleted ? 'Finish' : 'Restart',
      name: 'All todos'
    });
    this.setData({
      todos: todos,
      leftCount: this.data.allCompleted ? 0 : todos.length,
      logs: logs
    });
    this.save();
  },
  clearCompletedHandle(e) {
    var todos = this.data.todos;
    var remains = [];
    for (var i = 0; i < todos.length; i++) {
      todos[i].completed || remains.push(todos[i]);
    }
    var logs = this.data.logs;
    logs.push({
      timestamp: new Date(),
      action: 'Clear',
      name: 'Completed todo'
    });
    this.setData({ todos: remains, logs: logs });
    this.save();
  },
  toggleTodoHandle(e) {
    var index = e.currentTarget.dataset.index;
    var todos = this.data.todos;
    todos[index].completed = !todos[index].completed;
    var logs = this.data.logs;
    logs.push({
      timestamp: new Date(),
      action: todos[index].completed ? 'Finish' : 'Restart',
      name: todos[index].name
    });
    this.setData({
      todos: todos,
      leftCount: this.data.leftCount + (todos[index].completed ? -1 : 1),
      logs: logs
    });
    this.save();
  }

});
