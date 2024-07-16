
export const SET_DATA = 'SET_DATA';
export const SET_BEFORE_IMAGE = 'SET_BEFORE_IMAGE'
export const SET_AFTER_IMAGE = 'SET_AFTER_IMAGE'
export const SET_BEFORE_VIDEO = 'SET_BEFORE_VIDEO'
export const SET_AFTER_VIDEO = 'SET_AFTER_VIDEO'

export function setData(data) {
	return {
		type: SET_DATA,
		payload: {
			data
		}
	}
}

export function setBeforeImage(image) {
	return {
		type: SET_BEFORE_IMAGE,
		payload: image
	}
}

export function setAfterImage(image) {
	return {
		type: SET_AFTER_IMAGE,
		payload: image
	}
}

export function setBeforeVideo(video) {
	return {
		type: SET_BEFORE_VIDEO,
		payload: video
	}
}

export function setAfterVideo(video) {
	return {
		type: SET_AFTER_VIDEO,
		payload: video
	}
}

