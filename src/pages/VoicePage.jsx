import Header from '../components/Header.jsx'
import soundWave from '../assets/wave-sound.png'
import FunctionalSection from '../components/FunctionalSection.jsx'
function VoicePage() {
  return (
    <>
    <Header/>
    <main className='w-full h-auto flex justify-center items-center flex-col gap-20'>
      <img src={soundWave} width={150} alt="" />
      <div>
      <h1 className='font-bold text-6xl text-center text-[#0D1B2A]'>Welcome to CuraAI</h1>
      <p className='mx-auto text-center w-100 text-gray-500'>Simply press the 'Start a call' button and start speaking.</p>
      </div>
      <FunctionalSection/>
      <h2 className='text-4xl mt-50 font-bold text-[#0D1B2A]'>What Cura can do?</h2>
      <div className='flex max-w-full mx-auto gap-20 bg-[#61A5C2] p-10 rounded-lg text-white overflow-x-auto'>
        <div className='flex flex-col justify-center gap-6 max-w-md'>
        <h3 className='font-bold text-3xl'>Assist you in receiving documents</h3>
        <p className='font-bold'>Our agent has a feature called "Scan my docs," which allows users to upload documents directly from the page. The system analyzes and extracts the text from the file for processing, summarizing, or use in other automated tasks.</p>
        </div>
        <img className='rounded-lg max-w-full' height={300} width={300} src="/documentsReception.jpg" alt="" />
      </div>
      <div className='flex max-w-full mx-auto gap-20 bg-[#61A5C2] p-10 rounded-lg text-white overflow-x-auto'>
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
