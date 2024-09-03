import React, { useState } from 'react'

import data from '../utils/sampleData.json'
import filter from '../assets/icons/filter.svg'
import home from '../assets/icons/home.svg'

import { useNavigate } from 'react-router-dom';

import CustomSelect from '../components/SelectComponent'

import MultiSelectHeader from '../components/MultiSelectHeader';
import IRSTable from '../components/IRSTable'

const VIInspectedRailwiseSummary = () => {
  const [lineNumber, setLineNumber] = useState('');

  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    
    switch (selectedValue) {
      case 'acceptance-summary':
        navigate('/acceptance-summary');
        break;
      case 'defect-analysis-summary':
        navigate('/defect-analysis-summary');
        break;
      case 'inspected-railwise-summary':
        navigate('/inspected-railwise-summary');
        break;
      default:
        break;
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    navigate('/visual/home');
  }

  const [selectedAccpA, setSelectedAccpA] = useState([]);
  const [selectedAccpA0_1, setSelectedAccpA0_1] = useState([]);
  const [selectedRejection, setSelectedRejection] = useState([]);

  const optionsAccpA = ['130', '117', '86.67', '65', '52', '26'];
  const optionsAccpA0_1 = ['130', '117', '86.67', '65', '52', '26'];
  const optionsRejection = ['13', '12', '11', '10', 'Comp'];

  const headers = [
    { label: 'S. No.' },
    { label: 'Rail ID' },
    {
      render: () => (
        <div className="mb-4">
            <MultiSelectHeader
              label="Accp. (A)"
              options={optionsAccpA}
              onSelectionChange={setSelectedAccpA}
            />

            <p>Selected Accp. (A): {selectedAccpA.join(', ')}</p>
        </div>
      ),
    },
    {
      render: () => (
        <div className="mb-4">
            <MultiSelectHeader
              label="Accp. (A+0.1)"
              options={optionsAccpA0_1}
              onSelectionChange={setSelectedAccpA0_1}
            />

            <p>Selected Accp. (A+0.1): {selectedAccpA0_1.join(', ')}</p>
        </div>
      ),
    },
    {
      render: () => (
        <div className="mb-4">
          <MultiSelectHeader
            label="Rejection"
            options={optionsRejection}
            onSelectionChange={setSelectedRejection}
          />

          <p>Selected Rejection: {selectedRejection.join(', ')}</p>
        </div>
      ),
    },
  ];

  const input = [
    ['1', 'U240524A013', '117 x 1,\n13 x 1', '', ''],
    ['2', 'U240524A015', '86.67 x 1,\n26 x 1', '', ''],
    ['3', 'U240524A102', '86.67 x 1', '', '13 x 1'],
    ['4', 'U240524A015', '65 x 1', '26 x 1', '13 x 3'],
  ];

  return (
    <div className='flex h-screen max-h-screen'>
      <section className='bg-transparent flex-1 overflow-y-auto px-[5%] my-auto'>
        <div className='mx-auto flex size-full flex-col py-10 max-w-[720px] min-h-screen items-center justify-center'>
          {/* <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200 w-full gap-y-8"> */}
            <h1 className="text-3xl font-bold">Visual Inspection - Shift Summary</h1>

            <div className='w-full max-w-lg p-8 border border-gray-300 rounded-lg bg-white shadow-lg'>
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

              <div className='flex items-center justify-between mb-6'>
                  <div className='flex items-center'>
                    <div className='mt-4 mr-2'>
                      <img
                        src={filter}
                        alt='filter'
                        width={24}
                        height={24}
                      />
                    </div>

                    <div className='mt-4'>
                      <CustomSelect
                        options={['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5', 'Line 6']}
                        value={lineNumber}
                        onChange={(e) => setLineNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className='mt-2'>
                    <button className='flex gap-2 sm:flex-row cursor-pointer items-center' onClick={handleClick}>
                      <img 
                          src={home}
                          height={24}
                          width={24}
                          alt='home'
                      />
                    </button>
                  </div>
              </div>

              <hr />

              <div className='flex items-center justify-center mb-4'>
                <select onChange={handleSelectChange} className='h-10 w-48 border border-black rounded-xl pl-3 bg-slate-100 text-sm justify-center mt-4' value='Inspected Railwise Summary'>
                  <option value="" disabled selected>Select Summary</option>
                  <option value="inspected-railwise-summary">Inspected Railwise Summary</option>
                  <option value="acceptance-summary">Acceptance Summary</option>
                  <option value="defect-analysis-summary">Defect Analysis Summary</option>
                </select>
              </div>

              <hr />

              <div className='flex flex-col items-center justify-between mb-6 mt-2'>
                <h2 className="text-base font-bold mb-4">Rail Wise Data</h2>

                <IRSTable headers={headers} data={input} />
              </div>

              <hr />

              <div className='flex items-center justify-center'>
                <button type="submit" className='bg-yellow-700 text-sm text-white w-20 h-9 rounded-2xl mt-4' onClick={handleClick}>OK</button>
              </div>
            </div>
        </div>
      </section>
    </div>
  )
}

export default VIInspectedRailwiseSummary