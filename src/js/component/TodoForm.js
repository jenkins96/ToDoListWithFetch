import React, { useState } from "react";
import PropTypes from "prop-types";
// TodoForm Component
function TodoForm({ addTodo }) {
	const [value, setValue] = useState("");

	const handleSubmit = e => {
		e.preventDefault();
		if (!value) return;
		addTodo(value);
		setValue("");
	};

	return (
		<form onSubmit={handleSubmit} className="">
			<input
				type="text"
				className="input"
				value={value}
				onChange={e => setValue(e.target.value)}
				placeholder="No tasks, add a task"
			/>
		</form>
	);
}
TodoForm.propTypes = {
	addTodo: PropTypes.func
};
export default TodoForm;
