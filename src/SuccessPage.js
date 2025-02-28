import React from "react";
import { Box, Typography } from "@mui/material";

const SuccessPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      gap={2}
    >
      <Typography variant="h4" color="success.main">
        Verification Successful!
      </Typography>
    </Box>
  );
};

export default SuccessPage;
