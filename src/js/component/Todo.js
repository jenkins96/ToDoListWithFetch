import React from "react";
import PropTypes from "prop-types";

// Todo Component
function Todo({ todo, index, removeTodo, label, done }) {
	return (
		<div className="todo my-3 bg-warning">
			{todo.text}
			<div>
				<button
					className="bg-primary"
					onClick={() => removeTodo(index)}>
					<i className="fas fa-trash"></i>
				</button>
			</div>
		</div>
	);
}
Todo.propTypes = {
	todo: PropTypes.array,
	index: PropTypes.number,
	removeTodo: PropTypes.func,
	done: PropTypes.string,
	label: PropTypes.string
};
export default Todo;
