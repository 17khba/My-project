(function (exports) {
	'use strict';

	var filters = {
		all: function (todos) {
			return todos;
		},
		active: function (todos) {
			return todos.filter(function (todo) {
				return !todo.completed;
			})
		},
		completed: function (todos) {
			return todos.filter(function (todo) {
				return todo.completed;
			})
		}
	};

	// Your starting point. Enjoy the ride!
	exports.app = new Vue({
		el: '.todoapp',
		data: {
			todos: todoStorage.fetch(),
			newTodo: '',
			editedTodo: null,
			visibility: 'all'
		},
		computed: {
			remaining: function () {
				return filters.active(this.todos).length;
			},
			allDone: {
				get: function () {
					return this.remaining === 0;
				},
				set: function (value) {
					this.todos.forEach(function(el, index) {
						el.completed = value;
					});
				}
			},
			// 查：根据路由hash调用不同处理程序实现todos的筛选
			filterTodos: function () {
				return filters[this.visibility](this.todos);
			}
		},
		watch: {
			todos: {
				deep: true,
				handler: todoStorage.save
			}
		},
		methods: {
			pluralize (word, count) {
				return word + (count === 1 ? '' : 's');
			},
			// 增：新增待办项逻辑
			addTodo () {
				var val = this.newTodo && this.newTodo.trim();
				if (!val) return;
				this.todos.push({title: val, completed: false});
				this.newTodo = ''
			},
			editTodo (todo) {
				// 记录待办项的原始值
				this.beforeEditCache = todo.title;
				this.editedTodo = todo;
			},
			cancelEdit (todo) {
				todo.title = this.beforeEditCache;
				this.editedTodo = null;
			},
			// 改：回车确认输入和光标失去焦点处理程序
			doneEdit (todo) {
				todo.title = todo.title.trim();
				this.editedTodo = null;
				if (!todo.title) {
					this.removeTodo(todo);
				}
			},
			// 删：删除待办项处理程序
			removeTodo (todo) {
				var index = this.todos.indexOf(todo);
				this.todos.splice(index, 1);
			},
			// 移除已完成的待办项
			removeCompleted () {
				this.todos = filters.active(this.todos);
			}
		},
		directives: {
			// 自定义指令（双击聚焦）
			'todo-focus': function (el, binding) {
				if (binding.value) el.focus();
			}
		}
	});

})(window);
