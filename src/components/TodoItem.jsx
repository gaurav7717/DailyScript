import React, { useState } from "react";
import "./TodoItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Typography from "@mui/material/Typography";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';


function TodoItem({ task, deleteTask, toggleComplete, updateTaskText }) {
  function handleChange() {
    toggleComplete(task.id);
  }
  let [editing, setEditing]= useState(false);
  let [updatedText , setUpdatedText] =useState(task.text)
  let updateTask=()=>
  {
    setEditing(!editing);
      updateTaskText(task.id , updatedText)

  }


  return (
    <div className="todo-item">
      {/* <input
                type='checkbox'
                checked={task.completed}
                onChange={handleChange}
            /> */}
      <div>
      <FormGroup>
        <FormControlLabel
          required
          control={<Checkbox />}
          label=""
          checked={task.completed}
          onChange={handleChange}
        />
      </FormGroup>
      </div>
      <div className='task'>
        {
          editing ? <input type="text" value={updatedText}
          onChange={(e) =>setUpdatedText(e.target.value)}/> : <Typography variant="body1">{task.text} </Typography> 
        }
      
      </div>
      {/* <FontAwesomeIcon
        icon={faTimes}
        className="item-btn"
        onClick={() => deleteTask(task.id)}
      /> */}
      <div className="edit">
        {/* <Grid container >
          <EditIcon
          onClick={updateTask}></EditIcon>
        </Grid> */}
        {
          editing ? <SaveIcon  onClick={updateTask}/>:<Grid container >
          <EditIcon onClick={updateTask}
         ></EditIcon>
        </Grid>
        }
      </div>
     <div className="del-btn">
     <Grid container
     onClick={() => deleteTask(task.id)}>
        <DeleteIcon />
      </Grid>
     </div>
    </div>
  );
}

export default TodoItem;
