import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { TasksCollection } from "/imports/api/TasksCollection";
import "/imports/api/tasksMethods";
import "/imports/api/tasksPublications";


const SEED_USERNAME = "luan";
const SEED_PASSWORD = "lindao";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
  const user = Accounts.findUserByUsername(SEED_USERNAME);
  if (TasksCollection.find().count() === 0) {
    // [
    //   "First Task",
    //   "Second Task",
    //   "Third Task",
    //   "Fourth Task",
    //   "Fifth Task",
    //   "Sixth Task",
    //   "Seventh Task",
    // ].forEach((taskText) => insertTask(taskText, user));
  }
});
