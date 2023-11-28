import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../utils/firebase';


const Profile = () => {
  const { currentUser } = useSelector(state => state.user)
  const fileRef = useRef(null)
  const [file, setFile] = useState(null)
  const [filePerc, setFilePerc] = useState(0)
  const [uploadFileError, setUploadFileError] = useState(null)
  const [formData, setformData] = useState({})
  console.log(filePerc)
  useEffect(() => {
    if (file) {
      uploadFileHandler(file);
    }
  }, [file]);

  const uploadFileHandler = (file) => {
    // Reset uploadFileError when starting a new upload
    setUploadFileError(null);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Reset filePerc when starting a new upload
    setFilePerc(0);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc((prevFilePerc) => Math.round(progress)); // Use functional update
      },
      (error) => {
        setUploadFileError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setformData({ ...formData, Avatar: downloadURL });
          })
          .catch((downloadError) => {
            setUploadFileError(downloadError);
          });
      }
    );
  };

  return (
    <div className='p-5 max-w-xl mx-auto'>
      <h1 className='text-4xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-5'>
        <input type="file" onChange={e => setFile(e.target.files[0])} accept="image/*" ref={fileRef} hidden />
        <img onClick={() => fileRef.current.click()} className='rounded-full h-32 w-32 object-cover self-center' src={formData.Avatar || currentUser.Avatar} alt="profile" />
        {uploadFileError ? (
          <p className='text-red-500 text-center text-lg'>Error Image Uploading(Max image size is 2MB)</p>
        ) : filePerc > 0 && filePerc < 100 ? (
          <p className='text-slate-500 text-center text-lg'>{filePerc}%</p>
        ) : filePerc === 100 ? (
          <p className='text-green-500 text-center text-lg'>Image Uploaded Successfully</p>
        ) : (
          ''
        )}

        <input className='p-3 border rounded-lg' type="text" name="Username" id="Username" placeholder='Username' />
        <input className='p-3 border rounded-lg' type="email" name="Email" id="Email" placeholder='Email' />
        <input className='p-3 border rounded-lg' type="password" name="Password" id="Password" placeholder='Password' />
        <button className='bg-slate-700 uppercase text-white m-5 py-4 text-xl rounded-full hover:opacity-80'>UPDATE</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-500 cursor-pointer'>Delete Account</span>
        <span className='text-red-500 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile