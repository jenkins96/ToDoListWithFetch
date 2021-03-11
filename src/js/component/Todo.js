import React from "react";
import PropTypes from "prop-types";

// Todo Component
function Todo({ todo, index, removeTodo }) {
	return (
		<div className="todo my-3 bg-warning">
			{todo}
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
	todo: PropTypes.string,
	index: PropTypes.number,
	removeTodo: PropTypes.func,
	done: PropTypes.string,
	label: PropTypes.string
};
export default Todo;
