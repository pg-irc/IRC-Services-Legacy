import composeHeader from '../../data/Helpers/headers';
import actions from './actions';
import store from '../../shared/store';

let api = api || {};

api.serviceCategories = {
	getAll: () => {
		const url = '/api/service-types/';
		let { login } = store.getState();

		if (!login.user) return [];

		let headers = composeHeader(login.csrfToken, login.user.token);

		return fetch(url, { headers }).then(r => r.json());
	},
	getOne: id => {
		const url = `/api/service-types/${id}/`;
		let { login } = store.getState();

		if (!login.user) return [];

		let headers = composeHeader(login.csrfToken, login.user.token);

		return fetch(url, { headers }).then(r => r.json());
	},
	listAll: () => {
		const url = '/api/list-service-types/';
		let { login, serviceCategories } = store.getState();

		if (!login.user) return [];

		let headers = composeHeader(login.csrfToken, login.user.token);

		// Saving response to redux store
		return serviceCategories.list ? Promise.resolve(serviceCategories.list) : fetch(url, { headers }).then(r => r.json()).then(r => { store.dispatch(actions.setServiceCategoriesList(r)); return r; });
	},
	saveType: data => {
		let { login } = store.getState();

		if (!login.user) return [];

		let headers = composeHeader(login.csrfToken, login.user.token);
		const method = data.id === 0 ? 'POST' : 'PUT';
		const url = data.id === 0 ? `/api/service-types/` : `/api/service-types/${data.id}/`;

		return fetch(url, { method: method, body: JSON.stringify(data), headers: headers }).then(r => r.json());
	}
};

export default api;