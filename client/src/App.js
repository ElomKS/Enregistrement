import { useState } from "react";
import Login from "./components/Login";
import UserRegistry from "./UserRegistry";
import { getAuthUser } from "./api/userService";

function App() {
  const [authUser, setAuthUser] = useState(getAuthUser());

  if (!authUser) return <Login onLogin={setAuthUser} />;

  return (
    <div>
      <UserRegistry />
    </div>
  );
}

export default App;
