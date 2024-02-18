import { useRef, useState, useEffect } from 'react';
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import { useParams } from 'react-router-dom';

const AudioPlayer = ({ tracks }) => {

  const { id } = useParams();

  // states
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(null
  );
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // references
  const audioRef = useRef();
  const progressBarRef = useRef();

  useEffect(() => {
    const selectedTrack = tracks.find(track => track.id === id);
    if (selectedTrack) {
      setCurrentTrack(selectedTrack);
      
    }
  }, [id, tracks]);

  const handleNext = () => {
    const newIndex = trackIndex === tracks.length - 1 ? 0 : trackIndex + 1;
    setTrackIndex(newIndex);
    setCurrentTrack(tracks[newIndex]);
  };

  return (
    <div className="audio-player">
      <div className="inner">
        {currentTrack && (
          <>
            <DisplayTrack
              currentTrack={currentTrack}
              audioRef={audioRef}
              setDuration={setDuration}
              progressBarRef={progressBarRef}
              handleNext={handleNext}
            />
            <Controls
              audioRef={audioRef}
              progressBarRef={progressBarRef}
              duration={duration}
              setTimeProgress={setTimeProgress}
              tracks={tracks}
              trackIndex={trackIndex}
              setTrackIndex={setTrackIndex}
              setCurrentTrack={setCurrentTrack}
              handleNext={handleNext}
            />
            <ProgressBar
              progressBarRef={progressBarRef}
              audioRef={audioRef}
              timeProgress={timeProgress}
              duration={duration}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;