import DashboardMenu from "../components/DashboardMenu";
import DoctorMenu from "../components/DoctorMenu";
function DoctorDashboard() {
  return (
    <div className="flex">
        <DashboardMenu/>
        <DoctorMenu/>
    </div>
  );
}
export default DoctorDashboard;