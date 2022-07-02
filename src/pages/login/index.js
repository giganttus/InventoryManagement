import { TextField, Box, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "components/atoms/Logo";
import { login } from "services/authService";


const Login = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Logo />
			<Box sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					required
					fullWidth
					label="Username"
					autoFocus
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					label="Password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					onClick={() => login(username, password, navigate)}
				>
					Sign in
				</Button>
			</Box>
		</Box>
	);
};

export default Login;
