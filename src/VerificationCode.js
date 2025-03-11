import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerificationCode = () => {
  const [code, setCode] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [hasInteracted, setHasInteracted] = useState(Array(6).fill(false));
  const [loading,setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState(Array(6).fill(false));
  const navigate = useNavigate();

  useEffect(() => {
    setError("");
    handleValidationErrors();
  }, [code]);

  const handleChange = (value, index) => {
    setHasInteracted(pre=>{
      const newHasInteracted = [...pre];
      newHasInteracted[index] = true;
      return newHasInteracted;
    });
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      document.getElementById(`digit-${index + 1}`).focus();
    }
  };

  const handlePaste = (event) => {
    setHasInteracted(pre=>{
      return pre.map(() => true);
    });
    const pasteData = event.clipboardData.getData("Text").slice(0, 6);
    if (/^\d{1,6}$/.test(pasteData)) {
      const newCode = Array(6).fill("");
      for (let i = 0; i < pasteData.length; i++) {
        newCode[i] = pasteData[i];
      }
      setCode(newCode);
      document.getElementById(`digit-${pasteData.length - 1}`).focus();
    }
  };

  const handleKeyDown = (event, index) => {
    setHasInteracted(pre=>{
      const newHasInteracted = [...pre];
      newHasInteracted[index] = true;
      return newHasInteracted;
    });
    if (event.key === "Backspace") {
      const newCode = [...code];
      if (code[index] !== "") {
        newCode[index] = "";
      } else if (index > 0) {
        document.getElementById(`digit-${index - 1}`).focus();
        newCode[index - 1] = "";
      }
      setCode(newCode);
    }
  };
  

  const handleSubmit = async () => {
    if (handleValidationErrors()) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("https://blys-api.krishna-acharya.com.np/api/verify", { code: code.join("") });
      console.log(response,'response');
      if (response.status === 200) {
        navigate("/success");
      }
    } catch (err) {
      setError("Verification Error");
    }finally{
      setLoading(false);
    }
  };

  const handleValidationErrors = () => {
    const errors = code.map((digit,index) => (hasInteracted[index] && (digit === "" || !/^\d?$/.test(digit))));
    setValidationErrors(errors);
    return errors.some((error) => error);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      gap={2}
    >
      <Typography variant="h5">Verification Code :</Typography>
      <Box display="flex" gap={0.5} onPaste={handlePaste}>
        {code.map((digit, index) => (
          <TextField
            key={index}
            id={`digit-${index}`}
            value={digit}
            sx={{ width: "50px",p:0 }}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
            error={validationErrors[index]}
          />
        ))}
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
      <Button disabled={loading} variant="contained" color="primary" onClick={handleSubmit}>
        {loading ? "Verifying..." : "Submit"}
      </Button>
      <Alert severity="info">Only pasting 6 digit code will automatically populate the input fields</Alert>
    </Box>
  );
};

export default VerificationCode;
