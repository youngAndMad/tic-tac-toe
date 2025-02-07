import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      sx={{ mt: 2 }}
      onClick={() => navigate(-1)}
    >
      Go back
    </Button>
  );
};

export default GoBackButton;
