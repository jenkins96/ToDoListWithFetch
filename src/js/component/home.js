// Importing
import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import Todo from "./Todo.js";

// Component
export function Home() {
	useEffect(() => {
		let url = "https://assets.breatheco.de/apis/fake/todos/user/jenkins96";

		// PARA REVISAR QUE ESTE LEYENDO LOS TODOS QUE YA ESTAN POR DEFECTO
		const getFetch = fetch(url, {
			method: "GET",
			//body: JSON.stringify(todos),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				//return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				//console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
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
						label={todo}
						done="false"
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
