import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import { Paper, Box, CircularProgress, Dialog } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

interface CampaignDataGridProps {
  campaigns: GridRowsProp;
  columns: GridColDef[];
  isLoading: boolean;
  theme: any;
}

const CampaignDataGrid: React.FC<CampaignDataGridProps> = ({ campaigns, columns, isLoading }) => {
  return (
    <Paper elevation={3}>
      {isLoading ? (
        <Dialog
          open={isLoading}
          PaperProps={{
            style: {
              overflow: 'hidden',
              width: '50%', // set width to 50%
              height: '50%', // set height to 50%
              maxWidth: 'none', // override maxWidth
            },
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <CircularProgress  />
          </Box>
        </Dialog>          
      ) : (
        
          <DataGrid
            rows={campaigns}
            slots={{ toolbar: GridToolbar }}
            columns={columns}
            getRowClassName={(params) =>
              params.row.active ? 'active-row' : 'inactive-row'
            }
          />
      )}
    </Paper>
  );
};

export default CampaignDataGrid;