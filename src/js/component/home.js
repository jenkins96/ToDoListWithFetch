// Importing
import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import Todo from "./Todo.js";

/*
---------------------------------------------------------------------------------
ESTEBAN, SIEMPRE DEJEME UN "TODO" EN LA LISTA XQ SI ME BORRA TODOS SE ME DESPICHA 
YA QUE EL "POST" YO LO HICE DESDE POSTMAN.
---------------------------------------------------------------------------------
PENDIENTES

1) Si usuario no existe crear un POST con empty array para iniciar. Esto fue lo que hice desde el POSTMAN que debe hacerse desde aqui.

2) Hacer un metodo: DELETE para eliminar todos los elementos de la lista, ojo este borra todo el "todo list" junto con el usuario,
por lo que el primer pendiente es necesario. 
El boton "Clear Todos!" ya existe pero actualmente solo actualiza el "todo" en la pagina, no realiza nada en el servidor.

*/

// Component
export function Home() {
	let url = "https://assets.breatheco.de/apis/fake/todos/user/jenkas44";

	//  const method: GET
	const getFetch = async () => {
		return await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => {
				return res.json();
			})
			.then(response => console.log(response)) //  response of server with initial todo list
			.catch(error => console.error("Error:", error));
	};

	// UseEffect() runs one time with getFetch()
	useEffect(() => {
		//getFetch();
		async function loadInitialItems() {
			console.log("ENTREEEE");
			await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(res => {
					console.log(res.status);
					if (res.status == 200) {
						return res.json();
					} else {
						// hacer POST []
						return fetchPost();
					}
				})
				.then(response => {
					console.log(response);
					setTodos(response);
				}) //  response of server with initial todo list
				.catch(error => console.error("Error:", error));
		}
		loadInitialItems();
	}, []);

	const fetchPost = async _ => {
		console.log("ENTRE POST");
		await fetch(url, {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => {
				if (res.ok) {
					console.log("LLAMANDO A GET");
					return getFetch();
				} else {
					throw new Error("Comunicacion mala");
				}
			})
			.catch(error => console.error("Error:", error));
	};

	//  const method: PUT
	const fetchPut = async newArray => {
		await fetch(url, {
			method: "PUT",
			body: JSON.stringify(newArray),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				if (response.ok) {
					return getFetch();
				} else {
					throw new Error("Comunicacion mala");
				}
			})

			.catch(error => console.error("Error:", error));
	};

	// Setting my "todos"  to an empty array
	const [todos, setTodos] = useState([]);

	// Adding an element
	const addTodo = text => {
		console.log(text);
		console.log(todos);
		const newTodos = [
			...todos, // old array + object with properties server requires
			{
				label: text,
				done: false
			}
		];
		fetchPut(newTodos); // Calling fetchPut()
		setTodos(newTodos);
	};

	// Removing an element
	const removeTodo = index => {
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		fetchPut(newTodos); // Calling fetchPut()
	};

	return (
		<div className="container text-center mt-5">
			<Header />
			<TodoForm addTodo={addTodo} />
			<div className="todo-list">
				{(todos || []).map((todo, index) => (
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
