import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Staff from "views/Staff.js";
import TableList from "views/Tables.js";
import UserPage from "views/User.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin"
  },
  {
    path: "/category",
    name: "Category",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/staff",
    name: "Staff",
    icon: "nc-icon nc-caps-small",
    component: Staff,
    layout: "/admin"
  },
];
export default routes;
