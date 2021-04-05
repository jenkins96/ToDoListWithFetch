// Importing
import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import Todo from "./Todo.js";

/*

PENDIENTES

1) POST de array vacio para inicializar 

*/

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

	const deleteFetch = () => {
		fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				console.log(response);
				setTodos([]);
			})
			.catch(error => console.error("Error:", error));
	};

	// UseEffect() runs one time with getFetch()
	useEffect(() => {
		getTodos();
	}, []);

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

	/*const postFetch = () => {
		fetch(url, {
			method: "POST",
			body: [],
			headers: {
				"Content-Type": "application/json"
			}
		}).then(response => {
			console.log(response);
		});
	};*/
	// Setting my "todos"  to an empty array
	const [todos, setTodos] = useState([]);

	// Adding an element
	const addTodo = text => {
		const newTodos = [
			...todos, // old array + object with properties server requires
			{
				label: text,
				done: false
			}
		];
		putTodo(newTodos); // Calling fetchPut()
	};

	// Removing an element
	const removeTodo = index => {
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		putTodo(newTodos); // Calling fetchPut()
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
				onClick={deleteFetch}>
				Clear Todos!
			</button>
		</div>
	);
}
