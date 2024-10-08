import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Tasks = () => {
  const tasks = [
    { id: 1, title: 'HTML', status: 'Completed' },
    { id: 2, title: 'CSS', status: 'Completed' },
    { id: 3, title: 'JavaScript', status: 'InProgress' },
    { id: 4, title: 'ReactJS', status: 'NewTasks' },
    // ...
  ];

  return (
    <Container fluid className="p-4">
      <h1 className="display-4 text-center mb-4">Tasks</h1>
      <Row className="justify-content-center flex-row">
        <Col md={4} className="box NewTasks">
          <h2>New Tasks</h2>
          <ul>
            {tasks.filter(task => task.status === 'NewTasks').map(task => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        </Col>
        <Col md={4} className="box InProgress">
          <h2>In Progress</h2>
          <ul>
            {tasks.filter(task => task.status === 'InProgress').map(task => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        </Col>
        <Col md={4} className="box Completed">
          <h2>Completed</h2>
          <ul>
            {tasks.filter(task => task.status === 'Completed').map(task => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Tasks;