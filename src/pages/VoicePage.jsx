import Header from '../components/Header.jsx'
import soundWave from '../assets/wave-sound.png'
// import FunctionalSection from '../components/FunctionalSection.jsx' // Lo tenías comentado
import { UserContext } from '../userContext.jsx'
import { useContext, useState, useEffect } from 'react' // Importante: agregar useEffect
import { InlineWidget } from "react-calendly";
import VoiceRecorder from './VoiceRecorder.jsx'
import FunctionalityGrid from '../components/FunctionalityGrid.jsx'

function VoicePage() {
  const { showCalendar, setShowCalendar, userId } = useContext(UserContext);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    let intervalId;

    if (showCalendar && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } 
    else if (timeLeft === 0) {
      setShowCalendar(false);
    }
    return () => clearInterval(intervalId);
  }, [showCalendar, timeLeft, setShowCalendar]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <Header/>
      <main className='w-full h-auto flex justify-center items-center pb-10 flex-col gap-20 font-rubik'>
        <img src={soundWave} width={150} alt="" />
        
        <div>
          <h1 className='font-bold text-6xl text-center text-[#0D1B2A]'>Bienvenido a CuraAI</h1>
          <p className='mx-auto text-[15px] text-center w-100 text-gray-500'>Presioná el boton 'Grabar' para empezar a hablar con Cura</p>
        </div>
        
        <VoiceRecorder patientId={userId}/>

        {showCalendar ? (
          <div className="w-full flex justify-center flex-col items-center gap-4">
            <div className="flex flex-col items-center">
                <span className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-2">El calendario se cierra en: </span>
                <div className={`text-5xl font-bold font-mono ${timeLeft < 60 ? "text-red-500" : "text-[#61A5C2]"}`}>
                {formatTime(timeLeft)}
                </div>
            </div>

            <InlineWidget 
              url="https://calendly.com/mauroradino22/30min"
              styles={{ height: '700px', width: '100%' }} 
              utm={{ utmSource: 'facebook', utmCampaign: 'spring_sale' }} 
              prefill={{ name: 'Jane Doe', email: 'jane@example.com' }} 
            />
          </div>
        ) : null}

        <h2 className='text-4xl mt-12 font-bold text-[#0D1B2A]'>Que puede hacer Cura?</h2>
        <FunctionalityGrid/>
      </main>
    </>
  )
}

export default VoicePage