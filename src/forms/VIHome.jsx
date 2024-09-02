import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/images/logo.svg'
import search from '../assets/icons/search.svg'
import hamburger from '../assets/icons/hamburger.svg'

import Search from '../components/Search'

import data from '../utils/sampleData.json'

const VIHome = () => {
    const [shiftRemarks, setShiftRemarks] = useState('');
    const [shiftDetails, setShiftDetails] = useState({});

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate('/login');
    };

    const handleClick = (e) => {
        e.preventDefault();

        navigate('/visual/inspection')
    }

    const handleClickSec = (e) => {
        e.preventDefault();
        
        navigate('/visual/shiftSummary')
    }

    const handleClickTer = (e) => {
        e.preventDefault();
        
        navigate('/stage/testSampleMarking/sampleList')
    }

    useEffect(() => {
        // Fetch data from JSON file
        fetch('../utils/shiftDetails.json')
          .then(response => response.json())
          .then(data => setShiftDetails(data))
          .catch(error => console.error('Error fetching shift details:', error));
    }, []);
    

  return (
    <div className='flex h-screen max-h-screen'>
        <section className='bg-transparent flex-1 overflow-y-auto px-[5%] my-auto'>
            <div className='mx-auto flex size-full flex-col py-10 max-w-[720px] min-h-screen items-center justify-center'>
                <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200 w-full gap-y-8">
                    <h1 className="text-3xl font-bold">Visual Inspection - Home</h1>

                    <div className='w-full max-w-lg p-8 border border-gray-300 rounded-lg bg-white shadow-lg'>
                        <div className='flex justify-between items-center'>
                            <img 
                                src={logo}
                                height={58}
                                width={64}
                                alt='RITES-logo'
                            />

                            <div className='flex w-[20%] justify-between'>
                                <img 
                                    src={search}
                                    height={22}
                                    width={22}
                                    alt='search'
                                    className='cursor-pointer'
                                />

                                <img 
                                    src={hamburger}
                                    height={22}
                                    width={22}
                                    alt='hamburger'
                                    className='cursor-pointer'
                                />
                            </div>
                        </div>

                        <div className='mt-8 mb-6'>
                            <Search />
                        </div>

                        <hr />

                        <div className='flex mt-2'>
                            {/* {data.users.map(( list ) => ( */}
                                <div className='flex flex-wrap mb-4'>
                                    <h6 className='font-medium mr-5 mt-2'>Date - <span className='font-light'>{shiftDetails.date}</span></h6>
                                    <h6 className='font-medium mr-5 mt-2'>Shift - <span className='font-light'>{shiftDetails.shift}</span></h6>
                                    <h6 className='font-medium mr-5 mt-2'>Rail Grade - <span className='font-light'>{shiftDetails.railGrade}</span></h6>
                                    <h6 className='font-medium mr-5 mt-2'>Mill - <span className='font-light'>{shiftDetails.mill}</span></h6>
                                    <h6 className='font-medium mr-5 mt-2'>Line - <span className='font-light'>{shiftDetails.line}</span></h6>
                                    <h6 className='font-medium mr-5 mt-2'>Rail Sec. - <span className='font-light'>{shiftDetails.railSec}</span></h6>
                                    <h6 className='font-medium mr-5 mt-2'>Length - <span className='font-light'>{shiftDetails.length}</span></h6>
                                </div>
                        </div>

                        <hr />

                        <div className="mt-6 grid grid-cols-2 gap-4 mb-6">
                            <button onClick={handleClick} className='flex flex-col p-4 bg-slate-900 rounded-3xl rounded-br-sm text-gray-300 shadow-lg'>
                                <div className="w-[1px] h-[1px] bg-gradient-to-br from-green-300 via-yellow-100 to-orange-300 p-6 rounded-2xl rounded-br-sm" />

                                <p className='mt-3 text-gray-300 font-medium'>Visual Inspection</p>
                            </button>

                            <button onClick={handleClickSec} className='flex flex-col p-4 bg-slate-900 rounded-3xl rounded-br-sm text-gray-300 shadow-lg'>
                                <div className="w-[1px] h-[1px] bg-gradient-to-br from-blue-200 via-blue-400 to-blue-500 p-6 rounded-2xl rounded-br-sm" />

                                <p className='mt-3 text-gray-300 text-left font-medium'>Shift Inspection Summary</p>
                            </button>

                            <button onClick={handleClickTer} className='flex flex-col p-4 bg-slate-900 rounded-3xl rounded-br-sm text-gray-300 shadow-lg'>
                                <div className="w-[1px] h-[1px] bg-gradient-to-br from-blue-200 via-blue-400 to-blue-500 p-6 rounded-2xl rounded-br-sm" />

                                <p className='mt-3 text-gray-300 text-left font-medium w-32'>Test Sample Marking</p>
                            </button>
                        </div>

                        <hr />

                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6 mt-4">
                                <div className='flex'>
                                    <input 
                                        type='checkbox'
                                        id='confirmation'
                                        name='ieConfirmation'
                                    />

                                    <label htmlFor='confirmation' className='ml-2'>
                                        Mark right if other IEs Confirmation are done
                                    </label>
                                </div>

                                <div className='flex flex-col'>
                                    <label className='font-bold mb-1 text-sm'>Shift Remarks</label>

                                    <input
                                        type="text"
                                        value={shiftRemarks}
                                        onChange={(e) => setShiftRemarks(e.target.value)}
                                        required
                                        className='h-10 w-48 border border-black rounded-xl pl-3 pr-3 text-sm'
                                    />
                                </div>

                                <div className='flex justify-center'>
                                    <button type="submit" className='bg-red-500 text-sm text-white w-32 h-9 rounded-2xl mt-4'>End Duty</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default VIHome