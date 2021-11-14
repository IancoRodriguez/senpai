import react, {useState, Fragment, useRef, useEffect} from "react";
import { TodoList } from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";
import './components/styles/App.css'
import { Route, Switch } from "react-router-dom";



const KEY = 'todoApp.todos'

export function App() {
    const [todos, setTodos] = useState([
        {id:1, task: 'Tarea 1', completed: false}
    ]);

    const todoTaskRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if(storedTodos) {
            setTodos(storedTodos);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos]);

    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id );
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }

    const handleTodoAdd = () =>{
        const task = todoTaskRef.current.value;
        if(task ==="") return;

        setTodos((prevTodos) =>{
            return [...prevTodos, {id: uuidv4(), task, completed: false}]
        })

        todoTaskRef.current.value = null;

    };

    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    }
    return (
        <Fragment>
            <Switch>
                <Route exact path='/'>
                    <div>Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar </div>
                    <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea"/>
                    <button onClick={handleTodoAdd}>➕</button>
                    <button onClick={handleClearAll}>🗑</button>
                    <TodoList todos={todos} toggleTodo={toggleTodo} />
                </Route>
                <Route exact path='/ruta2'>
                Soy otra ruta
                </Route>
            </Switch> 
        </Fragment>
    )
}