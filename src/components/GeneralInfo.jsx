import React from 'react'

import _ from 'lodash';

const capitalizeCamelCase = (str) => {
  // Convert the camelCase string into an array of words
  const words = _.words(_.camelCase(str));
  
  // Capitalize each word
  const capitalizedWords = words.map(word => _.capitalize(word));
  
  // Join the words with a space
  return capitalizedWords.join(' ');
}



const GeneralInfo = ({data, children}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-8 border p-1 border-gray-500 rounded-sm relative">
        {
            Object.keys(data).map(key => {
                return (
                    <h3 key={key}>{capitalizeCamelCase(key)}: {data[key]}</h3>
                )
            })
        }

        {children}
    </div>
  )
}

export default GeneralInfo
