import React, { useState } from 'react';
import '../scss/beforeAfterSlider.module.scss';
import { setAfterImage, setBeforeImage } from '../actions';
import { connect } from 'react-redux'


const ImageDrop = (props) => {

  const handleImageDrop = (event, setImageFunction) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageFunction(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please drop an image file.');
    }
  }

  return (
    <div>
        <div className='container'>
        <div className='imageContainer'>
            <div
            className='dropArea'
            onDrop={(event) => handleImageDrop(event, props.onSetBeforeImage)}
            onDragOver={(event) => event.preventDefault()}
            >
            Drop BEFORE image here
            </div>
        </div>
        <div className='imageContainer'>
            <div
              className='dropArea'
              onDrop={(event) => handleImageDrop(event, props.onSetAfterImage)}
              onDragOver={(event) => event.preventDefault()}
              >
              Drop AFTER image here
              </div>
          </div>
        </div>
    </div>
  );
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
  return {
    onSetBeforeImage: (image) => {
      dispatch(setBeforeImage(image))
    },
    onSetAfterImage: (image) => {
      dispatch(setAfterImage(image))
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageDrop)
