import { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../firebase";
import styles from "../styles/Form.module.css";

const FileInput = ({ name, label, value, type, handleInputState, ...rest }) => {
	
	const inputRef = useRef();
	const [progress, setProgress] = useState(0);
	const [progressShow, setProgressShow] = useState(false);

	const handleUpload = () => {
		setProgressShow(true);
		const fileName = new Date().getTime() + value.name;
		const storageRef = ref(
			storage,
			`/avatars/${fileName}`
		);
		const uploadTask = uploadBytesResumable(storageRef, value);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const uploaded = Math.floor(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(uploaded);
			},
			(error) => {
				console.log(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					handleInputState(name, url);
				});
			}
		);
	};

	return (
		<div className={`w-80 w-50-md py-2 py-md-0 px-2 d-flex flex-column flex-sm-row justify-content-between align-items-center ${styles.container}`}>
			<input
				type="file"
				ref={inputRef}
				onChange={(e) => handleInputState(name, e.currentTarget.files[0])}
				className={styles.input}
				{...rest}
			/>
			<button
				type="button"
				onClick={() => inputRef.current.click()}
				className={styles.chooseBtn}
			>
				{label}
			</button>
			{type === "image" && value && (
				<img
					src={typeof value === "string" ? value : URL.createObjectURL(value)}
					alt="file"
					className={styles.preview_img}
				/>
			)}
			
			{value !== null && !progressShow && typeof value !== "string" && (
				<button onClick={handleUpload} className={`btn btn-primary`}>
					Upload
				</button>
			)}
			{progressShow && progress < 100 && (
				<div className={styles.progress_container}>
					<p>{progress}%</p>
				</div>
			)}
			{progress === 100 && (
				<div className={styles.progress_container}>
					
				</div>
			)}
		</div>
	);
};

export default FileInput