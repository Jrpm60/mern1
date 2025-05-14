
import PouchDB from 'pouchdb';
import prompt from 'prompt-sync';

const input = prompt();
const db = new PouchDB('tasks');

const main = async () => {
  console.log('--- Task Manager ---');
  console.log('1. Add a task');
  console.log('2. List tasks');
  console.log('3. Complete tasks');
  console.log('4. Delete task');
  const choice = input('Choose an option: ');

  if (choice === '1') {   // 1 ----------------------------------------------------------------
    const _id = input('Identificador: ');
    const description = input('Enter task description: ');

    const task = {
      _id,
      description,
      completed: false,
      date_creation: new Date().toISOString(),
      date_completed:[]   
    };

    try {
      await db.put(task);
      console.log('✅ Task saved.');
    } catch (err) {
      console.error('❌ Error saving task:', err);
    }

  } else if (choice === '2') {  // 2 ---------------------------------------------------------------------
    try {
      const result = await db.allDocs({ include_docs: true });
      const tasks = result.rows.map(row => row.doc);

      if (tasks.length === 0) {
        console.log('📭 No tasks found.');
      } else {
        console.log('\n📋 Task List:');
        tasks.forEach((task, index) => {
          console.log(`${index + 1}. ${task._id}.${task.description}. ${task.date_creation} . ${task.date_completed} [${task.completed ? '✓' : '✗'}]`);
        });
      }
    } catch (err) {
      console.error('❌ Error retrieving tasks:', err);
    }
  } else if (choice === '3') {  // 3 ---------------------------------------------------------------------
    const _id = input('Enter task Id to update: ');
  

    const toUpdate=await db.get(_id);
    console.log(toUpdate);

    toUpdate.completed = true;
    toUpdate.date_completed = new Date().toISOString(),

    console.log(toUpdate);

    try {
        await db.put(toUpdate);
        console.log('✅ Task saved.');
      } catch (err) {
        console.error('❌ Error saving task:', err);
      }
    } else if (choice === '4') {  // 4 ---------------------------------------------------------------------
        const _id = input('Enter task Id to delete: ');
        const toDelete=await db.get(_id);
        console.log(toDelete);
            const confirm = input('Confirm y/n: ');

            if (confirm=="y") {
                await db.remove(toDelete);
                console.log("Task deleted");
            } else {
                console.log("Delete Process Stopped");
            }
    }   
  
  else {
    console.log('❓ Invalid choice.');
  }
};

main();
