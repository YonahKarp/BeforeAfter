import React, { useState } from 'react';
import '../scss/beforeAfterSlider.module.scss';
import { connect } from 'react-redux'


const ImageSlider = (props) => {
  const [sliderPosition, setSliderPosition] = useState(50);



  const handleSliderChange = (event) => {
    setSliderPosition(event.target.value);
  }

  if(props.beforeVideo || props.afterVideo)
    return null

  return (
      <div className='sliderContainer'>
          <input type="range" min="0" max="100" value={sliderPosition} onChange={handleSliderChange} />
          <div className={'beforeAfterContainer'}>
              <div className={'sliderImage beforeImage'}  style={{ width: `${sliderPosition}%`, overflow: 'hidden' }}>

                  {props.beforeImage && <img src={props.beforeImage} alt="Before" />}
                  {props.beforeVideo && <video src={props.beforeVideo} alt='Before'/>}
              </div>

              {props.afterImage && <img className='sliderImage image' src={props.afterImage} alt="After" />}
              {props.afterVideo && <video src={props.afterVideo} alt='After'/>}
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


export default connect(mapStateToProps)(ImageSlider)
