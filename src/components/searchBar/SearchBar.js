import React, { useState, useEffect } from 'react';
import { Form, Col } from 'react-bootstrap';
import UserButton from './../customButtons/UserButton';

function SearchBar(props) {
	const {
		searchList,
		fetchData,
		editConfiguration,
		setSearchValues,
		resetSearch,
	} = props;
	const [searchField, setSearchField] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [formErrors, setFormErrors] = useState({
		query: '',
	});

	function handleChange(event) {
		event.preventDefault();
		const { name, value } = event.target;

		//	setFormValues({ ...formValues, [name]: value });
		switch (name) {
			case 'query':
				setSearchQuery(value);
				setFormErrors({
					...formErrors,
					query: value.length > 0 ? '' : 'Search query is required.',
				});
				break;
			case 'searchField':
				setSearchField(value);
				break;
			default:
				break;
		}
	}

	function validateForm() {
		let queryError = '';

		let valid = false;

		queryError = searchQuery.length === 0 ? 'Search query is required' : '';

		if (queryError.length === 0) valid = true;

		setFormErrors({
			formErrors,
			query: queryError,
		});

		return valid;
	}

	function searchMappings(event) {
		event.preventDefault();
		if (formErrors.query.length === 0) {
			if (validateForm()) {
				setSearchValues(searchQuery, searchField);
				fetchData(searchQuery, searchField, 0, 0, [], []);
			}
		}
		window.scrollTo(0, 0);
	}

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			/*  event.preventDefault();
      if (formErrors.query.length === 0) {
        if (validateForm()) {
          setSearchValues(searchQuery, searchField);
          fetchData(searchQuery, searchField, 0);
        }
      }*/
			searchMappings(event);
		}
	};

	function editConfig(event) {
		event.preventDefault();
		editConfiguration();
	}

	function reset(event) {
		event.preventDefault();
		setSearchField('');
		setSearchQuery('');
		resetSearch();
	}

	useEffect(() => {}, []);

	return (
		<div className='bg-light card mb-2 mt-2 card-body'>
			<Form className='container-xl'>
				<Form.Row>
					<Form.Group as={Col} md='3'>
						<Form.Control
							size='lg'
							as='select'
							name='searchField'
							value={searchField}
							onChange={(event) => handleChange(event)}>
							<option value=''>All Fields</option>
							{searchList && searchList.length
								? searchList.map((item) => (
										<option key={item[0].field} value={item[0].field}>
											{item[0].field}
										</option>
								  ))
								: ''}
						</Form.Control>
					</Form.Group>
					<Form.Group as={Col} md='6' controlId='query'>
						<Form.Control
							name='query'
							size='lg'
							type='text'
							placeholder='Type to search..'
							value={searchQuery}
							onKeyDown={handleKeyDown}
							onChange={(event) => handleChange(event)}
						/>
						<Form.Text
							className={
								formErrors.query === '' ? 'text-primary' : 'text-danger'
							}>
							{formErrors.query === ''
								? 'Search Using Elastic Json Query.'
								: formErrors.query}
						</Form.Text>
					</Form.Group>

					<Form.Group
						className='text-center'
						as={Col}
						md='3'
						controlId='submitButton'>
						<UserButton
							variant='primary'
							size='lg'
							label='Search'
							onClick={(event) => searchMappings(event)}
						/>
						<UserButton
							variant='dark'
							className='ml-2'
							size='lg'
							label='Reset'
							onClick={(event) => reset(event)}
						/>

						<UserButton
							variant='link'
							label='Edit Configuration'
							onClick={(event) => editConfig(event)}
						/>
					</Form.Group>
				</Form.Row>
			</Form>
		</div>
	);
}

export default SearchBar;
