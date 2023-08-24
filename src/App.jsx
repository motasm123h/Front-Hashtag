import './App.css'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import NavBar from './components/NavBar/NavBar'
import LeftNav from './components/LeftNav/LeftNav'
import RightNav from './components/RightNav/RightNav'
import ProFile from './Pages/Profiie/ProFile'
import Video from './Pages/Video/Video'
import Search from './Pages/Search/Search'
import Save from './Pages/Save/Save'
import Settings from './Pages/Settings/Settings'
import { useContext, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import './style.scss';
import { useDispatch } from "react-redux";
import Error from './Pages/Error/Error'

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
  Outlet,
  Link,
} from "react-router-dom";
import axios from 'axios';
import Chat from './Pages/Chat/Chat'
import { useSelector } from "react-redux";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import Edit from './Pages/PostOperation/Edit/Edit'
import Friends from './Pages/Friends/Friends'
import NewsFeed from './Pages/NewsFeed/NewsFeed'
import Groups from './Pages/Groups/Groups'
import SpicificGroups from './Pages/Groups/SpicificGroups'
import Games from './Pages/Games/Games'
import Dashboard from './Pages/Dashboard/Dashboard'
import Users from './Pages/Dashboard/Users/Users'
import UserDetails from './Pages/Dashboard/UserDetails/UserDetails'
import HashTagPosts from './Pages/HashtagPosts/HashtagPosts'
import SpecialPeople from './Pages/Dashboard/SpecialPeople/SpecialPeople'
import AuthReuest from './Pages/Dashboard/AuthReuest/AuthReuest'

const total_user_info = localStorage.getItem('token');
const user = JSON.parse(total_user_info)
const token = user ? user : ''


axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.get['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});


function App() {
  const user = useSelector((state) => state.authReducer.authData)
  const { darkMode } = useContext(DarkModeContext);
  const dispatch = useDispatch();


  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <NavBar />
        <div style={{ display: "flex" }}>
          <LeftNav />

          <div style={{ flex: 5 }}>
            <Outlet />
          </div>

          <RightNav />

        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
          errorElement: <Error />,

        },
        {
          path: "/profile/:id",
          element: <ProFile />,
          errorElement: <Error />,
        },
        {
          path: "search/profile/:id",
          element: <ProFile />,
          errorElement: <Error />,
        },
        {
          path: "/video",
          element: <Video />,
          errorElement: <Error />,
        },
        {
          path: "/settings/:id",
          element: <Settings />,
          errorElement: <Error />,
        },
        {
          path: "/friends",
          element: <Friends />,
          errorElement: <Error />,
        },
        {
          path: "/save",
          element: <Save />,
          errorElement: <Error />,
        },
        {
          path: "/groups",
          element: (<Groups />),
          children: [
            {
              path: "/groups/:id",
              element: <SpicificGroups />
            }
          ],

          errorElement: <Error />,
        },

        {
          path: "/NewsFeed",
          element: <NewsFeed />,
          errorElement: <Error />,
        },
        {
          path: "/games",
          element: <Games />,
          errorElement: <Error />,
        },
        {
          path: "/Search",
          element: <Search />,
          errorElement: <Error />,
        },
        {
          path: "/HashTagPosts/:post_type",
          element: <HashTagPosts />,
          errorElement: <Error />,
        },
        {
          path: "/post/edit/:id",
          element:
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', left: '30px', width: '550px' }}>
              <Edit />
            </div>,
          errorElement: <Error />,
        },
      ],
    },
    {
      path: "/chat",
      element: <Chat />,
      errorElement: <Error />,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <Error />,
    },
    {
      path: "/dashboard/users",
      element: <Users />,
      errorElement: <Error />,
    },
    {
      path: "/dashboard/Userdetails/:id",
      element: <UserDetails />,
      errorElement: <Error />,
    },
    {
      path: "/dashboard/Special_people",
      element: <SpecialPeople />,
      errorElement: <Error />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      errorElement: <Error />,
    },
    {
      path: "/dashboard/Special_people/request",
      element: <AuthReuest />,
      errorElement: <Error />,
    },

  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App
