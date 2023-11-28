

import { FC, useState, useMemo, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Campaign } from '../interfaces/campaign';
import { Card } from '@mui/material';

import dayjs from 'dayjs';

interface DateFilterProps {
  localValues: Campaign[];
  campaigns: Campaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
}

const DateFilter: FC<DateFilterProps> = ({ localValues ,campaigns, setCampaigns }) => {
  const [filterStartDate, setFilterStartDate] = useState<string | null>(null);
  const [filterEndDate, setFilterEndDate] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  

  useEffect(() => {
    console.log('filterStartDate', filterStartDate);
    console.log('filterEndDate', filterEndDate);
  }, [filterStartDate, filterEndDate]);

  const handleFilter = () => {
    const filteredCampaigns: Campaign[] = localValues.filter((campaign) => {
      const startDate = dayjs(campaign.startDate, "YYYY-MM-ddThh:mm:ss Z");
      const endDate = dayjs(campaign.endDate, "YYYY-MM-ddThh:mm:ss Z");
      const filterStartDateTable = dayjs(filterStartDate, "MM-DD-YYYY");
      const filterEndDateTable = dayjs(filterEndDate, "MM-DD-YYYY");

      const nameFilter = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());

      if(filterStartDateTable.isValid() || filterEndDateTable.isValid()){
      
        const dateFilter = ((filterStartDateTable.isValid() && filterEndDateTable.isValid()) && (startDate.isAfter(filterStartDateTable) && endDate.isBefore(filterStartDate))) ||
                         ((filterEndDateTable.isValid() && (filterStartDate == null)) && endDate.isBefore(filterEndDateTable) && startDate.isBefore(filterEndDate)) ||
                         ((filterStartDateTable.isValid() && (filterEndDate == null)) && startDate.isAfter(filterStartDateTable) && endDate.isAfter(filterStartDate)) ;      
      
        return dateFilter && nameFilter;
      }
      else{
        return nameFilter;
      }
    });

    console.log('filteredCampaigns', filteredCampaigns);
    setCampaigns(filteredCampaigns);
  };

  const handleReset = () => {
    setFilterStartDate(null);
    setFilterEndDate(null);
    setSearchTerm('');
    console.log('localValues', localValues);
    setCampaigns(localValues);
  };

  return (
    <Card variant="outlined">
      <h1>Date Filter</h1>
    <Grid container alignItems="center" justifyContent="center" spacing={1}>
      <Grid item xs={12} sm={6} lg={3} >
        <DatePicker
          label="Start Date"
          maxDate={filterEndDate}
          value={filterStartDate}
          onChange={(newValue) => {
            setFilterStartDate(newValue);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <DatePicker
          label="End Date"
          minDate={filterStartDate}
          value={filterEndDate}
          onChange={(newValue) => {
            setFilterEndDate(newValue);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Button
          disabled={!filterStartDate && !filterEndDate && !searchTerm}
          onClick={handleFilter}
          variant="contained"
        >
          Filter
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Button onClick={handleReset} variant="contained">
          Reset
        </Button>
      </Grid>
      <Grid item xs={12}>
        <h1>Name Filter</h1>
        <TextField id="outlined-basic" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} label="Search Name" variant="outlined" />
      </Grid>
    </Grid>
  </Card>
  );
};

export default DateFilter;
