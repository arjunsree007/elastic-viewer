import React from "react";
import { Modal } from "react-bootstrap";
import Export from "./../export/Export";

function ExportModal(props) {
  const {
    openModal,
    handleModalClose,
    title,
    core,
    page,
    totalHits,
    exportHeaders,
    getExportData,
    hits,
    exportLoading,
    exportHits
  } = props;
  return (
    <Modal size="lg" show={openModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Export
          core={core}
          page={page}
          headers={exportHeaders}
          hits={hits}
          exportLoading={exportLoading}
          exportHits={exportHits}
          getExportData={getExportData}
          totalHits={totalHits}
        />
      </Modal.Body>
    </Modal>
  );
}

export default ExportModal;
