import React, { useEffect, useState } from 'react';
import { useFilters, useSortBy, useTable } from 'react-table';
import '../../styles/table.css';

export default function Table({ columns, data }) {

    const {
		getTableProps,
		getTableBodyProps,
		headerGroups, 
		rows, 
		prepareRow,
		setFilter
	} = useTable(
		{
			columns,
			data
		},
		useFilters,
		useSortBy
	);

	const [filterInput, setFilterInput] = useState('');
	const [madeDadelinePercent, setMadeDadelinePercent] = useState();
	const [scoreAvg, setScoreAvg] = useState();

	const handleFilterChange = e => {
		const value = e.target.value || undefined;
		setFilter('name', value); 
		setFilterInput(value);
	};

	useEffect(() => {
		if (rows.length > 0) {
			const sumScore = rows.reduce((accumulator, object) => {
				return accumulator + object.original.score;
			}, 0);
			setScoreAvg(sumScore / rows.length);
			setMadeDadelinePercent((rows.filter(x => x.original.madeDadeline).length / rows.length) * 100);
		}
	}, [filterInput]);

	useEffect(() => {
		if (data.length > 0) {
			const sumScore = data.reduce((accumulator, object) => {
				return accumulator + object.score;
			}, 0);
			setScoreAvg(sumScore / data.length);
			setMadeDadelinePercent((data.filter(x => x.madeDadeline).length / data.length) * 100);
		}
	}, [data]);


	return (
		<>
			<input className="searchInput" value={filterInput} onChange={handleFilterChange} placeholder={'Search name'} />
			<div>
				<h4>{madeDadelinePercent}% from the projects made Dadeline</h4>
				<h4>{scoreAvg} is the Average of scores</h4>
			</div>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<th
									{...column.getHeaderProps(column.getSortByToggleProps())}
									className={column.isSorted ? (column.isSortedDesc ? 'sort-desc' : 'sort-asc') : ''}
								>
									{column.render('Header')}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map(cell => {
									return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}
