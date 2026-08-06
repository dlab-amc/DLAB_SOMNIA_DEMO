import React, { useState } from 'react';
import { inputParams, outputParams } from '../../assets/data/params';
import S from './ParamsTable.style';
import { ReactComponent as Expand } from '../../assets/resource/icons/expand.svg';

const ParamsTable = ({ type }) => {
  // type = 'input' | 'output'

  const [isTableExpanded, setIsTableExpanded] = useState(false);
  const data = type === 'input' ? inputParams : outputParams;
  const visibleRows = isTableExpanded ? data : data.slice(0, 5);

  const handleToggleExpand = () => {
    setIsTableExpanded((prev) => !prev);
  };

  return (
    <S.Table>
      <thead>
        {type === 'input' ? (
          <tr>
            <th className='name'>Parameter Name</th>
            <th className='definition'>Definition</th>
            <th className='type'>Type</th>
            <th className='rate'>
              Resampling Rate <span className='unit'>(Hz)</span>
            </th>
          </tr>
        ) : (
          <tr>
            <th className='name'>Parameter Name</th>
            <th className='definition'>Definition</th>
            <th className='type'>Event Type</th>
          </tr>
        )}
      </thead>
      <tbody>
        {type === 'input'
          ? visibleRows.map((item, index) => (
              <tr key={index}>
                <td className='name'>{item.name}</td>
                <td className='definition'>{item.definition}</td>
                <td className='type'>{item.type}</td>
                <td className='rate'>{item.rate}</td>
              </tr>
            ))
          : visibleRows.map((item, index) => (
              <tr key={index}>
                <td className='name'>{item.name}</td>
                <td className='definition'>{item.definition}</td>
                <td className='type'>{item.type}</td>
              </tr>
            ))}
        <tr className='toggle-row'>
          <td colSpan={type === 'input' ? 4 : 3}>
            {isTableExpanded ? (
              <div className='close' onClick={handleToggleExpand}>
                Close
                <span className='icon close'>
                  <Expand />
                </span>
              </div>
            ) : (
              <div className='open' onClick={handleToggleExpand}>
                View More
                <span className='icon open'>
                  <Expand />
                </span>
              </div>
            )}
          </td>
        </tr>
      </tbody>
    </S.Table>
  );
};

export default ParamsTable;
