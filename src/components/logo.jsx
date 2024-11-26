import { useNavigate } from "react-router-dom";
export default function Logo({ className }) {
  const navigate = useNavigate();
  return (
    <img
      src="src/assets/logo.svg"
      className={className}
      onClick={() => navigate("/")}
    />
  );
}
