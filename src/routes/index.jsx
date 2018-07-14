import Dashboard from "layouts/Dashboard.jsx";
import Pages from "layouts/Pages.jsx";


var indexRoutes = [
   { path: "/pages", name: "Home", component: Pages },
  { path: "/", name: "Dashboard", component: Dashboard }
  
];

export default indexRoutes;
