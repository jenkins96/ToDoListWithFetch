// Importing
import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import Todo from "./Todo.js";

// Component
export function Home() {
	let url = "https://assets.breatheco.de/apis/fake/todos/user/jenkins96";

	const getFetch = async () => {
		await fetch(url, {
			method: "GET", // or 'PUT'
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => {
				return res.json();
				//setTodos(res.json());
			})
			.then(response => setTodos(response))
			.catch(error => console.error("Error:", error));
	};
	useEffect(() => {
		getFetch();
		//console.log(getFetch());
	}, []);

	const fetchPut = newArray => {
		fetch(url, {
			method: "PUT", // or 'PUT'
			body: JSON.stringify(newArray), // data can be `string` or {object}!
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => {
				if (res.status == 200) {
					setTodos(newArray);
				}
			})
			.catch(error => console.error("Error:", error))
			.then(response => console.log("Success:", response));
	};

	// Setting my "todos"  to an empty array
	const [todos, setTodos] = useState([]);

	// Adding an element
	const addTodo = text => {
		const newTodos = [
			...todos,
			{
				label: text,
				done: false
			}
		];
		fetchPut(newTodos);
		//setTodos(newTodos);
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
						todo={todo.label}
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
