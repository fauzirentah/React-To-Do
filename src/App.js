import React, {useState, useEffect} from "react";
import './App.css';
// Import components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("All");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    const filterHandler = () => {
      switch(status) {
        case "completed":
          setFilteredTodos(todos.filter(todo => todo.completed === true));
          break;
        case "uncompleted":
          setFilteredTodos(todos.filter(todo => todo.completed === false));
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    };
    filterHandler();
    const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
  };
    saveLocalTodos();
  }, [todos, status]);

  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
      <h1>React To-Do List</h1>
      </header>
      <Form 
        todos={todos} 
        setTodos={setTodos} 
        inputText={inputText} 
        setInputText={setInputText} 
        setStatus={setStatus}
      />
      <TodoList 
        filteredTodos={filteredTodos} 
        setTodos={setTodos} 
        todos={todos}
      />
    </div>
  );
}

export default App;
