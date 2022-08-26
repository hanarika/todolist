
import { useEffect, useRef, useState } from "react";
import Todo from "./Todo";
import Service from "./assets/Service";
import { Link } from "react-router-dom";
import Moment from "moment";



function Todolist() {
/*let [inputTodo, setInputTodo] = useState("");
let [inputDate, setInputDate] = useState("");
let [todoList, settodoList] = useState (todos);*/
let inputTodoRef = useRef ("");
let inputDateRef = useRef ("");
let [todoList, setTodoList] = useState([]);
let [todoIndex, setTodoIndex] = useState(null);


   /*function handleInputText (element) {
      setInputTodo(()=> {
         inputTodo = element.target.value;
      });
   }*/
  
         /*function handleAddButton() {
         /*alert(inputTodo + " - " + inputDate);*/
         /* setInputDate
     }*/

async function loadListData() {
   
   const response = await Service.list();
   const data = response.data.data;
   setTodoList(() => data);
}

useEffect(() => {
   loadListData();
}, [])

    async function handleAddButton(e) {
      e.preventDefault();

      if (todoIndex != null) {
         await Service.update (
             { 
               name : inputTodoRef.current.value,
               date : inputDateRef.current.value,
             },
             todoIndex
          );
          setTodoIndex(() => null);
      } else {
         await Service.create ({
            name : inputTodoRef.current.value,
            date : inputDateRef.current.value,
            isDone : false,
         });
         
              
    
      /*setTodoList((_todos) => [
         ..._todos,
         {
            name : inputTodoRef.current.value,
            date : inputDateRef.current.value,
         },*/
     
     }loadListData();
   }

   async function handleRadioOnChecked(e, index) {
     /* setTodoList((_todos) => {
         const _todosLocal = _todos;
         _todosLocal[index].isDone = e.target.value;
         return [..._todos];
      });*/
     await Service.toggleDone(index);
     loadListData();

   }

   async function handleClearAll(e) {
      e.preventDefault();
      if (!confirm("Are You Sure ?")) return
      await Service.deleteAll();
      loadListData();
   }

     /* function handleInputDate (element) {
         setInputDate(()=> {
            inputDate = element.target.value;
         });
      }*/
      async function handleDeleteList(e,index){
         e.preventDefault();
         if (! confirm("are you sure ?")) return;
         await Service.delete(index);
         loadListData();
       
      }

       function handleEdit(e,index){
         e.preventDefault();
         const selectedTodo = todoList.find((_todo) => _todo.id == index);
         const formateDate = Moment(selectedTodo.date).format("Y-MM-DD");
         inputTodoRef.current.value = selectedTodo.name;
         inputDateRef.current.value =formateDate;
         setTodoIndex(() => index); 
       }

       function handleCancel(){
         setTodoIndex(()=>null);
         inputTodoRef.current.value = null;
         inputDateRef.current.value = null;
         
       }

 return (
    <div className = "w-1/2 m-auto space-y-5">
        <h1> Training Todo List</h1>
        
        <Link to="/about">
      <button className="bg-yellow-300 w-[100px] text-white rounded-sm">About</button>
      </Link>
        <div className="space-x-2 flex flex-row justify-between">
        <input
         type="text"
         ref={inputTodoRef}
         className="border-2 border-gray-300 p-1 text-xs w-full" 
         placeholder="Masukkan TODO"
        />
        <input 
        type="date"
        ref={inputDateRef}
         className="border-2 border-gray-300 p-1 text-xs w-full" 
         placeholder="Masukkan Todo"
        />
        <button 
          onClick={handleAddButton}
          className= {
            (todoIndex == null ? "bg-green-300" : "bg-blue-300") + " w-[100px] text-white rounded-sm" }
          >
            {todoIndex == null ? "Add" : "Edit"}
        </button>
         <button
            onClick={handleCancel}
            className="bg-red-300 w-[100px] text-white rounded-sm"
         >
            Cancel
            </button>
        </div>
        
    {/*start list*/}
    <div className="space-y-1">
        {todoList.map((todo,key) =>(
         <Todo 
         date={todo.date} 
         name={todo.name} 
         onChange = {handleRadioOnChecked}
         onEdit= {handleEdit}
         onDelete = {handleDeleteList}
         isDone = {todo.isDone}
         index = {todo.id}
         key={key}/>
        ) )}
     </div>
         
     

     <div className="flex flex-row justify-between">
     <p>
            You have {todoList.reduce((total, todo) => {
              if(todo.isDone) return total;
              return (total += 1 );
            }, 0 )} pending task </p>
        <button onClick= {handleClearAll} className="bg-red-500 text-white p-2 rounded-md">Clear All</button>
     </div>
    </div>

 );
        }

export default Todolist;