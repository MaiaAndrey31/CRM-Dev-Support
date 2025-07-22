import { createBrowserRouter } from "react-router-dom";
import Trophy from "../Pages/Trophy";
import Home from "../Pages/Home";
import Links from "../Pages/Links";
import Login from "../Pages/Login";
import { Private } from "./Private";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <Private>
        <Home />
      </Private>
    ),
  },
  {
    path: "/painel",
    element: (
      <Private>
        <Trophy />
      </Private>
    ),
  },
  {
    path: "/links",
    element: (
      <Private>
        <Links />
      </Private>
    ),
  },
]);

export { router };

// export default function AppRoutes() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/painel" element={<Trophy />} />
//         <Route path="/links" element={<Links />} />
//         <Route path="/chat" element={<Chat />} />
//       </Routes>
//     </Router>
//   );
// }
