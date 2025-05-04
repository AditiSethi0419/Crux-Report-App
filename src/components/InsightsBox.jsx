import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useState } from 'react';
import MetricAccordion from './MetricAccordion';

const COLORS = ['#4caf50', '#f44336', '#9e9e9e'];


function getAverage(data, key, unit = '') {
  const numericValues = data
    .filter(d => d.hasData)
    .map(d => parseFloat(d[key]))
    .filter(val => !isNaN(val));

  if (numericValues.length === 0) return 'N/A';

  const average = numericValues.reduce((sum, val) => sum + val, 0) / numericValues.length;
  return `${average.toFixed(2)}${unit}`;
}

export default function InsightsBox({ data }) {
  const total = data.length;
  const withData = data.filter(d => d.hasData).length;
  const withoutData = total - withData;

  const passThresholds = {
    lcp: 2500,
    fcp: 1800,
    inp: 200,
    cls: 0.1,
  };

  const passed = data.filter(d => {
    return (
      d.hasData &&
      parseFloat(d.lcp) <= passThresholds.lcp &&
      parseFloat(d.fcp) <= passThresholds.fcp &&
      parseFloat(d.inp) <= passThresholds.inp &&
      parseFloat(d.cls) <= passThresholds.cls
    );
  }).length;

  const failed = withData - passed;

  const poorLcpUrls = data.filter(d => d.hasData && parseFloat(d.lcp) > passThresholds.lcp);
  const poorClsUrls = data.filter(d => d.hasData && parseFloat(d.cls) > passThresholds.cls);
  const poorInpUrls = data.filter(d => d.hasData && parseFloat(d.inp) > passThresholds.inp);

  const chartData = [
    { name: 'Passed', value: passed },
    { name: 'Failed', value: failed },
    { name: 'No Data', value: withoutData }
  ];

  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ mt: 4 }}>
    
      <Box sx={{ display: 'flex',justifyContent: 'space-around', flexWrap: 'wrap' }}>
      <Box sx={{ display: 'flex',flexDirection:'column' , justifyContent:'center'}}>
          <Typography variant="h6"  sx={{ mt: 2  }}>Performance Summary:</Typography>
          <Typography>Avg LCP: {getAverage(data, 'lcp', ' ms')}</Typography>
          <Typography>Avg CLS: {getAverage(data, 'cls')}</Typography>
          <Typography>Avg INP: {getAverage(data, 'inp', ' ms')}</Typography>
        </Box>
        <Box>
          <PieChart width={400} height={300}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </Box>

    
      </Box>

      {/* Accordion for issues */}
      <MetricAccordion
        expanded={expanded}
        handleChange={handleAccordionChange}
        panelId="panel1"
        title="LCP"
        issues={poorLcpUrls}
        metricKey="lcp"
        unit=" ms"
      />

      <MetricAccordion
        expanded={expanded}
        handleChange={handleAccordionChange}
        panelId="panel2"
        title="CLS"
        issues={poorClsUrls}
        metricKey="cls"
      />

      <MetricAccordion
        expanded={expanded}
        handleChange={handleAccordionChange}
        panelId="panel3"
        title="INP"
        issues={poorInpUrls}
        metricKey="inp"
        unit=" ms"
      />
    </Box>
  );
}
