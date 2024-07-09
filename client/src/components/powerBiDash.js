const { Box, Card, CardContent, Typography } = require("@mui/material");

const PowerBIDashboard = ({ embedUrl }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        p: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 1200, height: "80vh" }}>
        <CardContent sx={{ p: 2, height: "100%" }}>
          <Typography variant="h5" component="div" gutterBottom>
            Power BI Dashboard
          </Typography>
          <Box sx={{ height: "100%", mt: 2 }}>
            <iframe
              width="100%"
              height="100%"
              src={embedUrl}
              frameBorder="0"
              allowFullScreen
              title="Power BI Dashboard"
              style={{ border: "none", borderRadius: 8 }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

const PowerBIDash = () => {
  // Replace with your actual embed URL from Power BI
  const embedUrl =
    "https://app.powerbi.com/view?r=eyJrIjoiY2E0YjY3MjktYjRkNC00ZTM0LWE3YWItYjJkOTdiYTMwMmM4IiwidCI6IjU2ZTkwZjFhLTBiZjEtNDA0MC1hZTczLTZkY2VkZWRlMjJjZiIsImMiOjh9";

  return (
    <div className="App">
      <h1>Power BI Dashboard Integration</h1>
      <PowerBIDashboard embedUrl={embedUrl} />
    </div>
  );
};

export default PowerBIDash;
