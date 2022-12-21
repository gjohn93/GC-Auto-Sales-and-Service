import { NavLink } from 'react-router-dom';
import "./MainPage.css"


function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1>
        <img
          src={"./gc-auto-sales-and-service-logo.png"}
          style={{ width: 400, height: 400 }}
        ></img>
      </h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Your #1 resource for all your automotive needs!
        </p>
        <p className="lead mb-4">Sales or Service, we've got you covered!</p>
      </div>
    </div>
  );
}
export default MainPage;
