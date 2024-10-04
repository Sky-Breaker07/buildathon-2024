import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { storage } from './firebase';
import {
	ref as storeRef,
	deleteObject,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';

export function useFirebase() {
	const toast = useToast();
	const uploadProgress = ref(null);
	const imageUrl = ref(null);
	const isUploading = ref(false);
	const isDeleting = ref(false);

	const uploadImage = async (file, folder) => {
		if (!file) {
			toast.error('No file selected');
			return null;
		}

		if (file.size > 5 * 1024 * 1024) {
			toast.error('File size exceeds 5MB limit');
			return null;
		}

		isUploading.value = true;
		uploadProgress.value = 0;
		const fileName = `${Date.now()}_${file.name}`;
		const storageRef = storeRef(storage, `${folder}/${fileName}`);

		return new Promise((resolve, reject) => {
			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					uploadProgress.value =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				},
				(error) => {
					console.error('Upload error:', error);
					toast.error('Upload failed. Please try again.');
					isUploading.value = false;
					reject(error);
				},
				async () => {
					try {
						const downloadURL = await getDownloadURL(
							uploadTask.snapshot.ref
						);
						imageUrl.value = downloadURL;
						isUploading.value = false;
						toast.success('Image uploaded successfully');
						downloadURL;
						resolve(downloadURL);
					} catch (error) {
						console.error('Error getting download URL:', error);
						toast.error(
							'Failed to get image URL. Please try again.'
						);
						isUploading.value = false;
						reject(error);
					}
				}
			);
		});
	};

	const deleteImage = async (url) => {
		if (!url) {
			toast.error('No image URL provided');
			return false;
		}

		isDeleting.value = true;

		try {
			const storageRef = storeRef(storage, url);
			await deleteObject(storageRef);
			imageUrl.value = null;
			toast.success('Image deleted successfully');
			isDeleting.value = false;
			return true;
		} catch (error) {
			console.error('Delete error:', error);
			toast.error('Failed to delete image. Please try again.');
			isDeleting.value = false;
			return false;
		}
	};

	const getImageUrl = () => imageUrl.value;

	return {
		uploadProgress,
		imageUrl,
		isUploading,
		isDeleting,
		uploadImage,
		deleteImage,
		getImageUrl,
	};
}
