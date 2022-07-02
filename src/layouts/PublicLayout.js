import Container from "@mui/material/Container";

const PublicLayout = ({ children }) => (
	<Container
		component="main"
		maxWidth="xs"
		sx={{
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			height: "100vh",
		}}
	>
		{children}
	</Container>
);

export default PublicLayout;
