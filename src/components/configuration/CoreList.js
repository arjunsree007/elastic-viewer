import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import UserButton from '../customButtons/UserButton';

function CoreList(props) {
	const { coreList, setCoreToConfigure } = props;
	const [core, setCore] = useState('');

	function handleChange(event) {
		//event.preventDefault();
		const { value } = event.target;
		setCore(value);
	}

	function submitCore(event) {
		event.preventDefault();

		setCoreToConfigure(core);
	}

	useEffect(() => { }, []);

	return (
		<>
			<div style={{ maxHeight: "400px", overflow: 'auto' }} className='container'>
				<Form>
					{coreList &&
						coreList.length > 0 &&
						coreList.map((item, i) => (
							<Form.Group as={Row} key={i}>
								<Col key={i} sm={10}>
									<Form.Check
										type='radio'
										label={item}
										name={item}
										id={i}
										value={item}
										checked={core === item}
										onChange={(event) => handleChange(event)}
									/>
								</Col>
							</Form.Group>
						))}


				</Form>
			</div>
			<Form.Group className='text-center'>
				<UserButton
					variant='primary'
					className='mt-1'
					label='Submit'
					onClick={(event) => submitCore(event)}
				/>
			</Form.Group>
		</>
	);
}

export default CoreList;
