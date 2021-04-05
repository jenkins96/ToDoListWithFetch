// Importing
import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import Todo from "./Todo.js";

// Component
export function Home() {
	let url = "https://assets.breatheco.de/apis/fake/todos/user/jenkins96";

	/* -----------------------------------------------------------
                            GET REQUEST
    -------------------------------------------------------------*/
	const getTodos = async () => {
		try {
			const response = await fetch(url);
			if (response.ok) {
				const jsonResponse = await response.json();
				setTodos(jsonResponse);
				return;
			}
			throw new Error("Request has failed!");
		} catch (error) {
			console.log(error);
		}
	};

	// UseEffect() runs one time with getFetch()
	useEffect(() => {
		getTodos();
	}, []);

	/* -----------------------------------------------------------
                            POST REQUEST
    -------------------------------------------------------------*/
	const postTodo = async () => {
		try {
			const response = await fetch(url, {
				method: "POST",
				body: JSON.stringify([]),
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				const jsonResponse = await response.json();
				console.log(jsonResponse);
				return;
			}
			throw new Error("Request Failed!");
		} catch (error) {
			console.log(error);
		}
	};

	/* -----------------------------------------------------------
                            DELETE REQUEST
    -------------------------------------------------------------*/
	const deleteTodos = async () => {
		try {
			const response = await fetch(url, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				postTodo();
				setTodos([]);
				return;
			}
			throw new Error("Request Failed!");
		} catch (error) {
			console.log(error);
		}
	};

	/* -----------------------------------------------------------
                            PUT REQUEST
    -------------------------------------------------------------*/
	const putTodo = async newArray => {
		try {
			const response = await fetch(url, {
				method: "PUT",
				body: JSON.stringify(newArray),
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				setTodos(newArray);
				return;
			}
			throw new Error("Request Failed!");
		} catch (error) {
			console.log(error);
		}
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
		putTodo(newTodos);
	};

	// Removing an element
	const removeTodo = index => {
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		putTodo(newTodos);
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
				onClick={deleteTodos}>
				Clear Todos!
			</button>
		</div>
	);
}
