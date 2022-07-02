import { client } from "./gClient";
import { gql } from "graphql-request";
import { toast } from "react-hot-toast";

const CREATE_USER = gql`
	mutation($firstName: String!, $lastName: String!, $username: String!, $password: String!, $rolesId: ID!, $inventoriesId: ID){
		createUser(Input: {firstName: $firstName, lastName: $lastName, username: $username, password: $password, rolesId: $rolesId, inventoriesId: $inventoriesId})
	}
`;


export const createUser = async (firstName, lastName, username, password, rolesId, inventoriesId) => {
	return client
	.request(CREATE_USER, {firstName, lastName, username, password, rolesId, inventoriesId})
	.then((data) => {
		toast.success("User created successfully!");
	})
	.catch((error) =>
			toast.error(error?.response?.errors[0]?.message || "Create failed!")
		);
	
};

const GET_USERS = gql`
	query {
		getUsers {
            id,
            firstName,
            lastName,
            username,
            rolesId,
            inventoriesId
        }
	}
`;

export const getUsers = async () => {
	return client
	.request(GET_USERS)
		.then((data) => data)
		.catch((error) => console.log(error));
};


const UPDATE_USER = gql`
	mutation($id: ID!, $firstName: String!, $lastName: String!, $username: String!, $password: String!, $rolesId: ID!, $inventoriesId: ID){
		updateUser(Input: {id: $id, firstName: $firstName, lastName: $lastName, username: $username, password: $password, rolesId: $rolesId, inventoriesId: $inventoriesId})
	}
`; 


export const updateUser = async (id, firstName, lastName, username, password, rolesId, inventoriesId) => {
	return client
	.request(UPDATE_USER , {id, firstName, lastName, username, password, rolesId, inventoriesId})
	.then((data) => {
		toast.success("User updated!");
	})
	.catch((error) =>
	toast.error(error?.response?.errors[0]?.message || "Update failed!")
	);
	
};

const DELETE_USER = gql`
	mutation($id: ID!){
		deleteUser(UserId: $id)
	}
`;

export const deleteUser = async (id) => {
	return client
	.request(DELETE_USER, {id})
	.then((data) => {
		toast.success("User deleted!");
	})
	.catch((error) =>
	toast.error(error?.response?.errors[0]?.message || "Delete failed!")
	);
	
};

const GET_INV_INPUT = gql`
	query {
		getInventories {
            id,
            name
        }
	}
`;

export const getInvInput = async () => {
	return client
	.request(GET_INV_INPUT)
		.then((data) => data)
		.catch((error) => console.log(error));
};