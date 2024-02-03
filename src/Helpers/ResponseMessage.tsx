import React from "react";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";

interface ResponseMessageProps {
  status: number;
  message: string;
}

const ResponseMessage: React.FC<ResponseMessageProps> = ({
  status,
  message,
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 201:
        return <CheckCircleOutline color="success" fontSize="large" />;
      case 404:
      case 500:
        return <ErrorOutline color="error" fontSize="large" />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {getStatusIcon()}
      <p style={{ marginLeft: "8px" }}>{message}</p>
    </div>
  );
};

export default ResponseMessage;
