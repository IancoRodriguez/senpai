import react, {useState, Fragment, useRef, useEffect} from "react";
import { TodoList } from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";
import './components/styles/App.css'
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";



const KEY = 'todoApp.todos'

export function App() {
    const [todos, setTodos] = useState([]);

    const [task, setTask] = useState("");

    const [completed, setCompleted] = useState("");

    const [id, setId] = useState("");

    const todoTaskRef = useRef();

    useEffect( () => {
        fetch("http://localhost:4000/tareas")
        .then(data => data.json())
        .then(data => {
            setTodos(data)})
        .catch(error => console.log(error))
    },[]);

    



    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id );
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }

   const handleTodoAdd = () =>{
      fetch("http://localhost:4000/tareas", {
          method: "POST",
          headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
          }, 
          body: JSON.stringify({...todos})
      })
    .then((data) => data.json())
    .then(data => setTodos(todos.concat(data)))
    .catch(error => console.log(error))
    };

    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    }
    return (
        <Fragment>
            <Router>
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
            </Router>
        </Fragment>
    )
}

/*   useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if(storedTodos) {
            setTodos(storedTodos);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos]);
*/



  /* const handleTodoAdd = () =>{
        const task = todoTaskRef.current.value;
        if(task ==="") return;

        setTodos((prevTodos) =>{
            return [...prevTodos, {id: uuidv4(), task, completed: false}]
        })

        todoTaskRef.current.value = null;

    };
*/