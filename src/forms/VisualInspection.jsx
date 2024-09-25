import React, { useState, useEffect } from 'react'

import home from '../assets/icons/home.svg'
import summary from '../assets/icons/summary.svg'

import data from '../utils/sampleData.json'
import SelectComponent from '../components/SelectComponent';

import { useNavigate } from 'react-router-dom';
import RejectionDetailsTable from '../components/Table';

const VisualInspection = () => {
  const [date, setDate] = useState('17/08/2024');
  const [shift, setShift] = useState('A');
  const [serialNumber, setSerialNumber] = useState('001');
  const [heatNumber, setHeatNumber] = useState('');
  const [heatPassStatus, setHeatPassStatus] = useState('');
  const [railLength, setRailLength] = useState('');
  // const [utFeedback, setUtFeedback] = useState('');
  const [dimDefect, setDimDefect] = useState('');
  const [visualDefect, setVisualDefect] = useState('');
  const [millsData, setMillsData] = useState([]);
  const [selectedMill, setSelectedMill] = useState('');
  const [railLengths, setRailLengths] = useState([]);
  const [formFieldsAcceptance, setFormFieldsAcceptance] = useState([
    { railLength: '', number: '', railClass: '' },
  ]);
  const [formFieldsDefect, setFormFieldsDefect] = useState([
    { defectCategory: '', defectType: '', location: '', position: '' },
  ]);

  const [shiftRemarks, setShiftRemarks] = useState('');

  const [errors, setErrors] = useState({});

  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const validateSerialNumber = (value) => {
    return /^\d{3}$/.test(value);
  };

  const validateRailLength = (value) => {
    return /^\d+(\.\d+)?$/.test(value);
  };

  const handleClick = (e) => {
    e.preventDefault();

    navigate('/visual/home');
  }

  const handleClickSec = (e) => {
    e.preventDefault();

    navigate('/visual/shiftSummary');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!validateSerialNumber(serialNumber)) {
      newErrors.serialNumber = 'Serial Number must be a three-digit number.';
    }

    if (heatNumber.trim() === '') {
      newErrors.heatNumber = 'Heat Number is required.';
    }

    if (heatPassStatus.trim() === '') {
      newErrors.heatPassStatus = 'Heat Pass Status is required.';
    }

    if (!validateRailLength(railLength)) {
      newErrors.railLength = 'Rail Length must be a decimal number.';
    }

    if (Object.keys(newErrors).length === 0) {
      console.log({
        serialNumber,
        heatNumber,
        heatPassStatus,
        railLength,
      });
    } else {
      setErrors(newErrors);
    }

    navigate('/visual/home');
  }

  useEffect(() => {
    fetch('/mills.json')
      .then((response) => response.json())
      .then((data) => {
        setMillsData(data);
      })
      .catch((error) => console.error('Error fetching mills data:', error));
  }, []);

  useEffect(() => {
    const mill = millsData.find((m) => m.mill === selectedMill);
    if (mill) {
      setRailLengths(mill.railLengths);
    }
  }, [selectedMill, millsData]);

  const handleAddAcceptanceFields = () => {
    setFormFieldsAcceptance([...formFieldsAcceptance, { railLength: '', number: '', railClass: '' }]);
  };

  const handleAddDefectFields = () => {
    setFormFieldsDefect([...formFieldsDefect, { defectCategory: '', defectType: '', location: '', position: '' }]);
  };

  const handleChangeAcceptance = (index, event) => {
    const values = [...formFieldsAcceptance];
    values[index][event.target.name] = event.target.value;
    setFormFieldsAcceptance(values);
  };

  const handleChangeDefect = (index, event) => {
    const values = [...formFieldsDefect];
    values[index][event.target.name] = event.target.value;
    setFormFieldsDefect(values);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className='flex h-screen max-h-screen !bg-white'>
      <section className='bg-transparent flex-1 overflow-y-auto px-[5%] my-auto'>
          <div className='mx-auto flex size-full flex-col py-10 max-w-[720px] min-h-screen items-center justify-center'>
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200 w-full gap-y-8">
              <h1 className="text-3xl font-bold">Visual - Inspection</h1>

              <div className='w-full max-w-lg p-8 border border-gray-300 rounded-lg bg-white shadow-lg'>
                <div className='flex justify-between items-center mb-4'>
                  <button className='flex gap-2 sm:flex-row cursor-pointer items-center' onClick={handleClick}>
                    <img 
                        src={home}
                        height={24}
                        width={24}
                        alt='home'
                    />

                    <p className='font-semibold mt-1'>Home</p>
                  </button>

                  <button className='flex gap-2 sm:flex-row cursor-pointer items-center' onClick={handleClickSec}>
                    <img 
                        src={summary}
                        height={24}
                        width={24}
                        alt='summary'
                    />

                    <p className='font-semibold mt-1'>Summary</p>
                  </button>
                </div>

                <hr />

                <div className='flex mt-2'>
                  {data.users.map(( list ) => (
                      <div className='flex flex-wrap mb-4'>
                          <h6 className='font-medium mr-5 mt-2'>Date - <span className='font-light'>{list.date}</span></h6>
                          <h6 className='font-medium mr-5 mt-2'>Shift - <span className='font-light'>{list.shift}</span></h6>
                          <h6 className='font-medium mr-5 mt-2'>Rail Grade - <span className='font-light'>{list.railGrade}</span></h6>
                          <h6 className='font-medium mr-5 mt-2'>Mill - <span className='font-light'>{list.mill}</span></h6>
                          <h6 className='font-medium mr-5 mt-2'>Line - <span className='font-light'>{list.line}</span></h6>
                          <h6 className='font-medium mr-5 mt-2'>Rail Sec. - <span className='font-light'>{list.railSec}</span></h6>
                          <h6 className='font-medium mr-5 mt-2'>Length - <span className='font-light'>{list.length}</span></h6>
                      </div>
                  ))}
                </div>

                <hr />
                
                <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                  <div className="flex flex-col gap-6 mt-2">
                      <h6 className='font-semibold'>Rail ID - U110324B034</h6> 

                      <div className='flex justify-between'>
                        <div className='flex flex-col'>
                          <label className='font-bold mb-1 text-sm'>Date</label>

                          {data.users.map(( list ) => (
                                <input type="text" value={list.date} onChange={(e) => setDate(e.target.value)} required className='h-10 w-32 border border-black rounded-xl pl-3 pr-3 bg-slate-100 text-sm' />
                          ))
                          }
                        </div>

                        <div className='flex flex-col'>
                          <label className='font-bold mb-1 text-sm'>Shift</label>

                          {data.users.map(( list ) => (
                                <input type="text" value={list.shift} onChange={(e) => setShift(e.target.value)} required className='h-10 w-32 border border-black rounded-xl pl-3 pr-3 bg-slate-100 text-sm' />
                          ))
                          }
                        </div>

                        <div className='flex flex-col'>
                          <label className='font-bold mb-1 text-sm'>S. No.</label>

                          <input type="text" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} required className='h-10 w-32 border border-black rounded-xl pl-3 pr-3 bg-slate-100 text-sm' maxLength='3' minLength='3' />

                          {errors.serialNumber && <p style={{ color: 'red' }}>{errors.serialNumber}</p>}
                        </div>
                      </div>

                      <div className='flex justify-evenly'>
                        <div className='flex flex-col'>
                          <label className='font-bold mb-1 text-sm'>Heat Number</label>

                          <input
                            type="text"
                            value={heatNumber}
                            onChange={(e) => setHeatNumber(e.target.value)}
                            required
                            className='h-10 w-40 border border-black rounded-xl pl-3 pr-3 bg-slate-100 text-sm'
                          />

                          {errors.heatNumber && <p style={{ color: 'red' }}>{errors.heatNumber}</p>}
                        </div>

                        <div className='flex flex-col'>
                          <label className='font-bold mb-1 text-sm'>Heat Pass Status</label>
                          
                          <input
                            type="text"
                            value={heatPassStatus}
                            onChange={(e) => setHeatPassStatus(e.target.value)}
                            required
                            className='h-10 w-40 border border-black rounded-xl pl-3 pr-3 bg-slate-100 text-sm'
                          />

                          {errors.heatPassStatus && <p style={{ color: 'red' }}>{errors.heatPassStatus}</p>}
                        </div>
                      </div>

                      <div className='flex items-center justify-center'>
                        <label className='font-bold mb-1 text-sm w-40'>Actual Offered Rail Length (m)</label>

                        <input
                            type="text"
                            value={railLength}
                            onChange={(e) => setRailLength(e.target.value)}
                            required
                            className='h-10 w-40 border border-black rounded-xl pl-3 pr-3 bg-slate-100 text-sm'
                        />

                        {errors.railLength && <p style={{ color: 'red' }}>{errors.railLength}</p>}
                      </div>
                  </div>

                  <hr />

                  <div className='flex flex-col'>
                    <h6 className='font-semibold mb-4'>Feed back from AI System for Dim. & Visual</h6>

                    {/* <div className='flex items-center justify-start'>
                      <label className='font-bold mb-1 text-sm mr-3'>UT</label>

                      <textarea 
                          value={utFeedback}
                          onChange={(e) => setUtFeedback(e.target.value)}
                          rows="3"
                          cols="15"
                          className='border border-black rounded-md'
                      />
                    </div> */}

                    <div className='flex justify-evenly'>
                      <div className='flex flex-col'>
                        <label className='font-bold mb-1 text-sm'>Dim</label>

                        <input 
                            type="text"
                            value={dimDefect}
                            onChange={(e) => setDimDefect(e.target.value)}
                            required
                            className='h-10 w-40 border border-black rounded-xl pl-3 pr-3 bg-slate-100 text-sm'
                        />
                      </div>

                      <div className='flex flex-col'>
                        <label className='font-bold mb-1 text-sm'>Visual</label>

                        <input 
                            type="text"
                            value={visualDefect}
                            onChange={(e) => setVisualDefect(e.target.value)}
                            required
                            className='h-10 w-40 border border-black rounded-xl pl-3 pr-3 bg-slate-100 text-sm'
                        />
                      </div>
                    </div>

                    <div className='flex justify-evenly'>
                      <a href='#' className='text-blue-500 mt-6 underline'>Hyperlink to AI Photo</a>
                      <a href='#' className='text-blue-500 mt-6 underline'>Hyperlink to NDT Report</a>
                    </div>
                  </div>

                  <hr />

                  <div className='flex'>
                    <input 
                        type='checkbox'
                        id='gauging'
                        name='gauging'
                    />

                    <label htmlFor='gauging' className='ml-2'>
                      Gauging & End Straightness Checked at both the ends
                    </label>
                  </div>

                  <hr />

                  <div className='flex flex-col'>
                    <h6 className='font-semibold mb-4 underline'>Add Acceptance Data</h6>

                    <form>
                      {formFieldsAcceptance.map((field, index) => (
                        <div key={index} className='flex justify-evenly mb-2'>
                            <select
                              name="railLength"
                              value={field.railLength}
                              onChange={(e) => handleChangeAcceptance(index, e)}
                              className='h-10 w-40 border border-black rounded-xl pl-2 bg-slate-100 text-sm'
                              required
                            >
                              <option value="" disabled>Select rail length</option>
                              {railLengths.map((length) => (
                                <option key={length} value={length}>
                                  {length}
                                </option>
                              ))}
                            </select>

                            <input
                              type="number"
                              name="number"
                              value={field.number}
                              onChange={(e) => handleChangeAcceptance(index, e)}
                              placeholder="No."
                              className='h-10 w-20 border border-black rounded-xl pl-3 bg-slate-100 text-sm'
                              required
                            />

                            <select
                              name="railClass"
                              value={field.railClass}
                              onChange={(e) => handleChangeAcceptance(index, e)}
                              className='h-10 w-40 border border-black rounded-xl pl-3 bg-slate-100 text-sm'
                              required
                            >
                              <option value="" disabled>Select rail class</option>
                              <option value="A">A</option>
                              <option value="B">A + 0.1</option>
                            </select>
                        </div>
                      ))}

                      <button type="button" onClick={handleAddAcceptanceFields} className='mt-2'>
                        <span className='text-blue-500'>&#8853;</span> Add More Acceptance Data
                      </button>
                    </form>
                  </div>

                  <hr />

                  <div className='flex flex-col'>
                    <h6 className='font-semibold mb-4 underline'>Add Defect Data</h6>

                    <form>
                      {formFieldsDefect.map((field, index) => (
                        <div key={index} className='flex justify-start mb-2 flex-wrap'>
                            <select
                              name="defectCategory"
                              value={field.defectCategory}
                              onChange={(e) => handleChangeDefect(index, e)}
                              className='h-10 w-40 border border-black rounded-xl pl-3 bg-slate-100 text-sm mr-2 mb-2'
                              required
                            >
                              <option value="" disabled>Select defect category</option>
                              <option value="Dimension">Dimension</option>
                              <option value="Surface">Surface</option>
                              <option value="Straightness">Straightness</option>
                              <option value="Others">Others</option>
                            </select>

                            <select
                              name="defectType"
                              value={field.defectType}
                              onChange={(e) => handleChangeDefect(index, e)}
                              className='h-10 w-40 border border-black rounded-xl pl-3 bg-slate-100 text-sm'
                              required
                            >
                              <option value="" disabled>Select defect type</option>
                              <option value="Defect Type 1">Defect Type 1</option>
                              <option value="Defect Type 2">Defect Type 2</option>
                              <option value="Defect Type 3">Defect Type 3</option>
                              <option value="Defect Type 4">Defect Type 4</option>
                            </select>

                            <input
                                type="location"
                                value={field.location}
                                onChange={(e) => handleChangeDefect(e.target.value)}
                                placeholder='Location'
                                required
                                className='h-10 w-40 border border-black rounded-xl pl-3 pr-3 bg-slate-100 text-sm mr-2'
                            />

                            <select
                              name="position"
                              value={field.position}
                              onChange={(e) => handleChangeDefect(index, e)}
                              className='h-10 w-40 border border-black rounded-xl pl-3 bg-slate-100 text-sm'
                              required
                            >
                              <option value="" disabled>Select position</option>
                              <option value="Head">Head</option>
                              <option value="Foot">Foot</option>
                              <option value="WBS">WBS</option>
                              <option value="WNBS">WNBS</option>
                            </select>
                        </div>
                      ))}

                      <button type="button" onClick={handleAddDefectFields} className='mt-2'>
                        <span className='text-blue-500'>&#8853;</span> Add More Defect Data
                      </button>
                    </form>
                  </div>

                  <hr />

                  <div className='flex flex-col'>
                    <h6 className='font-semibold mb-4 underline'>Rejection Details <span className='ml-14 text-sm'>min (std. off len , off. len) - acp. len.</span></h6>

                    <RejectionDetailsTable />
                  </div>

                  <hr />

                  <div className='flex flex-col'>
                    <h6 className='font-semibold mb-4 underline'>Remarks</h6>

                    <div className='flex justify-between items-center w-[85%]'>
                      <div>
                        <input
                          type="text"
                          value={shiftRemarks}
                          onChange={(e) => setShiftRemarks(e.target.value)}
                          placeholder='Shift Remarks'
                          required
                          className='h-10 w-32 border border-black rounded-xl pl-3 pr-3 text-sm'
                        />
                      </div>
                      
                      <div className='w-44'>
                        <input
                          type="file"
                          onChange={handleFileChange}
                          id="file-upload"
                        />
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-center'>
                    <button type="submit" className='bg-red-500 text-sm text-white w-44 h-9 rounded-2xl mt-4'>Save Inspection Data</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </section>
    </div>
    
  )
}

export default VisualInspection