import React from 'react'
import { Box } from "@mui/material";
import MaterialTable from 'material-table';
import { createInventory, getInventories, updateInventory, deleteInventory } from 'services/inventoriesService';
import { useQuery, useMutation, useQueryClient} from "react-query";

const InventoryManagement = () => {
  const { data: data1, error: error } = useQuery("inventories", () =>
  getInventories());

  const queryClient = useQueryClient();

  const rows = data1?.getInventories.map((inv) => ({
		id: inv.id,
		name: inv.name,
		address: inv.address,
	  	}));
  
    const { mutate: createI } = useMutation(
      async (newRowM) => {
        await createInventory(
          newRowM.name, 
          newRowM.address,
        );
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries()
        }
      }
    );
  
    const { mutate: updateI } = useMutation(
      async (selectedRow) => {
        await updateInventory(
          selectedRow.id,
          selectedRow.name, 
          selectedRow.address,
        );
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries()
        }
      }
    );
  
    const { mutate: deleteI } = useMutation(
      async (InventoryId) => {
        await deleteInventory(InventoryId);
      },
      {
        onSuccess: () => {
        queryClient.invalidateQueries()
        },
      }
    );

    const columns=[
      { title: 'ID', field: 'id', editable: "false", hidden: "false"},
      { title: 'Name', field: 'name', validate: rowData => {
        if(rowData.name === undefined || rowData.name === ""){
          return "Required"
        }
        return true
        }, },
      { title: 'Address', field: 'address', validate: rowData => {
        if(rowData.address === undefined || rowData.address === ""){
          return "Required"
        }
        return true
        },},
      ]	

  return (
    <Box sx={{paddingLeft:"16px", paddingRight:"16px"}}>
			<div style={{ height: 600}}>
      <h1>Inventory</h1>
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
						createI(newRow);
						resolve();
					}),
          onRowUpdate:(selectedRow) => new Promise((resolve, reject) => {
            updateI(selectedRow);
            resolve();
          }),
					onRowDelete:(selectedRow) => new Promise((resolve, reject) => {
						deleteI(selectedRow.id);
						resolve();
					})
				}}
        	/>
			</div>
		</Box>
  )
}

export default InventoryManagement

