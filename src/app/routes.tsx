import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { SplashScreen } from "./screens/SplashScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { MovieDetailsScreen } from "./screens/MovieDetailsScreen";
import { TheatreShowtimeScreen } from "./screens/TheatreShowtimeScreen";
import { SeatSelectionScreen } from "./screens/SeatSelectionScreen";
import { BookingConfirmationScreen } from "./screens/BookingConfirmationScreen";
import { DigitalTicketScreen } from "./screens/DigitalTicketScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { ReviewsScreen } from "./screens/ReviewsScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashScreen />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <HomeScreen />,
      },
      {
        path: "/movie/:id",
        element: <MovieDetailsScreen />,
      },
      {
        path: "/movie/:id/theatre",
        element: <TheatreShowtimeScreen />,
      },
      {
        path: "/movie/:id/seats",
        element: <SeatSelectionScreen />,
      },
      {
        path: "/group-booking/:sessionId",
        element: <SeatSelectionScreen />,
      },
      {
        path: "/booking/confirmation",
        element: <BookingConfirmationScreen />,
      },
      {
        path: "/booking/ticket",
        element: <DigitalTicketScreen />,
      },
      {
        path: "/profile",
        element: <ProfileScreen />,
      },
      {
        path: "/movie/:id/reviews",
        element: <ReviewsScreen />,
      },
    ],
  },
]);
