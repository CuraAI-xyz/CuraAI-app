import React from 'react';
import soundWave from '../assets/wave-sound.png';
import voiceIcon from '../assets/voice.png';
function RecordingButton() {
    const [isRecording, setIsRecording] = React.useState(false);

    const record = () => {
        setIsRecording(!isRecording);
    }

    const start = () => setIsRecording(true);
    const stop = () => setIsRecording(false);
  return (
    <>
    <button onMouseDown={start} onMouseUp={stop} className="w-30 h-30 p-8 mx-auto rounded-full bg-[#61A5C2] active:bg-[#5d9cb7]"><img src="/microphone.png" alt="" /></button>
    {isRecording ? <div className='flex gap-3 w-min mx-auto items-center'><p className='mx-auto font-semibold'>Recording...</p><div className='h-2 w-2 bg-red-600 rounded-full'></div></div> : null}
    </>
  );
}

export default RecordingButton;