import React, { useEffect, useState } from 'react';
import Edit from '../../../../components/views/Edit/Edit';
import api from '../../api';
import './EditView.scss';
import Button from 'react-bootstrap/Button';

const EditView = props => {
	const [data, setData] = useState([]);

	useEffect(() => {
		(async function fetchData() {
			const response = await api.providers.getOne(props.match.params.id);
			setData(response);
		})();
	}, []);

	const onClick = () => props.history.goBack()

	return (
		<div>
			<Button onClick={onClick}>Back</Button>
			<Edit {...props} data={data} />
		</div>
	);
}

export default EditView;