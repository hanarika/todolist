import TrashIcon from "./assets/trash.png";
import EditIcon from "./assets/edit.png"; 
import Moment from "moment";

function Todo({index, name, date, isDone, onChange, onEdit, onDelete }){
    const formatDate = Moment(date).format("DD-MMM-Y");
    return(
        <>
        <div className="bg-gray-200 flex flex-row p-2 space-x-2 justify-between">
        <input type="checkbox" 
        className="accent-green-400"
        checked={isDone}
        onChange={(e) => onChange(e, index)}
        />

        <p className={isDone ? "line-through" : ""}> {name}</p> 
        <em>{formatDate}</em>
        <div className="space-x-2">
         <button onClick={(e) => onEdit (e, index)}>
             <img src={EditIcon} className="w-5" />
         </button>
         <button onClick={(e) => onDelete(e, index)}>
             <img src={TrashIcon} className="w-5" />
         </button>
       </div>
    </div>
    </>
    )
}

export default Todo;