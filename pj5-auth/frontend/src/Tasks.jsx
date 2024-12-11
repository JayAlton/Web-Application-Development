import React, { useEffect, useState } from 'react';
import { Box, Grid, Fab, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Select, MenuItem, Button, Card, CardHeader, CardContent, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { grey } from '@mui/material/colors';
import axios from 'axios';

function Tasks() {
  const [taskTypes, setTaskTypes] = useState([]); // State for task types
  const [tasks, setTasks] = useState([]); // State for tasks
  const [open, setOpen] = useState(false); // State for dialog open/close
  const [taskName, setTaskName] = useState(''); // State for task name input
  const [selectedType, setSelectedType] = useState(''); // State for selected task type

  const requestInsert = async (task) => {
    try {
      const response = await axios.post('http://localhost:3000/api/tasks', task);
      setTasks((prevTasks) => [...prevTasks, response.data]); // Update tasks state
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:3000/api/tasks');
    setTasks(response.data);
};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTaskName('');
    setSelectedType('');
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newTask = { name: taskName, type_id: selectedType };
  
    requestInsert(newTask)
      .then(() => {
        console.log('Task added successfully');
        handleClose(); // Close the dialog
      })
      .catch((error) => {
        console.error('Error adding task:', error);
      });
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  // Fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const typeResponse = await axios.get('http://localhost:3000/api/task-types');
        setTaskTypes(typeResponse.data); // Set task types in state

        const taskResponse = await axios.get('http://localhost:3000/api/tasks');
        setTasks(taskResponse.data); // Set tasks in state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  /* If tasks are not yet loaded
  if(!tasks || !taskTypes) return (
    <Box height="calc(100vh - 100px)" width="100%" sx={{ marginTop: "80px" }}>
      Loading ... 
    </Box>
  );
*/
  return (
    <Box height="calc(100vh - 100px)" width="100%" sx={{ marginTop: "80px" }}>
    <Fab color="primary" aria-label="add" style={{ position: 'fixed', bottom: 28, right: 20 }} onClick={handleClickOpen}>
      <AddIcon />
    </Fab>

    <Grid height="100%" container spacing={2}>
      {taskTypes.map((type) => (
        <Grid key={type.id} item xs={4}>
          <Card sx={{ height: "100%" }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: type.color }} aria-label="recipe">
                  {type.name[0]}
                </Avatar>
              }
              title={type.name}
              sx={{ bgcolor: grey[300] }}
            />
            <CardContent sx={{ height: "100%", bgcolor: grey[50] }}>
                    {/* Map over tasks that match the current type */}
                    {tasks
                        .filter((task) => task.type_id === type.id) // Filter tasks by type_id
                        .map((task) => (
                            <div key={task.id}>
                                {task.name} {/* Display task name */}
                            </div>
                        ))}
                </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='sm'
      PaperProps={{
        component: 'form',
        onSubmit: handleFormSubmit,
      }}
    >
      <DialogTitle>Add a Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Task Name"
          type="text"
          fullWidth
          variant="standard"
          value={taskName}
          onChange={handleTaskNameChange}
        />
        <Select
          value={selectedType}
          onChange={handleTypeChange}
          displayEmpty
          fullWidth
          margin="dense"
          variant="standard"
          required
        >
          <MenuItem value="" disabled>Select Task Type</MenuItem>
          {taskTypes.map((type) => (
            <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  </Box>
  );
}

export default Tasks;