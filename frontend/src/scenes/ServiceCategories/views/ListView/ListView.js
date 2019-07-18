import React, { useEffect, useState } from 'react';
import List from '../../../../components/views/List/List';
import api from '../../api';
import Button from 'react-bootstrap/Button';

import './ListView.scss';

const ListView = props => {
	const columns = [
		{
			dataField: 'id',
			text: 'ID',
			sort: true,
			headerStyle: () => {
				return { width: '8%' };
			}
		}, {
			dataField: 'name',
			text: 'Name',
			sort: true,
			headerStyle: () => {
				return { width: '92%' };
			}
		}
	];

	const [data, setData] = useState([]);

	const rowEvents = {
		onClick: (e, row, rowIndex) => props.history.push(`/service-categories/${row.id}`)
	};

	const addNew = () => {
		props.history.push(`/service-categories/create`);
	}
	
	useEffect(() => {
		(async function fetchData() {
			const response = await api.serviceCategories.listAll();
			setData(response.map(e => ({id: e.id, name: e.name})));
			console.log(response);
		})();
	}, []);

	return (
		<div className='ListView'>
			<h2>SERVICE CATEGORIES</h2>
			<Button type="button" className="button is-block is-info is-fullwidth btn-add" onClick={addNew}>+ Add New</Button>

			<List {...props} data={data} columns={columns} rowEvents={rowEvents} defaultSorted={[{dataField: 'id', order: 'asc'}]} />
		</div>
	);
}

export default ListView;