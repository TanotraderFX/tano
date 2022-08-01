import React from 'react'
import { CURRENCIES } from '../constants'
import { Select } from 'antd';
const { Option } = Select;

const CurrencySelect = ({ setCurrency, currenciesInfo }) => {

	const onSelect = (selected) => {
		const foundCurrency = currenciesInfo.find((current) => {
			return current.name.includes(selected);
		});
		setCurrency(foundCurrency);
	}

	return (
		<Select
			placeholder="Select a currency"
			style={{ width: 200, marginBottom: '10px' }}
			onChange={onSelect}
			className='currency-select'
		>
			{CURRENCIES.map((data, index) => {
				return (
					<Option key={index} value={data.name}>{data.display}</Option>
				);
			})}
		</Select>

	)
}

export default CurrencySelect
