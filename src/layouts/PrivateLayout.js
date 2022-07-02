import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Header from "components/organisms/Header";

const PrivateLayout = ({ children }) => (
	<Container component="main" maxWidth="lg">
		<Header />
		<Box sx={{ overflow: "auto" }} mt={13} mb={9}>
			{children}
		</Box>
	</Container>
);

export default PrivateLayout;
