import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography } from '@mui/material';

const HouseStatusChart = ({ data }) => {
  // Format the data for the PieChart
  const vacantHouses = data.filter((house) => house.occupied === false).length;
  const occupiedHouses = data.filter((house) => house.occupied === true).length;

  const formattedData = [
    { name: 'Vacant Houses', value: vacantHouses },
    { name: 'Occupied Houses', value: occupiedHouses }
  ];

  console.log("formattedData", formattedData);

  return (
    <>

      <Box sx={{ width: 500, height: 180 }}>
      <PieChart
            series={[{ data: formattedData }]}
            labelKey= 'name'
            angleKey= 'value'
            radiusKey= 'value'
            innerRadiusRatio= {0.6}
            fillOpacity= {0.75}
            colors= {['#0088FE', '#00C49F']}
            label={{
                visible: true,
                position: 'center',
                fill: 'white',
                fontSize: 14,
                backgroundColor: 'rgba(0,0,0,0.5)',
                fontWeight: 700,
                content: (data) => `${data.datum.name}: ${data.datum.value}`,
            }}
        />

      </Box>
    </>
  );
}

export default HouseStatusChart;