'use client';

import { FC, useState, useEffect } from 'react';
import { Campaign } from './interfaces/campaign';
import campaignData from './components/campaign-list';
import { DataGrid, GridToolbar, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Card, Grid } from '@mui/material';




const Maintainer: FC = () => {
  const [pageSize, setPageSize] = useState<number>(5);
  const [campaigns, setCampaigns] = useState<Array<Campaign>>([]);
  const [filterStartDate, setFilterStartDate] = useState<string>('');
  const [filterEndDate, setFilterEndDate] = useState<string>('');


  
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 0.1 },
  { field: 'name', headerName: 'Name' , flex: 1 },
  { field: 'startDate', headerName: 'Start Date', flex: 1 },
  { field: 'endDate', headerName: 'End Date', flex: 1},
  { field: 'active', headerName: 'Active', flex: 1 },
  { field: 'budget', headerName: 'Budget', flex: 1 },
];



  useEffect(() => {

    const localCampaigns : Array<Campaign> = []
    //Go through the campaignData and create a new campaign object for each campaign
    campaignData.map((campaign) => {
      const campaignObj: Campaign = {
        id: parseInt(campaign.id),
        name: campaign.name,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        active: campaign.active,
        budget: campaign.budget,
        }; 
        //add it to the campaigns array
        localCampaigns.push(campaignObj);
      });
      //set the campaigns state to the localCampaigns array
      setCampaigns([...localCampaigns]);

      
    
  }, []);

  console.log(campaigns);
 
  const handleFilter = () => {
     const filteredCampaigns = campaigns.filter(
       (campaign) =>
         campaign.startDate >= filterStartDate &&
         campaign.endDate <= filterEndDate
     );
     setCampaigns(filteredCampaigns);
  };
 
  return (
    <Grid container spacing={2}>

    <Grid item xs={12} lg={12} m={12}>
    <Card>
     
       <h1>Campaign Maintainer</h1>
       <input
         type="date"
         value={filterStartDate}
         onChange={(e) => setFilterStartDate(e.target.value)}
       />
       <input
         type="date"
         value={filterEndDate}
         onChange={(e) => setFilterEndDate(e.target.value)}
       />
       <button onClick={handleFilter}>Filter</button>
    </Card>
    </Grid>
    <Grid item xs={12} lg={12} m={12}>
       <Card>
       <DataGrid  rows={campaigns}   slots={{
          toolbar: GridToolbar,
        }} 
        columns={columns}
        
        />

        </Card>       
    </Grid>
    </Grid>
  );
 };
 
 export default Maintainer;