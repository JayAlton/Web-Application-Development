import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { Box, Grid, Fab, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material'; // Ensure Box is imported
import AddIcon from '@mui/icons-material/Add';

function Tasks() {
  const [taskTypes, setTaskTypes] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [open, setOpen] = useState(false);

  const requestInsert = async (name) => {
    try {
      const taskResponse = await axios.post('http://localhost:3000/api/tasks',{'name':name});
      setTasks(taskResponse.data);
    } catch (error) {
      console.error('There was an error adding the item!', error);
    }
  };
  // Drag and drop handlers
  const handledragover = (event) => {
    event.preventDefault();
  };

  const handledrop = (event) => {
    event.preventDefault();
    const task_id = event.dataTransfer.getData("task_id");
    const type_id = event.target.attributes.type_id.value;

    setTasks((tasks) =>
      tasks.map(task =>
        task.id === task_id ? { ...task, type_id: type_id } : task
      )
    );
  };

  const handledrag = (event) => {
    event.dataTransfer.setData("task_id", event.target.attributes.task_id.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const name = formJson.name;
    requestInsert(name)
      .then(()=>{
        handleClose();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  // Fetching data
  useEffect(() => {
    const source = axios.CancelToken.source();

      const fetchData = async () => {
        try {
          const typeResponse = await axios.get('http://localhost:3000/api/task-types');
          console.log('Task Types:', typeResponse.data); // Log task types
    
          const taskResponse = await axios.get('http://localhost:3000/api/tasks');
          console.log('Tasks:', taskResponse.data); // Log tasks
          setTasks(taskResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error); // Log errors
        }
      };
    
      fetchData();
    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  // If tasks are not yet loaded
  if(!tasks || !taskTypes) return (
    <Box height="calc(100vh - 100px)" width="100%" sx={{ marginTop: "80px" }}>
      Loading ... 
    </Box>
  );

  return (
    <Box height="calc(100vh - 100px)" width="100%" sx={{ marginTop: "80px" }}>      
      <Fab color="primary" aria-label="add" style={{ position: 'fixed', bottom: 28, right: 20 }} onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      
      <Grid height="100%" container spacing={2}>
        {taskTypes.map((type)=>(
          <Grid key={type.id} size={4}>
            <Card sx={{ height:"100%" }} >
              <CardHeader            
                avatar={
                  <Avatar sx={{ bgcolor: type.color }} aria-label="recipe">
                    {type.name[0]}
                  </Avatar>
                }
                title={type.name}
                sx={{ bgcolor: grey[300] }}
              />
              <CardContent
                type_id={type.id}
                sx={{ height:"100%", bgcolor: grey[50] }}
                droppable="true"
                onDragOver={handledragover}
                onDrop={handledrop}
              >

                {tasks.filter(task=>task.type_id==type.id).map((task)=>(
                  <Card
                    key={task.id}
                    task_id={task.id}
                    droppable="false"
                    draggable="true"
                    onDragStart={handledrag}
                    sx={{ marginBottom:'10px' }}
                  >
                    <CardHeader title={task.name} />
                  </Card>
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
          onSubmit: handleSubmit,
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
          />
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