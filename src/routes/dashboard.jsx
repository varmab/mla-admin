import Dashboard from "views/Dashboard/Dashboard.jsx";
import Acts from "views/Acts/Acts.jsx";


// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";


var dashRoutes = [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: DashboardIcon,
        component: Dashboard
      },
      {
        path: "/acts",
        name: "Acts",
        icon: DashboardIcon,
        component: Acts
      }
    ];
export default dashRoutes;
