
import { getItems, updateItem, deleteItem, getInvInput } from "services/allItemsService";
import { useQuery, useMutation, useQueryClient} from "react-query";
import { Box } from "@mui/material";
import MaterialTable from 'material-table';


const Start = () => {
	const { data: data1 } = useQuery("items", () =>
		getItems()
	);	

	const queryClient = useQueryClient();
  

	const rows = data1?.getAllItems?.map((item) => ({
		id: item.id,
		name: item.name,
		description: item.description,
		status: item.status,
        inventoriesId: item.inventoriesId,
	  }));

	const { mutate: updateI } = useMutation(
		async (selectedRow) => {
			await updateItem(
				selectedRow.id,
				selectedRow.name,
				selectedRow.description,
				selectedRow.status,
                selectedRow.inventoriesId,
			);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries()
			}
		}
	);

	const { mutate: deleteI } = useMutation(
		async (ItemId) => {
			await deleteItem(ItemId);
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
		{ title: 'ID', field: 'id', editable:'false', hidden: 'true'},
		{ title: 'Name', field: 'name', validate: rowData => {
			if(rowData.name === undefined || rowData.name === ""){
				return "Required"
			}
			return true
			},},
		{ title: 'Description', field: 'description',  validate: rowData => {
			if(rowData.description === undefined || rowData.description === ""){
				return "Required"
			}
			return true
			},},
		{ title: 'Status', field: 'status', lookup: {"Fine":"In perfect condition","Broken":"Partly broken"},  validate: rowData => {
			if(rowData.status === undefined || rowData.status === ""){
				return "Required"
			}
			return true
			},},
        { title: 'Inventory', field: 'inventoriesId',
            lookup: invNames,
            validate: rowData => {
			if(rowData.inventoriesId === undefined || rowData.inventoriesId === ""){
				return "Required"
			}
			return true
			},},
		]	

	return (
		<Box sx={{paddingLeft:"16px", paddingRight:"16px"}}>
            <h1>Items</h1>
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
					onRowDelete:(selectedRow) => new Promise((resolve, reject) => {
						deleteI(selectedRow.id);
						resolve();
					}),
					onRowUpdate:(selectedRow) => new Promise((resolve, reject) => {
						updateI(selectedRow);
						resolve();
					})
				}}
        	/>
			</div>
		</Box>
	);
};

export default Start;
