import React, { useEffect, useState } from 'react'
import FormDropdownItem from '../../../components/FormDropdownItem'

const instrumentMapping = {
  'Measuring Instrument': ['Vernier', 'Micrometer', 'Feeler Gauge', 'Weighing Scale', 'Measuring Tape', 'Measuring Scale'],
  'Testing Machines': ['Hydris', 'Leco / Gas Analyser', 'Spectro', 'Tensile Testing Machine', 'Hardness', 'TLT Machine', 'FWT System', 'FBW M/C'],
  'Gauge (Working)': [ "Head & Web Gauge", "Height Gauge", "Fish Gauge", "Foot Gauge", "Asymmetry +", "Asymmetry -", "Toe Thk +", "Toe Thk -", "Crown (F)", "Crown (M)", "Foot Concavity", "Hole - Base", "Hole - End", "Right Angle", "FWT Bearer Head", "FWT Striker Head" ],
  'Gauge (Master)': [],
  'Straight Edge': ["3m","2m","1.5m","1m","0.85m","100mm"],
  'Templates': ['FWT Bearer Head', 'FWT Striker Head']
}

const Home = () => {
  const [instrumentCategoryList, setInstrumentCategoryList] = useState([])
  const [instrumentList, setInstrumentList] = useState([])

  const [formData, setFormData] = useState({
    instrumentCategory: null,
    instrument: null, 
    calibrationValidity: null,
    section: null
  })

  const populateData = () => {
    const instrumentCategoryList = Object.keys(instrumentMapping).map(inst => {
      return {
        key: inst,
        value: inst
      }
    })
    setInstrumentCategoryList([...instrumentCategoryList])
  }

  const handleChange = (fieldName, value) => {
    setFormData(prev=>{
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }

  useEffect(()=> {
    populateData()
  }, [])

  useEffect(()=>{
    if(instrumentMapping[formData.instrumentCategory]){
      const instrumentList = instrumentMapping[formData.instrumentCategory].map(inst => {
        return {
          key: inst,
          value: inst
        }
      })
      setInstrumentList([...instrumentList])
    }
  }, [formData.instrumentCategory, instrumentCategoryList])

  return (
    <div>
      <FormDropdownItem label='Instrument Category' name='instrumentCategory' dropdownArray={instrumentCategoryList} valueField={'key'} visibleField={'value'} onChange={handleChange} />
      <FormDropdownItem label ='Instrument' name='instrument' dropdownArray={instrumentList} valueField={'key'} visibleField={'value'} onChange = {handleChange}/>
    </div>
  )
}

export default Home
