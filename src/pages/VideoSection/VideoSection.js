import React,{useRef,useEffect, useState} from "react";
import "./VideoSection.css";

function VideoSection() {
    const refVideo = useRef(null);
    const refVideo2 = useRef(null);
    const [isMuted, setIsMuted] = useState(false)
    const [isMuted2, setIsMuted2] = useState(true)
    const [src, setsrc] = useState("assets/video/XPercentmp4.mp4")
    const [src2, setsrc2] = useState("assets/video/samsungmp4.mp4")
    console.log("ismuted outside", isMuted)
    useEffect(() => {
       console.log("ismuted", isMuted)
        if (!refVideo.current) {
            return;
        }

        if (isMuted) {
            console.log("ismuted>>>>>", isMuted)
            refVideo.current.defaultMuted = true;
            refVideo.current.muted = true;
            setIsMuted(!isMuted)
        }
        setsrc("assets/video/XPercentmp4.mp4")
        refVideo.current.src = src;
    }, [src,isMuted]);
    useEffect(() => {
   
        if (!refVideo2.current) {
            return;
        }

        if (isMuted2) {
            //open bug since 2017 that you cannot set muted in video element https://github.com/facebook/react/issues/10389
            refVideo2.current.defaultMuted = true;
            refVideo2.current.muted = true;
         
        }

        setsrc2("assets/video/samsungmp4.mp4")
        refVideo2.current.src = src2;
    }, [src2]);
  return <div className="video_containter">
    <div className="video_outer_wrapper">
    <div className="video_wrapper">
    <video ref={refVideo} src="assets/video/XPercentmp4.mp4" height="400" loop controls autoPlay playsInline muted controlsList="nodownload">
 
     </video>
    
    </div>
    <div className="video_wrapper">
    <video  ref={refVideo2} src="assets/video/samsungmp4.mp4" height="400" loop controls  playsInline muted controlsList="nodownload">
 
 </video>
 </div>
 </div>
  </div>;
}

export default VideoSection;
