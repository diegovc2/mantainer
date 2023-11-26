// import { FC, useState, useEffect } from 'react';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { Button, TextField } from '@mui/material';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { Campaign } from '../interfaces/campaign';
// import { Card, Grid } from '@mui/material';

// import dayjs from 'dayjs';

//  interface DateFilterProps {
//     campaigns: Campaign[];
//     setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
//   }

// const DateFilter: FC<DateFilterProps> = ({campaigns, setCampaigns}) => {
//     const [filterStartDate, setFilterStartDate] = useState<string | null>(null);
//     const [filterEndDate, setFilterEndDate] = useState<string | null>(null);
//     const localValues = campaigns;
//     useEffect(() => {
//         console.log('filterStartDate', filterStartDate);
//         console.log('filterEndDate', filterEndDate);
//     }, [filterStartDate, filterEndDate]);

//     const handleFilter = () => {
//         setCampaigns([...localValues]);
//         const filteredCampaigns: Array<Campaign> = [];
    
//         //Go through the campaigns array and check if the campaign's start date is after the filter start date and if the campaign's end date is before the filter end date
//         campaigns.map((campaign) => {
//           var startDate = dayjs(campaign.startDate, "YYYY-MM-ddThh:mm:ss Z");
//           var endDate = dayjs(campaign.endDate, "YYYY-MM-ddThh:mm:ss Z");
//           var filterStartDateTable = dayjs(filterStartDate, "MM-DD-YYYY");
//           var filterEndDateTable = dayjs(filterEndDate, "MM-DD-YYYY");
//           if(filterStartDateTable != null || filterEndDateTable == null){
//             if (startDate.isAfter(filterStartDateTable) ){
//               filteredCampaigns.push(campaign);
//             }
//           }
//           else if(filterStartDateTable == null || filterEndDateTable != null){
//             if (endDate.isBefore(filterEndDateTable)){
//               filteredCampaigns.push(campaign);
//             }
//           }
//           else {
         
//           if  ((startDate.isAfter(filterStartDateTable)) && (endDate.isBefore(filterEndDateTable))) {
//             //if it is, add it to the filteredCampaigns array
//             filteredCampaigns.push(campaign);
//           }
//           }
//         });
//         //set the campaigns state to the filteredCampaigns array
//         setCampaigns([...filteredCampaigns]);
//         console.log("Campaigns: ", campaigns)
//       };

//     const handleReset = () => {
//         setFilterStartDate(null);
//         setFilterEndDate(null);
//         setCampaigns([...localValues]);

//     }
    
    
//     return (
//         <Card variant='outlined'>
//         <div>
//             <h1>Date Filter</h1>
//             <DatePicker
//             label="Start Date"
//             value={filterStartDate}
//             onChange={(newValue) => {
//                 setFilterStartDate(newValue);
//             }}
//             />
//             <DatePicker
//             label="End Date"
//             value={filterEndDate}
//             onChange={(newValue) => {
//                 setFilterEndDate(newValue);
//             }}
//             />

            
//           <Button disabled={((filterStartDate == null && filterEndDate == null) ? true: false)} onClick={handleFilter} variant="contained">Filter</Button>
//           <Button onClick={handleReset} variant="contained">Reset</Button>
          
//           <h1>Name Filter</h1>
//           <TextField id="outlined-basic" label="Outlined" variant="outlined" />
//           <Button  variant="contained">Search</Button>
//         </div>
//         </Card>
//     );
//     }

//     export default DateFilter;

import { FC, useState, useMemo, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { Campaign } from '../interfaces/campaign';
import { Card } from '@mui/material';

import dayjs from 'dayjs';

interface DateFilterProps {
  campaigns: Campaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
}

const DateFilter: FC<DateFilterProps> = ({ campaigns, setCampaigns }) => {
  const [filterStartDate, setFilterStartDate] = useState<string | null>(null);
  const [filterEndDate, setFilterEndDate] = useState<string | null>(null);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const localValues = campaigns;
  

  useEffect(() => {
    console.log('filterStartDate', filterStartDate);
    console.log('filterEndDate', filterEndDate);
  }, [filterStartDate, filterEndDate]);

  const handleFilter = () => {
    const newFilteredCampaigns: Campaign[] = [];
    console.log('localValues', localValues);

    // Go through the campaigns array and check if the campaign's start date is after the filter start date and if the campaign's end date is before the filter end date
    localValues.forEach((campaign) => {
      const startDate = dayjs(campaign.startDate, 'YYYY-MM-DDTHH:mm:ss Z');
      const endDate = dayjs(campaign.endDate, 'YYYY-MM-DDTHH:mm:ss Z');
      const filterStartDateTable = dayjs(filterStartDate, 'MM-DD-YYYY');
      const filterEndDateTable = dayjs(filterEndDate, 'MM-DD-YYYY');
      if (
        (filterStartDateTable != null || filterEndDateTable == null) &&
        (startDate.isAfter(filterStartDateTable) &&  endDate.isAfter(filterStartDateTable))
      ) {
        newFilteredCampaigns.push(campaign);
      } else if (
        (filterStartDateTable == null || filterEndDateTable != null) &&
        (endDate.isBefore(filterEndDateTable) && startDate.isBefore(filterEndDateTable))
      ) {
        newFilteredCampaigns.push(campaign);
      } else if (
        (filterStartDateTable != null || filterEndDateTable != null) &&
        (startDate.isAfter(filterStartDateTable) && endDate.isAfter(filterStartDate)) &&
        (endDate.isBefore(filterEndDateTable) && startDate.isBefore(filterEndDateTable) )
      ) {
        newFilteredCampaigns.push(campaign);
      }
    });
    // set the filtered campaigns state
    setCampaigns(newFilteredCampaigns);
    console.log('Filtered Campaigns: ', newFilteredCampaigns);
  };

  const handleReset = () => {
    setFilterStartDate(null);
    setFilterEndDate(null);
    console.log('localValues', localValues);
    setCampaigns([...localValues]);
  };

  return (
    <Card variant="outlined">
      <div>
        <h1>Date Filter</h1>
        <DatePicker
          label="Start Date"
          value={filterStartDate}
          onChange={(newValue) => {
            setFilterStartDate(newValue);
          }}
        />
        <DatePicker
          label="End Date"
          value={filterEndDate}
          onChange={(newValue) => {
            setFilterEndDate(newValue);
          }}
        />

        <Button
          disabled={!filterStartDate && !filterEndDate}
          onClick={handleFilter}
          variant="contained"
        >
          Filter
        </Button>
        <Button onClick={handleReset} variant="contained">
          Reset
        </Button>

        <h1>Name Filter</h1>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <Button variant="contained">Search</Button>
      </div>
    </Card>
  );
};

export default DateFilter;
