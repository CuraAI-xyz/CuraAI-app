import Header from '../components/Header.jsx'
import soundWave from '../assets/wave-sound.png'
import FunctionalSection from '../components/FunctionalSection.jsx'
import { UserContext } from '../userContext.jsx'
import { useContext } from 'react'
import { InlineWidget } from "react-calendly";

function VoicePage() {
  const { showCalendar } = useContext(UserContext);

  return (
    <>
      <Header/>
      <main className='w-full h-auto flex justify-center items-center pb-10 flex-col gap-20'>
        <img src={soundWave} width={150} alt="" />
        
        <div>
          <h1 className='font-bold text-6xl text-center text-[#0D1B2A]'>Welcome to CuraAI</h1>
          <p className='mx-auto text-[15px] text-center w-100 text-gray-500'>Just press and hold the microphone to speak</p>
        </div>
        <FunctionalSection/>
        {showCalendar ? (
          <div className="w-full">
            <InlineWidget 
              url="https://calendly.com/mauroradino22/30min"
              styles={{ height: '700px' }} 
              utm={{ utmSource: 'facebook', utmCampaign: 'spring_sale' }} 
              prefill={{ name: 'Jane Doe', email: 'jane@example.com' }} 
            />
          </div>
        ) : null}

        <h2 className='text-4xl mt-12 font-bold text-[#0D1B2A]'>What Cura can do?</h2>
        
        <div className='flex w-9/12 mx-auto gap-20 bg-[#61A5C2] p-10 rounded-lg text-white flex-col lg:w-7/12 lg:h-90 md:flex-row md:w-10/12 md:h-80'>
          <div className='flex w-full flex-col justify-center gap-6 max-w-md'>
            <h3 className='font-bold text-3xl'>Assist you in receiving documents</h3>
            <p className='font-bold w-full'>Our agent has a feature called "Scan my docs," which allows users to upload documents directly from the page. The system analyzes and extracts the text from the file for processing, summarizing, or use in other automated tasks.</p>
          </div>
          <img className='rounded-lg max-w-full' height={300} width={300} src="/documentsReception.jpg" alt="" />
        </div>
        
        <div className='flex w-9/12 mx-auto gap-20 bg-[#61A5C2] p-10 rounded-lg text-white flex-col lg:w-7/12 lg:h-90 md:flex-row md:w-10/12'>
          <div className='flex flex-col justify-center gap-6 max-w-md'>
            <h3 className='font-bold text-3xl'>Medical Asisstant 24 hours</h3>
            <p className='font-bold'>Our agent has a feature called "Scan my docs," which allows users to upload documents directly from the page. The system analyzes and extracts the text from the file for processing, summarizing, or use in other automated tasks.</p>
          </div>
          <img className='rounded-lg max-w-full' height={300} width={300} src="/docTalking.jpg" alt="" />
        </div>
      </main>
    </>
  )
}

export default VoicePage