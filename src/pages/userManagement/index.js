import React from 'react'
import { Box } from "@mui/material";
import MaterialTable from 'material-table';
import { createUser, getUsers, updateUser, deleteUser, getInvInput } from 'services/usersService';
import { useQuery, useMutation, useQueryClient} from "react-query";

const UserManagement = () => {

	const { data: data1} = useQuery("users", () =>
		getUsers()
	);

	const queryClient = useQueryClient();

	const rows = data1?.getUsers.map((user) => ({
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		username: user.username,
		password: "●●●●●●",
		rolesId: user.rolesId,
		inventoriesId: user.inventoriesId,
		}));

	const { mutate: createU } = useMutation(
		async (newRowM) => {
			await createUser(
				newRowM.firstName, 
				newRowM.lastName, 
				newRowM.username, 
				newRowM.password,
				newRowM.rolesId,
				newRowM.inventoriesId,
			);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries()
			}
		}
	);

	const { mutate: updateU } = useMutation(
		async (selectedRow) => {
			await updateUser(
				selectedRow.id,
				selectedRow.firstName, 
				selectedRow.lastName, 
				selectedRow.username, 
				selectedRow.password,
				selectedRow.rolesId,
				selectedRow.inventoriesId,
			);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries()
			}
		}
	);

	const { mutate: deleteU } = useMutation(
		async (UserId) => {
			await deleteUser(UserId);
		},
		{
			onSuccess: () => {
			queryClient.invalidateQueries()
			},
		}
	);

	const invInput = useQuery ("invInput", () => 
	getInvInput(), {});

	const invNames = invInput.data?.getInventories.reduce((obj, item) => (obj[item.id] = item.name, obj) ,{});
	
	const columns=[
		{ title: 'ID', field: 'id', editable:"false", hidden:"true"},
		{ title: 'Firstname', field: 'firstName', validate: rowData => {
			if(rowData.firstName === undefined || rowData.firstName === ""){
				return "Required"
			}
			return true
			},
		},
		{ title: 'Lastname', field: 'lastName', validate: rowData => {
			if(rowData.lastName === undefined || rowData.lastName === ""){
				return "Required"
			}
			return true
			},
		},
		{ title: 'Username', field: 'username', validate: rowData => {
			if(rowData.username === undefined || rowData.username === ""){
				return "Required"
			}
			return true
			},},
		{ title: 'Password', field: 'password', validate: rowData => {
			if(rowData.password === undefined || rowData.password === ""){
				return "Required"
			}
			return true
			},
		},
		{ title: 'Role', field: 'rolesId', type: 'numeric', lookup: {1:"Admin",2:"Moderator"}, validate: rowData => {
			if(rowData.rolesId === undefined || rowData.rolesId === 0){
				return "Required"
			}
			return true
			},},
		{ title: 'Inventory', field: 'inventoriesId', type: 'numeric', lookup: invNames},
		]	

  return (
    <Box sx={{paddingLeft:"16px", paddingRight:"16px"}}>
			<h1>Users</h1>
			<div style={{ height: 600}}>
			<MaterialTable
				style={{}}
				columns={columns}
				data={rows}
				options={{
				  sort: "asc",
				  showTitle: false,
				  actionsColumnIndex: -1,
				  addRowPosition: "first",
				}}
				pageSize={5}
				rowsPerPageOptions={[5]}
				editable={{
					onRowAdd:(newRow) => new Promise((resolve, reject) => {
						createU(newRow);
						resolve();
					}),
                    onRowUpdate:(selectedRow) => new Promise((resolve, reject) => {
                        if (selectedRow.password === "●●●●●●") {
                            selectedRow.password = ""
                        };    
                        if (selectedRow.rolesId === 0) {
                            selectedRow.rolesId = 0
                        };                 
                        updateU(selectedRow);
                        resolve();
                    }),
					onRowDelete:(selectedRow) => new Promise((resolve, reject) => {
						deleteU(selectedRow.id);
						resolve();
					})
				}}
        	/>
			</div>
		</Box>
  )
}

export default UserManagement