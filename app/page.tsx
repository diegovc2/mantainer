'use client';

import { FC, useState, useEffect } from 'react';
import { Campaign } from './interfaces/campaign';
import campaignData from './components/campaign-list';
import { DataGrid, GridToolbar, GridColDef, GridRowsProp, GridCellParams} from '@mui/x-data-grid';
import { LocalizationProvider,  } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {Grid, Paper } from '@mui/material';
import dayjs from 'dayjs';
import './page.css';


//Custom Imports
import DateFilter from './components/datefilter';
import CampaignDataGrid from './components/table';

//Extending the window object to add a new function
declare global {
  interface Window {
    addCampaigns: (newCampaigns: Campaign[]) => void;
  }
}




const Maintainer: FC = () => {
  var utc = require('dayjs/plugin/utc')
  dayjs.extend(utc)
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<Array<Campaign>>([]);
  const [localCampaigns, setlocalCampaigns] = useState<Array<Campaign>>([]);
  var customParseFormat = require('dayjs/plugin/customParseFormat')
  dayjs.extend(customParseFormat)


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.7 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'startDate', headerName: 'Start Date', flex: 1 },
    { field: 'endDate', headerName: 'End Date', flex: 1 },
    { field: 'active', headerName: 'Active', flex: 1 },
    { field: 'budget', headerName: 'Budget', flex: 1 },
  ];

  if (typeof window !== "undefined") {

  window.addCampaigns = (newCampaigns: Campaign[]) => {
    setCampaigns((prevCampaigns) => [...prevCampaigns, ...newCampaigns]);
    setlocalCampaigns((prevCampaigns) => [...prevCampaigns, ...newCampaigns]);

  };
}



  useEffect(() => {

    //Go through the campaignData and create a new campaign object for each campaign
    const localCampaigns: Campaign[] = []; 
    campaignData.map((campaign) => {
      const campaignObj: Campaign = {
        id: campaign.id,
        name: campaign.name,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        active: campaign.active,
        budget: campaign.budget,
      };
      //if campaign startdate is before enddate add to the localCampaigns array
      if(dayjs(campaignObj.startDate, "YYYY-MM-DD").isBefore(dayjs(campaignObj.endDate, "YYYY-MM-DD"))){
        localCampaigns.push(campaignObj);
      }
      //add it to the campaigns array
    });
    //set the campaigns state to the localCampaigns array
    if (typeof window !== "undefined") {

    window.addCampaigns(localCampaigns);
    }
    //delay loader so it can be shown
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // delay of 1 second

  }, []);




  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={3}>
          <h1>Campaign Maintainer</h1>
          <DateFilter localValues={localCampaigns}  campaigns={campaigns} setCampaigns={setCampaigns} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
      <DataGrid
      rows={campaigns}
      slots={{ toolbar: GridToolbar }}

      columns={columns.map((column) => ({
        ...column,
        cellClassName: (params: GridCellParams) =>
          params.row.active ? 'active-row' : 'inactive-row',
      }))}
      />
      </Grid>
    </Grid>
  </LocalizationProvider>
  );
 };

export default Maintainer;