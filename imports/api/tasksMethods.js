import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { TasksCollection } from "./TasksCollection";

Meteor.methods({
  "tasks.insert"(text, descricao, date,username) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    TasksCollection.insert({
      text,
      createdAt: new Date(),
      userId: this.userId,
      status: 'NEW',
      descricao,
      date,
      username
    });
  },

  "tasks.update"(taskId, title, status, description, username, date) {
    check(taskId, String);

    if (!this.userId) throw new Meteor.Error("Not authorized.");

    if (!taskId || !title || !description)
      throw new Meteor.Error("Data not Sended");

    TasksCollection.update(
      {
        _id: taskId,
      },
      {
        text: title,
        status: status,
        userId: this.userId,
        descricao: description,
        date: date,
        username: username
      }
    );
  },

  "tasks.remove"(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
    if (!task) {
      throw new Meteor.Error("Access denied.");
    }

    TasksCollection.remove(taskId);
  },

  "tasks.setIsChecked"(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error("Access denied.");
    }
    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  },

  "tasks.count"() {
    const total = TasksCollection.find({}).count();
    
    const totalConcluidos = TasksCollection.find({
      status: "NEW",
    }).count();

    const totalEmAndamento = TasksCollection.find({
      status: "IN PROGRESS",
    }).count();
    
    const totalConcluido = TasksCollection.find({
      status: "DONE",
    }).count();

    console.log("Resultado: ", { total: total, totalConcluidos: totalConcluido, totalEmAndamento: totalEmAndamento });

    return { total: total, totalConcluidos: totalConcluido, totalEmAndamento: totalEmAndamento };
  },
});
