import { client } from "./gClient";
import { toast } from "react-hot-toast";
import { gql } from "graphql-request";
import { setCookies } from "util/functions";

const LOGIN_MUTATION = gql`
	mutation ($username: String!, $password: String!) {
		login(Input: { username: $username, password: $password })
	}
`;

export const login = async (username, password, navigate) => {
	return client
		.request(LOGIN_MUTATION, { username, password })
		.then((data) => {
			setCookies("token", data?.login);
			navigate("/start");
			window.location.reload();
			toast.success("Logged in successfully!");
		})
		.catch((error) =>
			toast.error(error?.response?.errors[0]?.message || "Login failed!")
		);
};
