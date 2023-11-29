
import './App.css';
import { useState } from 'react';


function App() {

	const [tasks, setTasks] = useState([]);
	const [taskValue, setTaskValue] = useState('')
	const [isEditing, setIsediting] = useState(false)
	const [editingvalue, setEditingvalue] = useState(null);


	function handleChange(event) {
		setTaskValue(event.target.value);
	}

	function handleAddtask() {
		if (isEditing) {
			const index = tasks.indexOf(editingvalue)
			if (index !== -1) {
				const updatedtask = [...tasks];
				updatedtask.splice(index, 1, taskValue)
				setTasks(updatedtask)
			}
		}
		else {
			if (taskValue !== '') {
				setTasks((prevtask) => [taskValue, ...prevtask]);
			}
		}
		setTaskValue('');
		setIsediting(false)
	}



	function handleDelete(task) {
		const updatedtaskList = tasks.filter((currentelement) => currentelement !== task)
		console.log(updatedtaskList);
		setTasks(updatedtaskList);
	}


	function handleEdit(task) {
		setIsediting(true)
		setTaskValue(task)
		document.querySelector('.inputText').focus();
		let currentlyEditingValue = tasks.find((element) => element === task);
		setEditingvalue(currentlyEditingValue);
	}

	function handlekeyPress(event) {
		if (event.key === 'Enter') {
			handleAddtask()
		}
	}


	return (
		<>
			<h1 className='heading'>Todo App</h1>

			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<input type='text' value={taskValue} onChange={handleChange} onKeyDown={handlekeyPress} className='inputText' placeholder='Enter your Task' />
				<button onClick={handleAddtask} className='addTask'>{isEditing ? "save" : 'Addtask'}</button>
			</div>
			<ul className='TodoListitemsContainer'>
				{tasks && tasks.map((task, index) => {
					return <li key={index} className='Singletodoitem'>
						{task}
						<span >
							<button onClick={() => handleEdit(task)} className='edit'>Edit</button>
							<button onClick={() => handleDelete(task)} className='delete'>Delete</button>
						</span>
					</li>
				})
				}
			</ul >
		</>
	)
}

export default App;
