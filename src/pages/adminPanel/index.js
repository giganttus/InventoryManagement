import { Typography, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from '@mui/icons-material/Inventory';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
    const navigate = useNavigate();
  return (
    <Grid container spacing={2}>
        <Grid item xs={6}>
          <IconButton
            color="primary"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: 1,
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
              },
            }}
            onClick={() => navigate("/inventoryManagement")}
          >
            <WarehouseIcon sx={{ fontSize: 80 }} />
            <Typography sx={{ color: "text.secondary", fontWeight: "bold" }}>
              Inventory management
            </Typography>
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <IconButton
            color="primary"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: 1,
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
              },
            }}
            onClick={() => navigate("/usermanagement")}
          >
            <GroupIcon sx={{ fontSize: 80 }} />
            <Typography sx={{ color: "text.secondary", fontWeight: "bold" }}>
              User management
            </Typography>
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <IconButton
            color="primary"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: 1,
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
              },
            }}
            onClick={() => navigate("/itemmanagement")}
          >
            <InventoryIcon sx={{ fontSize: 80 }} />
            <Typography sx={{ color: "text.secondary", fontWeight: "bold" }}>
              Item management
            </Typography>
          </IconButton>
        </Grid>
      </Grid>
  )
}

export default AdminPanel