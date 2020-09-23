import React from "react";
import { Modal } from "react-bootstrap";
import CoreList from "../configuration/CoreList";

/**
 *
 * @version
 * @author: ambily.tv
 * @create date: 2020-03-06
 *
 * Modal - popup for confirmation. On delete and update
 */

function CoreListModal(props) {
  const { coreList } = props;

  return (
		<Modal show={props.openModal} onHide={props.handleModalClose}>
			<Modal.Header closeButton>
				<Modal.Title>{props.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<CoreList
					setCoreToConfigure={props.setCoreToConfigure}
					coreList={coreList}
				/>
			</Modal.Body>
		</Modal>
	);
}

export default CoreListModal;

//
