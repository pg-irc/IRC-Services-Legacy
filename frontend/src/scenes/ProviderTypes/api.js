import composeHeader from '../../data/Helpers/headers';
import actions from './actions';
import store from '../../shared/store';

let api = api || {};

api.providerTypes = {
	getAll: () => {
		const url = '/api/provider-types/';
		let { login } = store.getState();

		if (!login.user) return [];

		let headers = composeHeader(login.csrfToken, login.user.token);

		return fetch(url, { headers }).then(r => r.json());
	},
	getOne: id => {
		const url = `/api/provider-types/${id}/`;
		let { login } = store.getState();

		if (!login.user) return [];

		let headers = composeHeader(login.csrfToken, login.user.token);

		return fetch(url, { headers }).then(r => r.json());
	},
	listAll: () => {
		const url = '/api/list-provider-types/';
		let { login, providerTypes } = store.getState();

		if (!login.user) return [];

		let headers = composeHeader(login.csrfToken, login.user.token);

		// Saving response to redux store
		return providerTypes.list ? Promise.resolve(providerTypes.list) : fetch(url, { headers }).then(r => r.json()).then(r => { store.dispatch(actions.setProviderTypesList(r)); return r; });
	},
	saveType: data => {
		let { login } = store.getState();

		if (!login.user) return [];

		let headers = composeHeader(login.csrfToken, login.user.token);

		store.dispatch(actions.setProviderTypesList(null));
	
		const method = data.id === 0 ? 'POST' : 'PUT';
		const url = data.id === 0 ? `/api/provider-types/` : `/api/provider-types/${data.id}/`;

		return fetch(url, { method: method, body: JSON.stringify(data), headers: headers }).then(r => r.json());

	}
};

export default api;