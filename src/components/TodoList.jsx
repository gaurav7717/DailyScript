import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";
import DisciplineScore from "./DisciplineScore";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { db } from "../firebase";
import {
  doc,
  addDoc,
  collection,
  Timestamp,
  query,
  onSnapshot,
  orderBy,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  function addTask(e) {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    handleSubmit(newTask.text);
    setTasks([...tasks, newTask]);
    setText("");
    console.log("adding");
  }
  const handleSubmit = async (text) => {
    // console.log(e)
    // e.preventDefault();
    console.log(text);
    try {
      await addDoc(collection(db, "tasks"), {
        id: Timestamp.now(),
        text: text,
        completed: false,
      });
      // onclose();
      console.log("added");
    } catch (err) {
      console.error("connot add ");
      alert(err);
    }
  };

  //getting all todos
  /* function to get all tasks from firestore in realtime */
  // useEffect(() => {
  //   const q = query(collection(db, 'tasks'), orderBy('created', 'desc'))
  //   onSnapshot(q, (querySnapshot) => {
  //     setTasks(querySnapshot.docs.map(doc => ({
  //       id: doc.id,
  //       data: doc.data()
  //     })))
  //   })
  // },[])
  useEffect(() => {
    const q = query(collection(db, "tasks"));
    onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  });

  function deleteTask(id) {
    //not understood
    handleDelete(id);
    setTasks(tasks.filter((task) => task.id !== id));
  }
  const handleDelete  = async (id) => {
    const taskDocRef = doc(db,"tasks",id);
    try{
      await deleteDoc(taskDocRef);
    }
    catch(err)
    {
      console.log("cannot delete")
    }
  }
  function toggleComplete(id) {
    
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          handleCheckChange(task , id);
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      })
    );
  }
  const handleCheckChange = async (task, id)=>
  {
    const taskRef=doc(db,"tasks",id);

    try{
      await  updateDoc(taskRef ,{completed: !task.completed})
    }
    catch(err)
    {
      console.log("cannaot check")
    }
  }
  function updateTaskText(id, newText) {
    handleUpdate(id, newText)
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  }
  const handleUpdate = async (id , newText) =>
  {
    console.log("in update sectiopn")
    const taskDocRef = doc(db , 'tasks' , id)
    try{
      await updateDoc(taskDocRef , {text :newText})
    }catch(e){
      console.log('Failed to update the document', e);
    }
    }
  

  return (
    <div className="todo-list">
      <div className="task-input">
        {/* <input  value={text} onChange={(e) => setText(e.target.value)} /> */}
        <form onSubmit={addTask}>
          <TextField
            id="outlined-basic"
            label="Go on!!"
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* <button onClick={() => addTask(text)}>Add</button> */}
          <Button variant="contained" type="submit">
            {" "}
            Add Task{" "}
          </Button>
        </form>
      </div>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
          updateTaskText={updateTaskText}
        />
      ))}

      <DisciplineScore
        count={tasks.filter((task) => task.completed).length}
        total={tasks}
      ></DisciplineScore>
    </div>
  );
}

export default TodoList;
