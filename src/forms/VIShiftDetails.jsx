import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectComponent from '../components/SelectComponent';

const VIShiftDetails = () => {
    const [date, setDate] = useState('');
    const [shift, setShift] = useState('');
    const [mill, setMill] = useState('');
    const [lineNumber, setLineNumber] = useState('');
    const [railGrade, setRailGrade] = useState('');
    const [railSection, setRailSection] = useState('');
    const [railLength, setRailLength] = useState('');
    const [ieName, setIeName] = useState('');
    const [rclIeName, setRclIeName] = useState('');

    const navigate = useNavigate();
    
    const lineNumberOptions = mill === 'URM' ? ['1', '2', '3', '4', '5', '6'] : mill === 'RSM' ? ['1', '2'] : [];
    const railLengthOptions = mill === 'URM' ? ['130'] : mill === 'RSM' ? ['65', '75'] : [];

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate('/visual/home');
    };

  return (
    <div className='flex h-screen max-h-screen'>
        <section className='bg-transparent flex-1 overflow-y-auto px-[5%] my-auto'>
            <div className='mx-auto flex size-full flex-col py-10 max-w-[720px] min-h-screen items-center justify-center'>
                {/* <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200 w-full gap-y-8"> */}
                    <h1 className="text-3xl font-bold">Visual Inspection - Shift Details</h1>

                    <div className="w-full max-w-lg p-8 border border-gray-300 rounded-lg bg-white shadow-lg max-h-screen">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6 sm:flex-row justify-between mb-4">
                                <div className='flex flex-col'>
                                    <label className='font-bold mb-1 text-sm'>Date</label>
                                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className='h-10 w-48 border border-black rounded-xl pl-3 pr-3 bg-slate-100 text-sm' />
                                </div>

                                <SelectComponent
                                    label="Shift"
                                    options={['A', 'B', 'C']}
                                    value={shift}
                                    onChange={(e) => setShift(e.target.value)}
                                />                
                            </div>

                            <div className="flex flex-col gap-6 sm:flex-row justify-between mb-4">
                                <SelectComponent
                                    label="Mill"
                                    options={['URM', 'RSM']}
                                    value={mill}
                                    onChange={(e) => setMill(e.target.value)}
                                />

                                <SelectComponent
                                    label="Line Number"
                                    options={lineNumberOptions}
                                    value={lineNumber}
                                    onChange={(e) => setLineNumber(e.target.value)}
                                />
                            </div>
                            
                            <div className="flex flex-col gap-6 sm:flex-row justify-between mb-4">
                                <SelectComponent
                                    label="Rail Grade"
                                    options={['R260', '350HT', '1080HH', '880', '880NC']}
                                    value={railGrade}
                                    onChange={(e) => setRailGrade(e.target.value)}
                                />

                                <SelectComponent
                                    label="Rail Section"
                                    options={['60E1', 'IRS 52', 'UIC 60', '60E1A1', '136RE']}
                                    value={railSection}
                                    onChange={(e) => setRailSection(e.target.value)}
                                />
                            </div>
                            
                            <div className="flex flex-col gap-6 sm:flex-row justify-between mb-4">
                                <div className='mr-9'>
                                    <SelectComponent
                                        label="Std. Offered Rail Length"
                                        options={railLengthOptions}
                                        value={railLength}
                                        onChange={(e) => setRailLength(e.target.value)}
                                    />
                                </div>
                                

                                <div>
                                    <label className='font-bold mb-1 text-sm'>Add Other IE</label>
                                    <input
                                        type="text"
                                        value={ieName}
                                        onChange={(e) => setIeName(e.target.value)}
                                        list="ie-options"
                                        className='h-10 w-48 border border-black rounded-xl pl-3 pr-3 bg-slate-100 text-sm'
                                    />
                                    <datalist id="ie-options">
                                        <option value="IE Name 1" />
                                        <option value="IE Name 2" />
                                        <option value="IE Name 3" />
                                    </datalist>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-6 sm:flex-row justify-between mb-4">
                                <div className='flex flex-col'>
                                    <label className='font-bold mb-1 text-sm'>Add Name of RCL IE / Rep</label>
                                    <input
                                        type="text"
                                        value={rclIeName}
                                        onChange={(e) => setRclIeName(e.target.value)}
                                        required
                                        className='h-10 w-48 border border-black rounded-xl pl-3 pr-3 bg-slate-100 text-sm'
                                    />
                                </div>
                            </div>

                            <div className='flex justify-center'>
                                <button type="submit" className='bg-red-500 text-sm text-white w-36 h-9 rounded-2xl mt-4'>Start Inspection</button>
                            </div>
                        </form>
                    </div>
            </div>
        </section>
    </div>
  )
}

export default VIShiftDetails