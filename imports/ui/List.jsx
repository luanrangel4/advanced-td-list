import React from "react";
import { TasksCollection } from "/imports/api/TasksCollection";
import { Task } from "./Task";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
export const List = () => {
  const tasks = useTracker(() => TasksCollection.find({}).fetch());

  console.log(tasks);

  const user = useTracker(() => Meteor.user());
  const deleteTask = ({ _id }) => TasksCollection.remove(_id);
 
  
  return (
    <div
    style={{
      display: 'Grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr'
    }}
  >
    
      {tasks.map((task) => (
       
          <Task
            key={task._id}
            task={task}
            onDeleteCLick={deleteTask}
            user={user}
          />
      ))}

 
    </div>
  );
};
