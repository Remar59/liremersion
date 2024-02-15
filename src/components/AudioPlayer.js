import { tracks } from '../data/tracks';
import { useRef, useState } from 'react';

// import components
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';

const AudioPlayer = () => {
    
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const audioRef = useRef();
  const progressBarRef = useRef();
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  return (
    <div className="audio-player">
      <div className="inner">
      <DisplayTrack {...{ currentTrack, audioRef, setDuration, progressBarRef }} />
      <Controls {...{ audioRef, progressBarRef, duration, setTimeProgress }} />
      <ProgressBar
          {...{ progressBarRef, audioRef, timeProgress, duration }}
        />
      </div>
    </div>
  );
};
export default AudioPlayer;