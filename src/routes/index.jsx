import { Navigate } from "react-router-dom";
import Container from "../layouts/container";
import NotFound from "../main/NotFound";
import AllUsersPage from "../pages/AllUsersPage";
import DashboardPage from "../pages/DashboardPage";
import RolesPermissionsPage from "../pages/RolesPermissionsPage";
import AllMoviesPage from "../pages/AllMoviesPage";
import MovieSchedulesPage from "../pages/MovieSchedulesPage";
import AllTheatersPage from "../pages/AllTheatersPage";
import TheaterLocationsPage from "../pages/TheaterLocationsPage";
import MoviesByTheaterPage from "../pages/MoviesByTheaterPage";
import AllRoomsPage from "../pages/AllRoomsPage";
import ShowtimesPage from "../pages/ShowtimesPage";
import AllPromotionsPage from "../pages/AllPromotionsPage";
import DiscountsPage from "../pages/DiscountsPage";
import SendNotificationsPage from "../pages/SendNotificationsPage";

const routes = [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Container />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "/allusers",
        element: <AllUsersPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/roles",
        element: <RolesPermissionsPage />,
      },
      {
        path: "/movies",
        element: <AllMoviesPage />,
      },
      {
        path: "/schedules",
        element: <MovieSchedulesPage />,
      },
      {
        path: "/theaters",
        element: <AllTheatersPage />,
      },
      {
        path: "/locations",
        element: <TheaterLocationsPage />,
      },
      {
        path: "/movies-by-theater",
        element: <MoviesByTheaterPage />,
      },
      {
        path: "/rooms",
        element: <AllRoomsPage />,
      },
      {
        path: "/showtimes",
        element: <ShowtimesPage />,
      },
      {
        path: "/promotions",
        element: <AllPromotionsPage />,
      },
      {
        path: "/discounts",
        element: <DiscountsPage />,
      },
      {
        path: "/notifications",
        element: <SendNotificationsPage />,
      },
    ],
  },
];

export default routes;
