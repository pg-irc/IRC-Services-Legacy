import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Alert, Button, Form } from 'react-bootstrap';
import actions from './actions';
import composeHeader from '../../data/Helpers/headers';
import i18n from '../../shared/i18n';
import languages from './languages.json';

import './Login.scss';

const NS = 'Login';

export const Login = props => {
	i18n.customLoad(languages, NS);
	const { t } = useTranslation(NS);

	const [user, setUser] = useState('');
	const [pass, setPass] = useState('');
	const [message, setMessage] = useState(props.message ? props.message : '');

	const onSubmit = e => {
		e.preventDefault();
		login(user, pass);
	};

	const login = (user, pass) => {
		let body = JSON.stringify({ username: user, password: pass });

		let csrftoken = document.cookie.match(new RegExp('(^| )' + 'csrftoken' + '=([^;]+)'))[2];
		props.setCsrfToken(csrftoken);
		setMessage('');

		return fetch('/login', { headers: composeHeader(csrftoken), body, method: 'POST' })
			.then(res => {
				if (res.status === 200) return res.json();

				setMessage(res.statusText);
				return Promise.reject(res);
			})
			.then(res => {
				if (res) {
					res.loggedIn = new Date().toString();
					props.setUser(res);
					props.setTimedOut(false); // Clear timeout
				}
			})
			.catch(err => {
				err.status === undefined && setMessage('Endpoint unreachable');
			});
	};

	return (
		<div className={NS}>
			<Form onSubmit={onSubmit}>
				<Form.Group controlId='formBasicEmail'>
					<Form.Label>{t('username')}</Form.Label>
					<Form.Control type='email' placeholder='Enter email' onChange={e => setUser(e.target.value)} />
					<Form.Text className='text-muted'>
						{t('privacyInfo')}
					</Form.Text>
				</Form.Group>

				<Form.Group controlId='formBasicPassword'>
					<Form.Label>{t('password')}</Form.Label>
					<Form.Control type='password' placeholder='Password' onChange={e => setPass(e.target.value)} />
				</Form.Group>
				{message && <Alert variant='danger'>{message}</Alert>}
				<Button variant='primary' type='submit'>
					{t('submit')}
				</Button>
			</Form>
		</div>
	)
}

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = dispatch => {
	return {
		setCsrfToken: csrfToken => dispatch(actions.setCsrfToken(csrfToken)),
		setUser: user => dispatch(actions.setUser(user)),
		setTimedOut: timedOut => dispatch(actions.setTimedOut(timedOut))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);