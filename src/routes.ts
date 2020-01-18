import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Forget from './pages/forget';

export default [
  {
    exact: true,
    path: '/',
    component: Home,
  },
  {
    exact: true,
    path: '/login',
    component: Login,
  },
  {
    exact: true,
    path: '/register',
    component: Register,
  },
  {
    exact: true,
    path: '/forget',
    component: Forget,
  },
]