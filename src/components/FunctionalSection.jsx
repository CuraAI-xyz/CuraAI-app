import RecordingButton from "./recordingButton"
import ToggleButton from "./ToggleButton"

function FunctionalSection (){
    return(
        <section className="w-full flex flex-col justify-center gap-8">
            <RecordingButton/>
            <div className="border-1 rounded-lg mx-auto h-80 w-6/12 border-gray-200 shadow-sm overflow-y-auto">
            <p className="flex justify-between bg-gray-100 p-4 font-bold text-xl text-gray-600 rounded-t-lg">Conversation <ToggleButton/></p>
            </div>
        </section>
    )
}

export default FunctionalSection