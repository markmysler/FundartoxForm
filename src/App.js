import "./App.css";
import UserForm from "./components/UserForm/UserForm";
import { auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { Welcome } from "./components/Welcome/Welcome";

function App() {
	const [user] = useAuthState(auth);

	return (
		<>
			{!user ? (
				<Welcome />
			) : (
				<>
					<UserForm />
				</>
			)}
		</>
	);
}

export default App;
