/*import React from "react";
import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import Todo from "./Todo.js";

//create your first component
export function Home() {
    // Setting my "todos"  to an empty array
	const [todos, setTodos] = useState([]);

	// Adding an element
	const addTodo = text => {
		const newTodos = [...todos, { text }];
		setTodos(newTodos);
	};
	// Removing an element
	const removeTodo = index => {
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
    return (
		<div className="text-center mt-5">
			<Header />
            
		</div>
	);
}
*/
// Importing
import React, { useState } from "react";
import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import Todo from "./Todo.js";
/* Strategy, I will create three Components:
    Header: contains header
    TodoForm: contains the form with an input
    Todo: todo list
*/

// Component
export function Home() {
	let url = "https://assets.breatheco.de/apis/fake/todos/user/adrianjenkins";

	const getTodos = async () => {
		let res = await fetch(url);

		if (res.status == 404) {
			res = await fetch(url, {
				method: "POST",
				body: JSON.stringify(todos),
				headers: { "Content-Type": "application/json" }
			});
		} else {
			return res;
		}
	};
	// Setting my "todos"  to an empty array
	const [todos, setTodos] = useState([]);

	// Adding an element
	const addTodo = text => {
		const newTodos = [...todos, { text }];
		setTodos(newTodos);
	};
	// Removing an element
	const removeTodo = index => {
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
	};

	return (
		<div className="container text-center mt-5">
			<Header />
			<TodoForm addTodo={addTodo} />
			<div className="todo-list">
				{todos.map((todo, index) => (
					<Todo
						key={index}
						index={index}
						todo={todo}
						removeTodo={removeTodo}
					/>
				))}
			</div>
			<button
				className="btn btn-danger my-3 text-white"
				onClick={() => setTodos([])}>
				Clear Todos!
			</button>
		</div>
	);
}
