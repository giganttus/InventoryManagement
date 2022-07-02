import { client } from "./gClient";
import { gql } from "graphql-request";
import { toast } from "react-hot-toast";

const CREATE_INV = gql`
	mutation($name: String!, $address: String!){
		createInventory(Input: {name: $name, address: $address})
	}
`;

export const createInventory = async (name, address) => {
	return client
	.request(CREATE_INV, {name, address})
	.then((data) => {
		toast.success("Inventory created successfully!");
	})
	.catch((error) =>
			toast.error(error?.response?.errors[0]?.message || "Create failed!")
		);
	
};

const GET_INV = gql`
	query {
		getInventories{
            id,
            name,
            address
        }
	}
`;

export const getInventories = async () => {
	return client
	.request(GET_INV)
		.then((data) => data)
		.catch((error) => console.log(error));
};

const UPDATE_INV = gql`
	mutation($id: ID!, $name: String!, $address: String!){
		updateInventory(Input: {id: $id, name: $name, address: $address})
	}
`;

export const updateInventory = async (id, name, address) => {
	return client
	.request(UPDATE_INV, {id, name, address})
	.then((data) => {
		toast.success("Inventory updated successfully!");
	})
	.catch((error) =>
			toast.error(error?.response?.errors[0]?.message || "Update failed!")
		);
	
};

const DELETE_INV = gql`
	mutation($id: ID!){
		deleteInventory(InventoryId: $id)
	}
`;

export const deleteInventory = async (id) => {
	return client
	.request(DELETE_INV, {id})
	.then((data) => {
		toast.success("Inventory deleted!");
	})
	.catch((error) =>
	toast.error(error?.response?.errors[0]?.message || "Delete failed!")
	);
	
};