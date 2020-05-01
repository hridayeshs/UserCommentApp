import axios from 'axios';

export const UploadImageService = data => (
	axios.post('http://localhost:5000/api/uploadImage', data)
		.then(res => res)
)

export const GetImagesService = data => (
	axios.get('http://localhost:5000/api/getImages')
		.then(res => res)
)

//export default UploadImageService;

