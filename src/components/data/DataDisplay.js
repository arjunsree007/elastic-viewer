import React from 'react';
import styles from './DataDisplay.module.scss';
import classNames from 'classnames';
import { Spinner, Table } from 'react-bootstrap';
import Pagination from './../pagination/Pagination';

function DataDisplay(props) {
	const {
		searchLoading,
		headers,
		hits,
		searchkeyword,
		totalHits,
		getPagedResults,
		recordsPerPage,
		setPageNum,
	} = props;

	function renderData(item) {
		let arr = [];
		headers.map((element, i) =>
			arr.push(
				<td key={i}>
					<div className={styles.tableContent}>
						{item[element] === null
							? ''
							: getHighlightedText(item[element], searchkeyword)}
					</div>
				</td>
			)
		);
		/*  Object.keys(item).forEach(function(key) {
      arr.push(
        <React.Fragment key={key}>
          <dt className="col-sm-3">{key}</dt>{" "}
          <dd className="col-sm-9">
            <p className={styles.textMore}>
              {getHighlightedText(item[key], searchkeyword)}
            </p>
          </dd>
        </React.Fragment>
      );
    });*/

		return arr;
	}

	function getHighlightedText(text, highlight) {
		if (Array.isArray(text)) {
			return <span>{text.join(', ')}</span>;
		}

		if (typeof text === 'object') {
			return <span>{JSON.stringify(text)}</span>;
		}
		return text;

		/*  if (!(highlight && highlight.length > 2)) {
      return text;
    }*/

		// Split on highlight term and include term into parts, ignore case
		/*  const parts = text.toString().split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {" "}
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { fontWeight: "bold", color: "#bd2130" }
                : {}
            }
          >
            {part}
          </span>
        ))}{" "}
      </span>
    );*/
	}

	return (
		<div className={classNames(styles.dataContainer)}>
			<Pagination
				totalRecords={totalHits}
				getSelectedIndex={getPagedResults}
				recordsPerPage={recordsPerPage}
				setPageNum={setPageNum}
			/>

			{searchLoading ? (
				<div className='p-5 text-center'>
					<Spinner animation='border' variant='primary' />
				</div>
			) : hits && hits.length ? (
				<Table size='sm' bordered responsive hover>
					{headers && headers.length > 0 ? (
						<thead className='thead-dark'>
							<tr>
								{headers.map((header, h) => (
									<th key={h}>{header}</th>
								))}
							</tr>
						</thead>
					) : (
						<></>
					)}
					<tbody>
						{hits.map((item, i) => (
							<tr key={i}>{renderData(item)}</tr>
						))}
					</tbody>
				</Table>
			) : (
				/*
        headers && headers.length &&
        hits.map((item, i) => (
          <div key={i} className="card mb-2 card-body">
            <dl className="row">{renderData(item)}</dl>
          </div>
        ))*/
				<div className='card mb-2 card-body'> No records found</div>
			)}
		</div>
	);
}

export default DataDisplay;
