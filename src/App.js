import './App.css';
import {useState,useRef,useEffect} from 'react';

function App() {
  
  const [todo,setTodo] = useState('');
  const [todos,setTodos]  = useState([]);
  const [editId,setEditId] = useState(0);
  const inpuRef = useRef('null');


  // ******** USEEFFECT FOR FOCUS THE INPUT FILED ********//
  useEffect(() => {
    inpuRef.current.focus()
  },[])


  // ******** TODO APP ADDING FUNCTION ********//
  const addTods = () =>{
    if(todo !== ''){
      setTodos([...todos,{ list : todo, id : Date.now(),status:false}])
      setTodo('')
    }
    if(editId){
      const editTodo = todos.find((todo) => todo.id === editId)
      const updateTodo = todos.map((value) => value.id === editTodo.id 
      ?  (value ={id : value.id , list : todo})
      :  (value = {id: value.id,list : value.list}))
      setTodos(updateTodo)
      setEditId(0)
      setTodo('')
    }
  }   


  // ******** TODO APP DELETING FUNCTION ********//
  const onDelete = (id) => {
    setTodos(todos.filter((to) => to.id !== id))
  }


  // ******** TODO APP COMPLITED LIST MARKING FUNCTION ********//
  const onComplete = (id) => {
    let complete = todos.map((value) =>{
      if(value.id === id){
        return ({...value, status : !value.status})
      }
      return value
    })
    setTodos(complete)
  }

  
  // ******** TODO APP EDITING FUNCTION ********//
  const onEdit  = (id) => {
    const editTodo =  todos.find((value) => value.id === id);
    setTodo(editTodo.list)
    setEditId(editTodo.id)
  }

  
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input value={todo} ref={inpuRef} onChange = {(e)=>{setTodo(e.target.value)}} type="text" placeholder="🖊️ Add item..." />
        <i title='Add' onClick={addTods} className={editId ?"fas fa-edit" : "fas fa-plus"}></i>
      </div>
      <div className="todos">
        {
          todos.map((value) => {
            return(
              <div className="todo">
            <div className="left">
              <input onClick={() => onComplete(value.id)} type="checkbox" name="" id="" />
              <p id={value.status === true ? 'list':''} key = {value.id}>{value.list}</p>
            </div>
            <div className="right">
              <i title='Edit' onClick={() => onEdit(value.id)} className="fas fa-edit"></i>
              <i title='Delete' onClick={() => onDelete(value.id)} className="fas fa-times"></i>
            </div>
          </div>
            )
          })
        }
      </div>

    </div>
  );
}

export default App;
