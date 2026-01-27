import { useNavigate } from "react-router";

function HealthRecord() {
  const navigate = useNavigate();

  return (
    <button type="button" onClick={() => navigate("/reminder/add")}>
      +
    </button>
  );
}

export default HealthRecord;
