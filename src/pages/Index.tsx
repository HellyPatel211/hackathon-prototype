import { useNavigate } from "react-router-dom";
import WellnessHero from "@/components/WellnessHero";

const Index = () => {
  const navigate = useNavigate();
  return <WellnessHero onStart={() => navigate("/check")} />;
};

export default Index;
