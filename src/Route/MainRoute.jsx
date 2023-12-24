import { createBrowserRouter } from "react-router-dom";
import Rote from "../Rote";
import Home from "../Page/Home/Home/Home";
import TaskHome from "../Component/TaskHome/TaskHome";
import TaskFeed from "../Component/TaskFeed/TaskFeed";
import Login from "../Component/Login/Login";
import Register from "../Component/Register/Register";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Rote></Rote>,
      children:[
        {
            path : '/',
            element: <Home></Home>,
            children:[
              {
                path : '/taskHome',
                element: <TaskHome></TaskHome>
              },
              {
                path : '/taskFeed',
                element: <TaskFeed></TaskFeed>
              }
            ]
        }
      ]
    },
    {
      path:'/login',
      element: <Login></Login>
    },
    {
      path:'/register',
      element: <Register></Register>
    },
  ]);

export default router;