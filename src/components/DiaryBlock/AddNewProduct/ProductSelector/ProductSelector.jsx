import React from 'react';
import chroma from 'chroma-js';
import AsyncSelect from 'react-select/async';
import { useWindowSize } from 'react-use';
import PropTypes from 'prop-types';

import { fetchAllProducts } from '../../../../utils/requests';

// Стили для react-selector
const colourStyles = () => {
  const { width, height } = useWindowSize();
  const isLandscape = width > height;
  return {
    container: styles => ({
      ...styles,
      margin: width < 768 && !isLandscape ? '0 0 2px' : '0 0 7px',
      width: width < 768 && !isLandscape ? '100%' : '260px',
      ':focus': {
        outline: 'none'
      }
    }),
    control: styles => ({
      ...styles,
      border: 'none',
      boxShadow: 'none'
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = data.color ? chroma(data.color) : '#800';
      return {
        ...styles,
        backgroundColor: isDisabled ? null : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css())
        }
      };
    },
    Input: styles => ({
      ...styles,
      margin: '0',
      fontFamily: 'Verdana',
      lineHeight: 1.2,
      fontSize: width < 768 && !isLandscape ? '13px' : '15px',
      padding: '0 0 0 5px',
      color: 'var(--text-color-black)'
    }),
    placeholder: styles => ({
      ...styles,
      padding: width < 768 && !isLandscape ? '0 0 0 5px' : '0',
      fontSize: width < 768 && !isLandscape ? '13px' : '15px',
      fontFamily: 'Verdana',
      lineHeight: 1.2,
      color: 'var(--text-color-grey)',
      margin: '0',
      fontWeight: 700
    }),
    valueContainer: styles => ({ ...styles, padding: '0' }),
    singleValue: styles => ({
      ...styles,
      padding: width < 768 && !isLandscape ? '0 0 0 5px' : '0',
      fontSize: width < 768 && !isLandscape ? '13px' : '15px',
      fontFamily: 'Verdana',
      lineHeight: 1.2,
      color: 'var(--text-color-black)',
      margin: '0',
      fontWeight: 700
    })
  };
};

const SelectWrapper = ({ handlerInputWeight, handlerProductSelect, productLabel }) => {
  const token = localStorage.getItem('userToken');

  const fetchProducts = async input => {
    try {
      const productsOptions = await fetchAllProducts(token, input);
      return productsOptions;
    } catch (err) {
      return console.error(err);
    }
  };

  const PromiseOptions = async input => {
    const productsFromDB = await fetchProducts(input);
    return productsFromDB;
  };

  // Это то что я пытался всунуть в value и очищать его при добавлении продукта,
  // но так value не меняется если выбрать товар из списка. А значит я не прав(
  console.log({ productLabel }); // консолька просто что б не ругался еслинт на неиспользуемую переменную)

  return (
    <AsyncSelect
      placeholder="Введите название продукта"
      onChange={e => {
        handlerProductSelect(e);
        handlerInputWeight(100);
      }}
      cacheOptions
      // value={productLabel}
      defaultOptions
      timeFormat
      label="Single select"
      loadOptions={PromiseOptions}
      styles={colourStyles()}
      noOptionsMessage={() => 'Ничего не найдено'}
      components={{ IndicatorsContainer: () => null }}
    />
  );
};

SelectWrapper.propTypes = {
  handlerInputWeight: PropTypes.func.isRequired,
  handlerProductSelect: PropTypes.func.isRequired,
  productLabel: PropTypes.string.isRequired
};

export default SelectWrapper;
