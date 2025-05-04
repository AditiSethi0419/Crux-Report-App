import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { ExpandMore } from '@mui/icons-material';
import { useState } from 'react';

const COLORS = ['#4caf50', '#f44336', '#9e9e9e'];

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
      d.lcp <= passThresholds.lcp &&
      d.fcp <= passThresholds.fcp &&
      d.inp <= passThresholds.inp &&
      d.cls <= passThresholds.cls
    );
  }).length;

  const failed = withData - passed;

  const poorLcpUrls = data.filter(d => d.hasData && d.lcp > passThresholds.lcp);
  const poorClsUrls = data.filter(d => d.hasData && d.cls > passThresholds.cls);
  const poorInpUrls = data.filter(d => d.hasData && d.inp > passThresholds.inp);

  const chartData = [
    { name: 'Passed', value: passed },
    { name: 'Failed', value: failed },
    { name: 'No Data', value: withoutData }
  ];

  // Accordion state management
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ mt: 4 }}>
      {/* Performance Pie Chart */}
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

      {/* Performance Summary */}
      <Typography variant="h6" sx={{ mt: 2 }}>Performance Summary:</Typography>
      <Typography>Avg LCP: {passed > 0 ? (data.reduce((acc, curr) => acc + (curr.lcp || 0), 0) / passed).toFixed(2) : 'N/A'} ms</Typography>
      <Typography>Avg CLS: {passed > 0 ? (data.reduce((acc, curr) => acc + (curr.cls || 0), 0) / passed).toFixed(2) : 'N/A'}</Typography>
      <Typography>Avg INP: {passed > 0 ? (data.reduce((acc, curr) => acc + (curr.inp || 0), 0) / passed).toFixed(2) : 'N/A'} ms</Typography>

      {/* Accordion for LCP */}
      <Accordion expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')} sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>LCP Issues</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {poorLcpUrls.length > 0 ? (
            poorLcpUrls.map((url) => (
              <Typography key={url.url}>{url.url} - LCP: {url.lcp} ms</Typography>
            ))
          ) : (
            <Typography>No URLs with poor LCP found. All URLs are performing well!</Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Accordion for CLS */}
      <Accordion expanded={expanded === 'panel2'} onChange={handleAccordionChange('panel2')} sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>CLS Issues</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {poorClsUrls.length > 0 ? (
            poorClsUrls.map((url) => (
              <Typography key={url.url}>{url.url} - CLS: {url.cls}</Typography>
            ))
          ) : (
            <Typography>No URLs with poor CLS found. All URLs are performing well!</Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Accordion for INP */}
      <Accordion expanded={expanded === 'panel3'} onChange={handleAccordionChange('panel3')} sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>INP Issues</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {poorInpUrls.length > 0 ? (
            poorInpUrls.map((url) => (
              <Typography key={url.url}>{url.url} - INP: {url.inp} ms</Typography>
            ))
          ) : (
            <Typography>No URLs with poor INP found. All URLs are performing well!</Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
