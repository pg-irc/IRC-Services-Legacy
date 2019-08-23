import React, { useEffect, useState } from 'react';
import api from '../../api';
import List from '../../../../components/views/List/List';
import settings from '../../../../shared/settings';

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
				return { width: '50%' };
			}
		}, {
			dataField: 'parent',
			text: 'Parent',
			sort: true,
			headerStyle: () => {
				return { width: '42%' };
			}
		}
	];

	const t = props.t;

	const [data, setData] = useState([]);

	const rowEvents = {
		onClick: (e, row, rowIndex) => props.history.push(`/regions/${row.id}`)
	};

	const addNew = () => {
		props.history.push(`/regions/create`);
	}

	useEffect(() => {
		(async function fetchData() {
			const response = await api.regions.listAll();
			setData(response.map(e => ({id: e.id, name: e.name, parent: e.parent ? e.parent : '-'})));
			settings.logger.requests && console.log(response);
		})();
	}, []);

	return (
		<div className='ListView'>
			<h2>{t('list.title')}</h2>
			<List {...props} data={data} columns={columns} rowEvents={rowEvents} create={addNew} defaultSorted={[{ dataField: 'id', order: 'asc' }]} />
		</div>
	);
}

export default ListView;