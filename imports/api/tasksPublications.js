import React from "react";
import { TasksCollection } from "./TasksCollection";
import { Meteor } from "meteor/meteor";

Meteor.publish("tasks", function publishTasks() {
  return TasksCollection.find({ userId: this.userId });
});
