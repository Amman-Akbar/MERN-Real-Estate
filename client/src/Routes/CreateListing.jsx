import React, { useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../utils/firebase';
const CreateListing = () => {
    const [files, setFiles] = useState([])
    const [formData, setformData] = useState({
        imageUrls: [],
    })
    const [uploading, setUploading] = useState(false)
    const [imageUploadError, setImageUploadError] = useState(null)
    console.log(formData)
    const handleImageUpload = (e) => {
        setUploading(true)
        setImageUploadError(false)
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            const promises = []
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImages(files[i]))
            }
            Promise.all(promises).then((urls) => {
                setformData({
                    ...formData,
                    imageUrls: formData.imageUrls.concat(urls)
                })
                setImageUploadError(false)
                setUploading(false)
            }).catch((err) => {
                setImageUploadError("Image Upload Failed (2mb max per image)")
                setUploading(false)
            })
        } else {
            setImageUploadError("You can only upload a maximum of 6 images")
            setUploading(false)
        }
    }
    const storeImages = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    })
                }
            )
        })
    }
    const handleDeleteImage = (index) => {
        setformData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index)
        })
    }
    return (
        <main className='max-w-4xl mx-auto'>
            <h1 className='text-4xl font-bold text-center my-7'>Create a listing</h1>
            <form className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col flex-1 gap-4'>
                    <input type='text' placeholder='Title' className='border p-3 rounded-lg' id='title' maxLength='62' minLength='10' required />
                    <textarea type='text' placeholder='Description' className='border p-3 rounded-lg' id='description' required />
                    <input type='text' placeholder='Address' className='border p-3 rounded-lg' id='address' maxLength='62' minLength='10' required />
                    <div className="flex flex-wrap gap-5">
                        <div className='flex gap-2'>
                            <input type='checkbox' id='sale' className='w-5' />
                            <label htmlFor='sale'>Sell</label>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='rent' className='w-5' />
                            <label htmlFor='rent'>Rent</label>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='parking' className='w-5' />
                            <label htmlFor='parking'>Parking</label>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='furnished' className='w-5' />
                            <label htmlFor='furnished'>Furnished</label>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='offer' className='w-5' />
                            <label htmlFor='offer'>Offer</label>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-5">
                        <div className="flex items-center gap-2">
                            <input type="number" id="bedrooms" className="w-16 border p-2 rounded-lg" />
                            <label htmlFor="bedrooms">Bedrooms</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="number" id="bathrooms" className="w-16 border p-2 rounded-lg" />
                            <label htmlFor="bathrooms">Bathrooms</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="number" id="regularPrice" className="w-16 border p-2 rounded-lg" />
                            <div className='flex flex-col'>
                                <label htmlFor="regularPrice">Regular Price</label>
                                <span className='text-xs'>($ / month)</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="number" id="discountedPrice" className="w-16 border p-2 rounded-lg" />
                            <div className='flex flex-col'>
                                <label htmlFor="discountedPrice">Discounted Price</label>
                                <span className='text-xs'>($ / month)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>Images :
                        <span className='text-slate-500 font-normal'> The first image will be the cover (max 6)</span></p>
                    <div className="flex gap-4">
                        <input onChange={(e) => setFiles(e.target.files)} type="file" className='p-3 border border-gray-300 rounded w-full' id='image' multiple accept='image/*' />
                        <button
                            type='button'
                            onClick={handleImageUpload}
                            disabled={uploading}
                            className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
                        >
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                    <p className='text-red-500'>{imageUploadError && imageUploadError}</p>
                    {
                        formData.imageUrls.length > 0 && formData.imageUrls.map((url,index) => (
                            <div className='flex justify-between'>
                                <img key={index} className='w-20 h-20 object-cover rounded-lg' src={url} alt="image" />
                                <button onClick={() => handleDeleteImage(index)} type='button' className='uppercase text-red-700 py-4  rounded-full hover:opacity-80'>Delete</button>
                            </div>
                        ))
                    }

                    <button className='bg-slate-700 uppercase text-white py-4 text-xl rounded-full hover:opacity-80'>Create Listing</button>
                </div>
            </form>
        </main>
    )
}

export default CreateListing