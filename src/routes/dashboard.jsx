import Advocates from "views/Advocates/Advocates.jsx";
import Acts from "views/Acts/Acts.jsx";
import Contacts from "views/Contacts/Contacts.jsx";
import DocumentsAndDeeds from "views/DocumentsAndDeeds/DocumentsAndDeeds.jsx";
import Gallery from "views/Gallery/Gallery.jsx";
import GalleryDetails from "views/Gallery/GalleryDetails.jsx";
import Journals from "views/Journals/Journals.jsx";
import Judgments from "views/Judgments/Judgments.jsx";
import Documents from "views/DocumentsAndDeeds/Documents.jsx";



// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";


var dashRoutes = [
      {
        path: "/advocates",
        name: "Advocates",
        icon: DashboardIcon,
        component: Advocates
      },
      {
        path: "/acts",
        name: "Acts",
        icon: DashboardIcon,
        component: Acts
      },
      {
        path: "/contacts",
        name: "Contacts",
        icon: DashboardIcon,
        component: Contacts
      },
      {
        path: "/documentsAndDeeds",
        name: "Documents And Deeds",
        icon: DashboardIcon,
        component: DocumentsAndDeeds
      },
      {
        path: "/Documents/:id",
        name: "Documents",
        icon: DashboardIcon,
        component: Documents
      },
      {
        path: "/gallery",
        name: "Gallery",
        icon: DashboardIcon,
        component: Gallery
      },
      {
        path: "/GalleryDetails/:id",
        name: "GalleryDetails",
        icon: DashboardIcon,
        component: GalleryDetails
      },
      {
        path: "/journals",
        name: "Journals",
        icon: DashboardIcon,
        component: Journals
      },
      {
        path: "/judgments",
        name: "Judgments",
        icon: DashboardIcon,
        component: Judgments
      },
    ];
export default dashRoutes;
