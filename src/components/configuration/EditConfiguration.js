import React from 'react';
import UserButton from '../customButtons/UserButton';
import classNames from 'classnames';
import styles from './EditConfiguration.module.scss';

function EditConfiguration(props) {
	const { editConfiguration } = props;

	function editConfig(event) {
		event.preventDefault();
		editConfiguration();
	}
	return (
		<div
			className={classNames('text-right', styles.editContainer)}>
			<UserButton
				variant='outline-info'
				label='Edit Configuration'
				onClick={(event) => editConfig(event)}
			/>
		</div>
	);
}

export default EditConfiguration;
