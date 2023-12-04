import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../utils/firebase';
import {updatestart, updatefailure, updatesuccess, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutUserStart, signOutUserSuccess, signOutUserFailure} from '../redux/slice/user.slice'
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'


const Profile = () => {
  const { currentUser,loading, error } = useSelector(state => state.user)
  const fileRef = useRef(null)
  const [file, setFile] = useState(null)
  const [filePerc, setFilePerc] = useState(0)
  const [uploadFileError, setUploadFileError] = useState(null)
  const [formData, setformData] = useState({})
  const [success,setSucess] = useState(null)
  const dispatch = useDispatch()
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
        setFilePerc(Math.round(progress)); // Use functional update
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
  const handleChange = e => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  const submithandler = async(e) => {
    e.preventDefault()
    try {
      dispatch(updatestart())
      const res =await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(updatefailure(data.message))
        return
      }

      dispatch(updatesuccess(data))
      setSucess(true);
    } catch (error) {
      dispatch(updatefailure(error.message))
    }
  }

  const handleDeleteUser=async()=>{
    try {
      dispatch(deleteUserStart())
      const res =await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE"
      })
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut=async()=>{
    try {
      dispatch(signOutUserStart())
      const res=await fetch('/api/auth/signout')
      const data=await res.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
      }
      dispatch(signOutUserSuccess())
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  return (
    <div className='p-5 max-w-xl mx-auto'>
      <h1 className='text-4xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-5' onSubmit={submithandler}>
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

        <input onChange={handleChange} className='p-3 border rounded-lg' type="text" name="Username" id="Username" placeholder='Username' defaultValue={currentUser.Username} />
        <input onChange={handleChange} className='p-3 border rounded-lg' type="email" name="Email" id="Email" placeholder='Email' defaultValue={currentUser.Email} />
        <input onChange={handleChange} className='p-3 border rounded-lg' type="password" name="Password" id="Password" placeholder='Password' />
        <button disabled={loading} className='bg-slate-700 uppercase text-white py-4 text-xl rounded-full hover:opacity-80'>{loading ? 'Loading ...' : 'Update Profile'}</button>
        <Link to="/create-listing">
          <button className='bg-blue-700 uppercase text-white py-4 text-xl rounded-full hover:opacity-80 w-full'>Create Listing</button>
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-500 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-500 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-500'>{error ? error : ''}</p>
      <p className='text-green-500'>{success ? 'Profile Updated Successfully' : ''}</p>
    </div>
  )
}

export default Profile