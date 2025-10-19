import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/nav.jsx";
import EventsList from "./pages/event-list.jsx";
import EventDetail from "./pages/event-details.jsx";
import NewEvent from "./pages/new-event.jsx";
import EditEvent from "./pages/edit-event.jsx";
import Login from "./auth/login.jsx";
import Register from "./auth/register.jsx";
import GoogleSuccess from "./pages/google-success.jsx";
import { useAuth } from "./auth/authcontext.jsx";
import Footer from "./components/footer.jsx";
import HelpPage from "./pages/help.jsx";
import ContactPage from "./pages/contact.jsx";
import MyEvents from "./pages/my-events.jsx";

function StaffRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!user.is_staff) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<EventsList />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/me/events" element={<MyEvents />} />

        <Route path="/integrations/google/success" element={<GoogleSuccess />} />

        <Route path="/admin/events/new" element={
          <StaffRoute><NewEvent /></StaffRoute>
        } />
        <Route path="/admin/events/:id/edit" element={
          <StaffRoute><EditEvent /></StaffRoute>
        } />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

