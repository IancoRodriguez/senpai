import react from "react";

export function TodoItem( {todo, toggleTodo} ) {
    const {id, task, completed} = todo;
    console.log(todo)

    const handleTodoClick = () => { 
        toggleTodo(id);
    }

    return (
    <li>
        <input type="checkbox" checked={completed} onChange = { handleTodoClick}></input>
        {task}
    </li>
    );
}