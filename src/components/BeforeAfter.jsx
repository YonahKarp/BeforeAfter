import React from 'react';
import '../scss/beforeAfterSimple.module.scss';
import { connect } from 'react-redux'

import html2canvas from 'html2canvas';



const BeforeAfter = (props) => {

    const isButtonActive = props.beforeImage.length > 200 && props.afterImage.length > 200

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


    return (
        <div className='compareContainer'>
            <div className={`button ${isButtonActive ? 'enabled' : 'disabled'}`} 
                onClick={() => isButtonActive ? copyCaptureToClipboard() : null}
            >
                copy to clipboard
            </div>
            <div id="compare">
                <div className='compareElement'>
                    <h2 contentEditable>Before</h2>
                    <img className='image' src={props.beforeImage} alt="Before" crossOrigin="anonymous"/>
                </div>
                <div className='compareElement'>
                    <h2 contentEditable>After</h2>
                    <img className='image' src={props.afterImage} alt="After" crossOrigin="anonymous"/>
                </div>
            </div>


        </div>
    );
}

const mapStateToProps = (state) => ({
    beforeImage: state.beforeImage,
    afterImage: state.afterImage
})


export default connect(mapStateToProps)(BeforeAfter)
