// Importing
import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import Todo from "./Todo.js";

// Component
export function Home() {
	useEffect(() => {
		let url = "https://assets.breatheco.de/apis/fake/todos/user/jenkins96";

		fetch(url, {
			method: "GET", // or 'PUT'
			//body: JSON.stringify(todos), // data can be `string` or {object}!
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.catch(error => console.error("Error:", error))
			.then(response => console.log("Success:", response));
	});

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
