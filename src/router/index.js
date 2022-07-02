import { Suspense } from "react";
import {
	BrowserRouter,
	Navigate,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { privateRoutes, publicRoutes } from "./routes";
import { getFromCookies } from "util/functions";

const RouteMaker = ({ type, layout: Layout, page: Page, path }) => {
	const user = getFromCookies("token");
	const location = useLocation();

	if (!user && type === "private") {
		return <Navigate replace state={{ from: location }} to="/" />;
	}

	if (user && path === "") {
		return <Navigate replace state={{ from: location }} to="/start" />;
	}

	return (
		<Layout>
			<Page />
		</Layout>
	);
};

const Loader = () => (
	<Box sx={{ position: "absolute" }} width="100%">
		<LinearProgress />
	</Box>
);

const Router = () => {
	return (
		<Suspense fallback={<Loader />}>
			<BrowserRouter>
				<Routes>
					{publicRoutes.map((data) => (
						<Route element={<RouteMaker {...data} type="public" />} {...data} />
					))}
					{privateRoutes.map((data) => (
						<Route
							element={<RouteMaker {...data} type="private" />}
							{...data}
						/>
					))}
				</Routes>
			</BrowserRouter>
		</Suspense>
	);
};

export default Router;
