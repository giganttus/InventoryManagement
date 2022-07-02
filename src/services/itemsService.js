import { client } from "./gClient";
import { gql } from "graphql-request";
import { toast } from "react-hot-toast";

const CREATE_ITEM = gql`
	mutation($name: String!, $description: String!, $status: String!){
		createItem(Input: {name: $name, description: $description, status: $status})
	}
`;

export const createItem = async (name, description, status) => {
	return client
	.request(CREATE_ITEM, {name, description, status})
	.then((data) => {

		toast.success("Item inserted successfully!");
	})
	.catch((error) =>
			toast.error(error?.response?.errors[0]?.message || "Insert of Item failed!")
		);
	
};

const GET_ITEMS = gql`
	query {
		getItems {
			id,
			name,
			description,
			status,
		}
	}
`;

export const getItems = async () => {
	return client
	.request(GET_ITEMS)
		.then((data) => data)
		.catch((error) => console.log(error));
};

const GET_INVENTORY_NAME = gql`
	query {
		getInventoryName 
	}
`;

export const getInventoryName = async () => {
	return client
	.request(GET_INVENTORY_NAME)
		.then((data) => data)
		.catch((error) => console.log(error));
};

const UPDATE_ITEM = gql`
	mutation($id: ID!, $name: String!, $description: String!, $status: String!){
		updateItem(Input: {id: $id, name: $name, description: $description, status: $status})
	}
`;

export const updateItem = async (id, name, description, status) => {
	return client
	.request(UPDATE_ITEM , {id, name, description, status})
	.then((data) => {
		toast.success("Item updated successfully!");
	})
	.catch((error) =>
	toast.error(error?.response?.errors[0]?.message || "Update of Item failed!")
	);
	
};

const DELETE_ITEM = gql`
	mutation($id: ID!){
		deleteItem(ItemId: $id)
	}
`;

export const deleteItem = async (id) => {
	return client
	.request(DELETE_ITEM, {id})
	.then((data) => {
		toast.success("Item deleted successfully!");
	})
	.catch((error) =>
	toast.error(error?.response?.errors[0]?.message || "Delete of Item failed!")
	);
	
};