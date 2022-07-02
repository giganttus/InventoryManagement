import { useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Logo from "components/atoms/Logo";
import { getFromCookies, removeFromCookies } from "util/functions";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const Header = () => {
	const navigate = useNavigate();
	const path = window.location.pathname;
	return (
		<AppBar  
		style ={{
			backgroundColor: path === "/start" || path === "/inventoryManagement"  || path === "/adminpanel" || path === "/usermanagement" || path === "/itemmanagement" ? "#6532CF" : "auto",
		}} 
		elevation={1} 
		position="fixed">
			<Toolbar>
				<Box sx={{ py: 1, flexGrow: 1 }}>
					<Logo onClick={() => navigate("/start")} />		
				</Box>
				<AdminPanelSettingsIcon 
				sx = {{
					color: path === "/start" || path === "/inventoryManagement"  || path === "/adminpanel" || path === "/usermanagement" || path === "/itemmanagement" ? "#fff" : "auto"
				}}
				onClick={() => navigate("/adminpanel")}/>
				<Box pl={1} />
				<ExitToAppIcon 
				sx = {{
					color: path === "/start" || path === "/inventoryManagement"  || path === "/adminpanel" || path === "/usermanagement" || path === "/itemmanagement" ? "#fff" : "auto"
				}}
				onClick={() => {
					removeFromCookies("token");
					navigate(`/`);
				}}
				/>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
