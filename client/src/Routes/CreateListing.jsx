import React from 'react'

const CreateListing = () => {
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
                        <input type="file" className='p-3 border border-gray-300 rounded w-full' id='image' multiple accept='image/*' />
                        <button
                            type='button'
                            className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
                        >
                           Upload
                        </button>
                    </div>
                    <button className='bg-slate-700 uppercase text-white py-4 text-xl rounded-full hover:opacity-80'>Create Listing</button>
                </div>
            </form>
        </main>
    )
}

export default CreateListing