'use client';

import { FC, useState, useEffect } from 'react';
import { Campaign } from './interfaces/campaign';
import campaignData from './components/campaign-list';
import { DataGrid, GridToolbar, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Card, Grid } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Button, TextField } from '@mui/material';


import dayjs from 'dayjs';
import DateFilter from './components/datefilter';






const Maintainer: FC = () => {
  var utc = require('dayjs/plugin/utc')
  dayjs.extend(utc)
  const [pageSize, setPageSize] = useState<number>(5);
  const [campaigns, setCampaigns] = useState<Array<Campaign>>([]);
  const [filterStartDate, setFilterStartDate] = useState<string | null>(null);
  const [filterEndDate, setFilterEndDate] = useState<string | null>(null);

  //mockup original value
  var localCampaigns: Array<Campaign> = []


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


  useEffect(() => {

    //Go through the campaignData and create a new campaign object for each campaign
    campaignData.map((campaign) => {
      const campaignObj: Campaign = {
        id: campaign.id,
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



  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      
      
        <DateFilter campaigns={campaigns} setCampaigns={setCampaigns} />

        <Card>
          <DataGrid rows={campaigns} slots={{
            toolbar: GridToolbar,
          }}
            columns={columns}

          />

        </Card>
     
    </LocalizationProvider >
  );
 };

export default Maintainer;