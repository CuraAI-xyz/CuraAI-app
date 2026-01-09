import CardPacientes from "./CardPacientes"
import CardTurnos from "./CardTurnos"
function DoctorMenu(){
return(
    <div className="p-6 flex">
        <CardPacientes/>
        <CardTurnos/>
    </div>
)
}

export default DoctorMenu