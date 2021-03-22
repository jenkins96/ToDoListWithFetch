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

	//  const method: GET
	const getFetch = async () => {
		await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => {
				return res.json();
			})
			.then(response => setTodos(response)) //  response of server with initial todo list
			.catch(error => console.error("Error:", error));
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
		getFetch();
	}, []);

	//  const method: PUT
	const fetchPut = newArray => {
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(newArray),
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
		fetchPut(newTodos); // Calling fetchPut()
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
