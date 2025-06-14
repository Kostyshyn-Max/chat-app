import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routex";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
