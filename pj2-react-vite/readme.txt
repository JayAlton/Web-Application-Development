Project 2: Responsive Multi-Page Bootstrap App
Objective: Create a single-page Reactjs app with top navigation, using a client router to display content for each page.

Problem 1 (10 points)
Step 1: Install Node.js
Ensure you have Node.js installed. You can download it from the official websiteLinks to an external site..

Step 2: Create a New React App with Vite
Open your terminal.

Run the following command to create a new Vite project:

   npm create vite@latest pj2-react-vite
      Choose React as your framework and Javascript as your variant language

  3. Navigate to your project directory:

   cd pj2-react-vite
Step 3: Install Dependencies
Run the following command to install the necessary dependencies:

npm install
Step 4: Install MUI
Add Material-UI (MUI) to your project, run:

npm install @mui/material @emotion/react @emotion/styled
Step 5: Start the Development Server
To start your development server, run:

npm run dev
Open your browser and navigate to http://localhost:5173 to see your app running.

image.png

 

Problem 2: Set up ESlint rules for your app (5 points)
ESLint is a static code analysis tool used in JavaScript and TypeScript projects to identify and fix problems in your code. Its primary purpose is to help developers write clean, consistent, and error-free code by enforcing coding standards and best practices. It should be already installed in your app, you just need to add the Semicolon rule and files to ingnore.

Step 1: Add the Semicolon Rule
Open your ESLint configuration file ( eslint.config.js ) in the app root directory and add the rule for semicolons in rules:

  {
    ......    
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "semi": ["error", "always"],
    },
  }
After modifying your configuration, run ESLint to check for any issues:

npm run lint
You will see the issues like:

C:\pj2-react-vite\eslint.config.js
   1:28  error  Missing semicolon  semi
   2:30  error  Missing semicolon  semi
   3:40  error  Missing semicolon  semi
   4:51  error  Missing semicolon  semi
   5:55  error  Missing semicolon  semi
  39:2   error  Missing semicolon  semi

C:\pj2-react-vite\src\App.jsx
   1:33  error  Missing semicolon  semi
   2:43  error  Missing semicolon  semi
   3:33  error  Missing semicolon  semi
   4:19  error  Missing semicolon  semi
   7:40  error  Missing semicolon  semi
  32:4   error  Missing semicolon  semi
  35:19  error  Missing semicolon  semi

C:\pj2-react-vite\src\main.jsx
   1:35  error  Missing semicolon  semi
   2:46  error  Missing semicolon  semi
   3:28  error  Missing semicolon  semi
   4:21  error  Missing semicolon  semi
  10:2   error  Missing semicolon  semi

C:\pj2-react-vite\vite.config.js
  1:36  error  Missing semicolon  semi
  2:41  error  Missing semicolon  semi
  7:3   error  Missing semicolon  semi
Step 2: Exclude configuration files
Open your ESLint configuration file to specify the configuration files ESLint should ignore during linting. Modify the ignores property as: 

{ ignores: ['dist','eslint.config.js','vite.config.js'] },
Now you should only see the issues in non-configuration files:

C:\pj2-react-vite\src\App.jsx
   1:33  error  Missing semicolon  semi
   2:43  error  Missing semicolon  semi
   3:33  error  Missing semicolon  semi
   4:19  error  Missing semicolon  semi
   7:40  error  Missing semicolon  semi
  32:4   error  Missing semicolon  semi
  35:19  error  Missing semicolon  semi

C:\pj2-react-vite\src\main.jsx
   1:35  error  Missing semicolon  semi
   2:46  error  Missing semicolon  semi
   3:28  error  Missing semicolon  semi
   4:21  error  Missing semicolon  semi
  10:2   error  Missing semicolon  semi
Step 3: Fix Issues Automatically
You can also automatically fix some issues, including semicolon placement, by running:

npm run lint -- --fix
Now run ESLint again and you should see no issues displayed.

 

Problem 3: Set up your layout (5 points)
Now, you can modify your Vite and Material-UI (MUI) React app to include a top navigation bar and content area similar to our Project 1. Open src/App.jsx and modify it to include a top navigation bar using MUI's AppBar, Toolbar, Box, and other components. Here’s an example of how you can structure it:

import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

function App() {
return (
   <>
     <AppBar component="nav">
       <Toolbar>
         <Typography variant="h6" sx={{ flexGrow: 1 }}>
           My App
         </Typography>
         <Button color="inherit">Home</Button>
       </Toolbar>
    </AppBar>
    <Box>
        {/* Main Content */}
    </Box>
   </>
 );
}

export default App;
Modify your app name and create another button to redirect to 'tasks'.

 

Problem 4: Set up your client root router (10 points)
Step 1: Install React Router
Run the following command to install React Router:

npm install react-router-dom
React Router is a popular library for managing navigation in React applications. It enables you to create single-page applications (SPAs) with dynamic routing, allowing users to navigate between different views without reloading the entire page. Find more information here: https://reactrouter.com/en/mainLinks to an external site.

Step 2: Add a Router to your app
Open the src/main.jsx file and create a React Router on the page:

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
Step 3: Set up links to use the Router
Client side routing allows your app to update the URL without requesting another document from the server. Instead, the app can immediately render new UI.  Open src/App.jsx and modify it to use <Link to>:

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Link to={`home`} ><Button color="inherit">Home</Button></Link>
          <Link to={`tasks`}><Button color="inherit">Tasks</Button></Link>
        </Toolbar>
      </AppBar>
      <Box>
        {/* Main Content Here */}
      </Box>
    </>
  );
}

export default App;
 

Problem 5: Set up your child routes and load content (10 points)
Now if you click the links on your navigation, you will see a '404' error message. This is because the routes '/home' and 'tasks' haven't been defined yet.

Step 1: Add child routes
Open the src/main.jsx file and add your child routes to your router:

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <h1 style={{marginTop:100}}>Home</h1>,
      },
      /* other child route objects here */
    ],
  },
]);
 

Step 2: Add a container to render the child routes 
Now, when you click the links on your navigation, the error message should be gone. But still, nothing is displayed in the content area. You will need to tell the app router where you want it to render the main content for its child routes. We do that with <Outlet>Links to an external site.. Put an outlet in your src/App.jsx :

function App() {
  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Link to={`home`} ><Button color="inherit">Home</Button></Link>
          {*/ Another link */}
        </Toolbar>
      </AppBar>
      <Box>
        <Outlet />
      </Box>
    </>
  );
}
Step 3: Create and import child modules
Your child element is defined as inline in your router at this point. This is going to only work if you have a simple structure for your child elements. In most cases, we create modules for child elements and import them to the root router. For example, create a new file src/Home.jsx  and put the following code in it: 

import { Typography, Box } from '@mui/material';

function Home() {
  return (
    <Box maxWidth="xl" height="100vh" display="flex" flexDirection="column" justifyContent="center">
        <Typography variant="h1" align="center">
            HELLO
        </Typography>
        <Typography variant="body1" align="center">
            Welcome to your new React app using Vite and Material-UI.
        </Typography>
    </Box>
  );
}

export default Home;
And then import it into your  src/main.jsx file as: 

import Home from './Home.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      /* other child routes */
    ],
  },
]);
Now, when you click the Home button in your navigation bar, you should see a page as:

image.png 

Problem 6: Add a new child route and load content (10 points)
Add another child route to 'tasks' to your router and create another page for your "tasks" module to show your tasks as three columns:

image.png

 

Deliverables
Create a zip file for your pj2-react-router-app directory and submit it. 