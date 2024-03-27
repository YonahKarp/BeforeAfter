import React, { Component } from 'react'
import { connect } from 'react-redux'
import './scss/index.scss'

import { setData } from './actions'
import ImageDrop from './components/ImageDrop'
import ImageSlider from './components/ImageSlider'
import BeforeAfter from './components/BeforeAfter'


export class App extends Component {



	render() {

		return (
			<div>
				<h2>Before After compare</h2>
				<ImageDrop/>
				{/* <ImageSlider/> */}
				<BeforeAfter/>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => {
	return {
		onDataFetched: (data) => {
			dispatch(setData(data))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
