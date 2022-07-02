import { Typography } from "@mui/material";

const Logo = ({ onClick }) => {
	const path = window.location.pathname;
	return (
		<>
			<Typography
				onClick={onClick}
				sx={{
					cursor: onClick ? "pointer" : "default",
					color: path === "/start" || path === "/inventoryManagement" || path === "/adminpanel" || path === "/usermanagement" || path === "/itemmanagement" ? "#fff" : "auto"
				}}
				variant="h5"
			>Inventory System
			</Typography>
			<Typography variant="subtitle2"
			sx={{
				color: path === "/start" || path === "/inventoryManagement" || path === "/adminpanel" || path === "/usermanagement" || path === "/itemmanagement" ? "#fff" : "auto"
			}}
			>
				Grupa 6
			</Typography>
		</>
	);
};

export default Logo;
