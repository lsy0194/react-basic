import { useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Members.scss';

export default function Members() {
	const initVal = {
		userid: '',
		pw1: '',
		pw2: '',
		email: '',
	};

	const [Val, setVal] = useState(initVal);

	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(name, value);
	};
	return (
		<Layout title={'Members'}>
			<form>
				<fieldset>
					<legend className='h'>회원가입 폼 양식</legend>
					<table border='1'>
						<tbody>
							{/* userid */}
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>userid</label>
								</th>
								<td>
									<input
										type='text'
										id='userid'
										name='userid'
										value={Val.userid}
										onChange={handleChange}
									/>
								</td>
							</tr>
							{/* password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pw1'>password</label>
								</th>
								<td>
									<input
										type='password'
										id='pw1'
										name='pw1'
										value={Val.pw1}
										onChange={handleChange}
									/>
								</td>
							</tr>
							{/* re password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pw2'>re password</label>
								</th>
								<td>
									<input
										type='password'
										id='pw2'
										name='pw2'
										value={Val.pw2}
										onChange={handleChange}
									/>
								</td>
							</tr>
							{/* email */}
							<tr>
								<th scope='row'>
									<label htmlFor='email'>e-mail</label>
								</th>
								<td>
									<input
										type='text'
										id='email'
										name='email'
										value={Val.email}
										onChange={handleChange}
									/>
								</td>
							</tr>
							{/* btnSet */}
							<tr>
								<th colSpan='2'>
									<input type='reset' value='cancel' />
									<input type='submit' value='send' />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}
