import React, {useState, useRef, useCallback} from 'react';
import '../scss/beforeAfterSimple.module.scss';
import { connect } from 'react-redux'

import html2canvas from 'html2canvas';



const BeforeAfter = (props) => {

    const isImageButtonActive = (props.beforeImage?.length ?? 0) > 200 && (props.afterImage?.length ?? 0) > 200
    const isVideoButtonActive = (props.beforeVideo != null || props.afterVideo != null)

    const copyCaptureToClipboard = () => {
        let element = document.querySelector('#compare');

        html2canvas(element, {
            allowTaint : true,
            dpi: 144,
            useCors : true
        }).then(canvas => {
            // Create an 'a' element to download the image
            let a = document.createElement('a');
            // Convert the canvas to a Blob object
            canvas.toBlob(blob => {
                // Create a new ClipboardItem from the Blob
                let item = new ClipboardItem({ 'image/png': blob });
                // Write the ClipboardItem to the clipboard
                navigator.clipboard.write([item]).then(function() {
                    console.log('Image copied to clipboard');
                }).catch(function(error) {
                    console.error('Failed to copy image to clipboard: ', error);
                });
            });
        });

    }

    

    const [beforeVideoStart, setBeforeVideoStart] = useState(0)
    const [afterVideoStart, setAfterVideoStart] = useState(0)
    const beforeVideoRef = useRef(null)
    const afterVideoRef = useRef(null)

   
    const onBeforeVideoStartChanged = useCallback((e) => {
        setBeforeVideoStart(e.target.value)
        if(beforeVideoRef.current){
            const video = beforeVideoRef.current
            video.currentTime = e.target.value
            if(!video.paused || !afterVideoRef.current?.paused) pauseVideos()
        }
    }, [pauseVideos])

    const onAfterVideoStartChanged = useCallback((e) => {
        setAfterVideoStart(e.target.value)
        if(afterVideoRef.current){
            const video = afterVideoRef.current
            video.currentTime = e.target.value
            if(!video.paused || !beforeVideoRef.current?.paused) pauseVideos()
        }
    }, [pauseVideos])

    const beforeVideoOnEnded = useCallback(() => {
        if(beforeVideoRef.current) beforeVideoRef.current.currentTime = beforeVideoStart
    }, [beforeVideoStart])

    const afterVideoOnEnded = useCallback(() => {
        if(afterVideoRef.current) afterVideoRef.current.currentTime = afterVideoStart
    }, [afterVideoStart])


    const startVideos = useCallback(() => {
        if(beforeVideoRef.current){
            beforeVideoRef.current.currentTime = beforeVideoStart
            beforeVideoRef.current.play()
        } 

        if(afterVideoRef.current){
            afterVideoRef.current.currentTime = afterVideoStart
            afterVideoRef.current.play()
        } 
        
    }, [beforeVideoStart, afterVideoStart])

    const pauseVideos = useCallback(() => {
        if(beforeVideoRef.current){
            beforeVideoRef.current.currentTime = beforeVideoStart
            beforeVideoRef.current.pause()
        } 

        if(afterVideoRef.current){
            afterVideoRef.current.currentTime = afterVideoStart
            afterVideoRef.current.pause()
        } 
        
    }, [beforeVideoStart, afterVideoStart])



    return (
        <div className='compareContainer'>
            {!isVideoButtonActive ?
                <div className={`button ${isImageButtonActive ? 'enabled' : 'disabled'}`} 
                    onClick={() => isImageButtonActive ? copyCaptureToClipboard() : null}
                >
                    copy to clipboard
                </div>
                :  <div className='button' onClick={startVideos}>
                        Play Videos ▶️
                    </div>
            }
            <div id="compare">
                <div className='compareElement'>
                    <h2 contentEditable>Before</h2>
                    {props.beforeImage && <img src={props.beforeImage} alt="Before" crossOrigin="anonymous"/>}
                    {props.beforeVideo && <>
                        <video src={props.beforeVideo} alt="beforeVideo" ref={beforeVideoRef} onEnded={beforeVideoOnEnded}/>
                        <input className='vidStartSlider' type="range" 
                            max={beforeVideoRef.current?.duration} min={0} step={0.1}
                            value={beforeVideoStart}
                            onChange={onBeforeVideoStartChanged}/>
                    </>}
                </div>
                <div className='compareElement'>
                    <h2 contentEditable>After</h2>
                    {props.afterImage && <img src={props.afterImage} alt="After" crossOrigin="anonymous"/>}
                    {props.afterVideo && <>
                        <video src={props.afterVideo} alt="afterVideo" ref={afterVideoRef} onEnded={afterVideoOnEnded}/>
                        <input className='vidStartSlider' type="range"
                            max={afterVideoRef.current?.duration} min={0} step={0.1}
                            value={afterVideoStart}
                            onChange={onAfterVideoStartChanged}/>
                        
                    </>}

                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    beforeImage: state.beforeImage,
    afterImage: state.afterImage,
    beforeVideo: state.beforeVideo,
    afterVideo: state.afterVideo,

})


export default connect(mapStateToProps)(BeforeAfter)
