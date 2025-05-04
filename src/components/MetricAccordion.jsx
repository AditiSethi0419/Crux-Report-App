import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

export default function MetricAccordion({ expanded, handleChange, panelId, title, issues, metricKey, unit = '' }) {
  return (
    <Accordion expanded={expanded === panelId} onChange={handleChange(panelId)} sx={{ mt: 2 }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{title} Issues</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {issues.length > 0 ? (
          issues.map((urlData) => (
            <Typography key={urlData.url}>
              {urlData.url} - {title}: {urlData[metricKey]}{unit}
            </Typography>
          ))
        ) : (
          <Typography>No URLs with poor {title} found. All URLs are performing well!</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
