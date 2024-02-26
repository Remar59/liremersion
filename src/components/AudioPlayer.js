import { useEffect, useRef, useState } from "react";
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import { tracks } from "../data/tracks";

const AudioPlayer = ({ selectedTrack, backgroundColor }) => {
  // states
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [background, setBackground] = useState('transparent');

  // reference
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    setBackground(backgroundColor);
  }, [backgroundColor]);

  useEffect(() => {
    if (selectedTrack) {
      setCurrentTrack(selectedTrack)
    }
  }, [selectedTrack])


  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  return (
    <>
      <div className="audio-player" style={{ backgroundColor: currentTrack.color }}>
        <div className="inner">
          <div className="upperInner">
            <DisplayTrack
              {...{
                currentTrack,
                audioRef,
                setDuration,
                progressBarRef,
                handleNext,
              }}
            />
            <Controls
              {...{
                audioRef,
                progressBarRef,
                duration,
                setTimeProgress,
                tracks,
                trackIndex,
                setTrackIndex,
                setCurrentTrack,
                handleNext,
              }}
            />
          </div>
          <ProgressBar
            {...{ progressBarRef, audioRef, timeProgress, duration }}
          />
        </div>
      </div>
    </>
  );
};
export default AudioPlayer;
