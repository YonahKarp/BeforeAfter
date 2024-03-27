import React, { useState } from 'react';
import '../scss/beforeAfterSlider.module.scss';
import { connect } from 'react-redux'


const ImageSlider = (props) => {
  const [sliderPosition, setSliderPosition] = useState(50);



  const handleSliderChange = (event) => {
    setSliderPosition(event.target.value);
  }

  return (
      <div className='sliderContainer'>
          <input type="range" min="0" max="100" value={sliderPosition} onChange={handleSliderChange} />
          <div className={'beforeAfterContainer'}>
              <div className={'sliderImage beforeImage'}  style={{ width: `${sliderPosition}%`, overflow: 'hidden' }}>

                  <img 
                      className='image'
                      src={props.beforeImage} 
                      alt="Before" />
              </div>
              <img className='sliderImage image' src={props.afterImage} alt="After" />
          </div>
      </div>
  );
}

const mapStateToProps = (state) => ({
    beforeImage: state.beforeImage,
    afterImage: state.afterImage
})


export default connect(mapStateToProps)(ImageSlider)
