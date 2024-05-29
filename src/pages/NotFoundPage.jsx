import { Button, CenterContainer } from "@/components";
import NotFoundImage from "../assets/images/NotFoundImage.png";
import {useNavigate} from "react-router-dom"
export default function NotFoundPage() {
  const navigate = useNavigate()
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <CenterContainer>
      <div>
        <img src={NotFoundImage} alt="Not Found" />
        <div className="flex justify-center mt-20">
          <div className="flex gap-3 w-[500px]">
            <Button filled="true" onClick={() => navigate(-1)}>
              Go to Home Page
            </Button>
            <Button onClick={reloadPage} outlined="true">
              Reload Page
            </Button>
          </div>
        </div>
      </div>
    </CenterContainer>
  );
}
