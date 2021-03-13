// Importing
import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import Todo from "./Todo.js";

/*
2) Hacer un metodo: DELETE para eliminar todos los elementos de la lista, ojo este borra todo el "todo list" junto con el usuario,
por lo que el primer pendiente es necesario. 
El boton "Clear Todos!" ya existe pero actualmente solo actualiza el "todo" en la pagina, no realiza nada en el servidor.

*/

// Component
export function Home() {
	// Setting my "todos"  to an empty array
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [hasError, setHasError] = useState(false);

	let url = "https://assets.breatheco.de/apis/fake/todos/user/jentesltlol";

	//  Get the array of Todos
	const getTodos = () => {
		setLoading(true);
		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(async response => {
				// Get (and halt execution) until we get json of body
				const data = await response.json();

				// Check if response is 2xx
				if (response.ok) {
					setTodos(data);
					setLoading(false);
				} else {
					// Set error message to whatever came (if any) or the status text (for sure comes)
					const error = (data && data.message) || response.statusText;
					return Promise.reject(error);
				}
			})
			.catch(() => {
				setHasError(true);
				setLoading(false);
			});
	};

	// When component is initialized, try to fetch todos. If failed, then create list for user
	useEffect(() => {
		setLoading(true);
		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(async response => {
				// Get (and halt execution) until we get json of body
				//const data = await res.json();

				// If reponse is 404 (user not found), then create new user
				if (response.status == 404) {
					const createUserResponse = await fetch(url, {
						method: "POST",
						body: JSON.stringify([]),
						headers: {
							"Content-Type": "application/json"
						}
					});
					if (createUserResponse.ok) {
						return getTodos();
					} else {
						// Set error message to whatever came (if any) or the status text (for sure comes)
						const error = "ERROR";
						return Promise.reject(error);
					}
				} else {
					// Set error message to whatever came (if any) or the status text (for sure comes)
					const error = "ERROR";
					return Promise.reject(error);
				}
			})
			.catch(() => {
				setHasError(true);
				setLoading(false);
			});
	}, []);

	// Adding an element
	const addTodo = text => {
		const newTodos = [
			...todos, // old array + object with properties server requires
			{
				label: text,
				done: false
			}
		];

		fetch(url, {
			method: "PUT",
			body: JSON.stringify(newTodos),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				// Check if response is 2xx
				if (response.ok) {
					return getTodos();
				} else {
					// Set error message to whatever came (if any) or the status text (for sure comes)
					const error = "ERROR";
					return Promise.reject(error);
				}
			})
			.catch(error => console.error("Error:", error));
	};

	// Adding an element
	const putTodos = _ => {
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(todos),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				// Check if response is 2xx
				if (response.ok) {
					return getTodos();
				} else {
					// Set error message to whatever came (if any) or the status text (for sure comes)
					const error = "ERROR";
					return Promise.reject(error);
				}
			})
			.catch(error => console.error("Error:", error));
	};

	// Removing an element
	// const removeTodo = index => {
	//  const newTodos = [...todos];
	//  newTodos.splice(index, 1);
	//  fetchPut(newTodos); // Calling fetchPut()
	// };

	return (
		<div className="container text-center mt-5">
			<Header />
			<TodoForm addTodo={addTodo} />
			<div className="todo-list">
				{loading ? (
					<div>Loading...</div>
				) : hasError ? (
					<div>Error occured.</div>
				) : (
					todos.map((todo, index) => (
						<Todo
							key={index}
							index={index}
							todo={todo.label}
							removeTodo={null}
						/>
					))
				)}
			</div>
			<button
				className="btn btn-danger my-3 text-white"
				onClick={() => setTodos([])}>
				Clear Todos!
			</button>
		</div>
	);
}
