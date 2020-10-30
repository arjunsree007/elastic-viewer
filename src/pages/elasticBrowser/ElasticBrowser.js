import React, { useState, useEffect } from 'react';
import Search from '../../components/search/Search';
import Configuration from './../../components/configuration/Configuration';
import { getAllMappings } from '../../utils/AxiosService';
import { useDispatch } from 'react-redux';
import { openSnackbar } from './../../store/actions/SnackbarActions';

function ElasticBrowser() {
	const [showSearch, setShowSearch] = useState(false);
	const [showConfig, setShowConfig] = useState(false);
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [core, setCore] = useState('');
	const [url, setUrl] = useState('');
	const [searchkeyword, setSearchkeyword] = useState('');
	const [query, setQuery] = useState('');
	const [field, setField] = useState('');
	const [searchIndex, setSearchIndex] = useState(0);

	const [loadingCoreList, setLoadingCoreList] = useState(false);
	const [loadingConnection, setLoadingConnection] = useState(false);
	const [coreList, setCoreList] = useState([]);
	const [displayList, setDisplayList] = useState([]);
	const [filterList, setFilterList] = useState([]);
	const [searchList, setSearchList] = useState([]);
	const [displayConfList, setDisplayConfList] = useState([]);
	const [filterConfList, setFilterConfList] = useState([]);
	const [searchConfList, setSearchConfList] = useState([]);
	const [selectAllDisplays, setSelectAllDisplays] = useState(true);
	const [selectAllSearches, setSelectAllSearches] = useState(false);
	const [searchLoading, setSearchLoading] = useState(false);
	const [totalHits, setTotalHits] = useState(0);
	const recordsPerPage = 10;
	const [hits, setHits] = useState([]);
	const [aggregationConf, setAggregationConf] = useState({});
	const [aggregations, setAggregations] = useState([]);
	const [aggrArray, setAggrArray] = useState([]);

	const [filterArray, setFilterArray] = useState([]);
	const [selectedFilters, setSelectedFilters] = useState([]);
	const [headers, setHeaders] = useState([]);
	const [exportLoading, setExportLoading] = useState(false);
	const [exportHeaders, setExportHeaders] = useState([]);
	const [exportHits, setExportHits] = useState([]);

	const dispatch = useDispatch();

	//get all cores
	const fetchCores = async (coreUrl, uname, pwd) => {
		coreUrl = coreUrl.replace(/\/$/, '');
		const authString = uname !== '' &&
			pwd !== '' && { username: uname, password: pwd };
		const config = authString
			? {
					url: coreUrl + '/_cat/indices?format=json',
					method: 'get',
					auth: authString,
			  }
			: {
					url: coreUrl + '/_cat/indices?format=json',
					method: 'get',
			  };

		var cores = [];
		setLoadingCoreList(true);
		await getAllMappings(config)
			.then((response) => {
				setLoadingCoreList(false);
				response && response.map((item) => cores.push(item.index));
				cores.length > 0 && setCoreList(cores);
			})
			.catch((error) => {
				setLoadingCoreList(false);
				dispatch(openSnackbar('Unable to connect', 'error'));
			});
	};

	//connect to elastic url - configuration
	const connectUrl = async (connectionUrl, uname, pwd, coreName) => {
		connectionUrl = connectionUrl.replace(/\/$/, '');
		setUserName(uname);
		setPassword(pwd);
		setCore(coreName);
		setUrl(connectionUrl);
		const authString = uname !== '' &&
			pwd !== '' && { username: uname, password: pwd };
		const config = authString
			? {
					url: connectionUrl + '/' + coreName + '/_mappings',
					method: 'get',
					auth: authString,
			  }
			: {
					url: connectionUrl + '/' + coreName + '/_mappings',
					method: 'get',
			  };
		setLoadingConnection(true);
		var data = {};

		await getAllMappings(config)
			.then((response) => {
				setLoadingConnection(false);
				setShowConfig(true);

				let check1 = false;
				let check2 = false;

				try {
					check1 = Object.entries(
						Object.values(Object.values(response)[0].mappings)[0].properties
					);
				} catch (error) {
					console.log(error);
				}

				try {
					check2 = Object.entries(
						Object.values(response)[0].mappings.properties
					);
				} catch (error) {
					console.log(error);
				}

				if (check1) {
					data = check1;
				} else {
					data = check2;
				}

				// data = Object.entries(
				//   Object.values(Object.values(response)[0].mappings)[0].properties
				// );

				setSearchConfig(data);
				setDisplayConf(data);
				setFilterConf(data);
			})
			.catch((error) => {
				setLoadingConnection(false);
				dispatch(openSnackbar('Unable to connect', 'error'));
			});
	};

	function setDisplayConf(conf) {
		var displayConf = [];
		conf.forEach(function (item) {
			displayConf.push([item[0], item[1], { checked: true }]);
		});

		setDisplayList(displayConf);
	}

	function setFilterConf(conf) {
		var filterConf = [];

		conf.forEach(function (item) {
			var fieldArr = [];
			if ('fields' in item[1]) {
				fieldArr = Object.keys(item[1].fields);
				fieldArr.forEach(function (fieldItem) {
					filterConf.push([
						{ field: item[0] + '.' + fieldItem },
						{ checked: false },
					]);
				});
			} else {
				filterConf.push([{ field: item[0] }, { checked: false }]);
			}
		});

		setFilterList(filterConf);
	}

	function setSearchConfig(conf) {
		var searchConf = [];
		conf.forEach(function (item) {
			var fieldArr = [];
			if ('fields' in item[1]) {
				fieldArr = Object.keys(item[1].fields);
				fieldArr.forEach(function (fieldItem) {
					searchConf.push([
						{ field: item[0] + '.' + fieldItem },
						{ checked: false },
					]);
				});
			} else {
				searchConf.push([{ field: item[0] }, { checked: false }]);
			}
		});

		setSearchList(searchConf);
	}

	function changeFilterConfig(filterFieldName) {
		setFilterList(
			filterList.map((item) => {
				if (item[0].field === filterFieldName) {
					item[1].checked = !item[1].checked;
					return item;
				} else {
					return item;
				}
			})
		);
	}

	function changeDisplayConfig(displayFieldName) {
		if (displayFieldName === 'selectAll') {
			selectAllDisplays
				? setDisplayList(
						displayList.map((item) => {
							if (item[2].checked === true) {
								item[2].checked = false;
								return item;
							} else {
								return item;
							}
						})
				  )
				: setDisplayList(
						displayList.map((item) => {
							if (item[2].checked === false) {
								item[2].checked = true;
								return item;
							} else {
								return item;
							}
						})
				  );
			setSelectAllDisplays(!selectAllDisplays);
		} else {
			setDisplayList(
				displayList.map((item) => {
					if (item[0] === displayFieldName) {
						item[2].checked = !item[2].checked;
						return item;
					} else {
						return item;
					}
				})
			);
		}
	}

	function changeSearchConfig(searchFieldName) {
		if (searchFieldName === 'selectAll') {
			selectAllSearches
				? setSearchList(
						searchList.map((item) => {
							if (item[1].checked === true) {
								item[1].checked = false;
								return item;
							} else {
								return item;
							}
						})
				  )
				: setSearchList(
						searchList.map((item) => {
							if (item[1].checked === false) {
								item[1].checked = true;
								return item;
							} else {
								return item;
							}
						})
				  );
			setSelectAllSearches(!selectAllSearches);
		} else {
			setSearchList(
				searchList.map((item) => {
					if (item[0].field === searchFieldName) {
						item[1].checked = !item[1].checked;
						return item;
					} else {
						return item;
					}
				})
			);
		}
	}

	function saveDataConfiguration() {
		var displayArr = [];
		var filterArr = [];
		var searchArr = [];
		var aggs = '';
		var aggsObj = {};
		displayList.forEach(function (item) {
			if (item[2].checked === true) displayArr.push(item[0]);
		});

		filterList.forEach(function (item) {
			if (item[1].checked === true) {
				var aggrs = {};
				filterArr.push(item);
				aggs = item[0].field;
				aggrs = {
					terms: {
						field: aggs,
						size: 20,
						order: { _count: 'desc' },
					},
				};
				aggsObj[aggs] = aggrs;
			}
		});

		searchList.forEach(function (item) {
			if (item[1].checked === true) searchArr.push(item);
		});

		setDisplayConfList(displayArr);
		setHeaders(displayArr);
		setExportHeaders(displayArr);
		setFilterConfList(filterArr);
		setSearchConfList(searchArr);
		setAggregationConf(aggsObj);
		setSearchValues('', '');
		setSearchkeyword('');
		setSearchIndex(0);
		setFilterArray([]);
		setSelectedFilters([]);
		setShowSearch(true);
		window.scrollTo(0, 0);
	}

	function editConfiguration() {
		setSearchValues('', '');
		setSearchkeyword('');
		setSearchIndex(0);
		setFilterArray([]);
		setSelectedFilters([]);
		setShowSearch(false);
	}

	function setSearchValues(searchQuery, searchField) {
		setQuery(searchQuery);
		setField(searchField);
	}

	function getPagedResults(index) {
		setSearchIndex(index);
		fetchData(query, field, index, 0, [], filterArray);
	}

	function getExportData(from, recordNum, colHeaders) {
		fetchData(query, field, from, recordNum, colHeaders, filterArray);
	}

	const fetchData = async (
		searchQuery,
		searchField,
		fromIndex,
		recordCount,
		sources,
		filterArr
	) => {
		const authString = userName !== '' &&
			password !== '' && { username: userName, password: password };
		let data = {};
		data = {
			from: fromIndex,
			size: recordCount === 0 ? recordsPerPage : recordCount,
			_source: sources.length > 0 ? sources : displayConfList,
		};

		if (Object.keys(aggregationConf).length > 0) data['aggs'] = aggregationConf;

		var mustArr = [];
		if (searchQuery) {
			mustArr.push({
				multi_match: {
					query: searchQuery,
					fields: searchField === '' ? [] : [searchField],
				},
			});
			setSearchkeyword(searchQuery);
		}

		if (filterArr && filterArr.length) {
			filterArr.forEach(function (element) {
				mustArr.push(element);
			});
		}

		if (mustArr.length > 0) {
			data['query'] = {
				bool: {
					must: mustArr,
				},
			};
		}

		const config = authString
			? {
					url: url + '/' + core + '/_search',
					method: 'post',
					auth: authString,
					data: data,
			  }
			: {
					url: url + '/' + core + '/_search',
					method: 'post',
					data: data,
			  };

			  if(recordCount >  0 || 
				sources.length) {
					setExportLoading(true);
				} else {
		setSearchLoading(true);}
		var searchHits = [];
		var aggregationsArr = [];
		await getAllMappings(config)
			.then((response) => {
				if(recordCount >  0 || 
					sources.length) {
						setExportLoading(false);
					} else {
				setSearchLoading(false);}
				response.hits.hits.map((item, i) => searchHits.push(item._source));

				if (sources.length || recordCount > 0) {
					setExportHits(searchHits);
				} else {
					if (response.hits.total.value || response.hits.total.value === 0) {
						setTotalHits(response.hits.total.value);
					} else {
						setTotalHits(response.hits.total);
					}

					setHits(searchHits);
				//	setExportHits(searchHits);
					aggregationsArr =
						response.aggregations && Object.entries(response.aggregations);
					setAggrArray(aggregationsArr);
					// setAggregationArray(aggregationsArr);
				}
			})
			.catch((error) => {
				setSearchLoading(false);
				setTotalHits(0);
				setHits([]);
				setExportHits([]);
				setAggrArray([]);

				if (error.response.data.error.hasOwnProperty('root_cause')) {
					if (
						error.response.data.error.root_cause[0].type ===
							'illegal_argument_exception' &&
						error.response.data.error.root_cause[0].reason.includes('Fielddata')
					) {
						setShowSearch(false);
						dispatch(openSnackbar('Filter not found', 'error'));
					} else {
						dispatch(openSnackbar('Search failed', 'error'));
					}
				} else {
					dispatch(openSnackbar('Unable to connect', 'error'));
				}
			});
	};

	function setAggregationArray(aggArr) {
		var buckets = [];
		if (aggArr && aggArr.length) {
			aggArr.forEach(function (element) {
				buckets = element[1].buckets;
				buckets.forEach(function (item) {
					var filter =
						selectedFilters.find(
							(f) => f.filterName === element[0] && f.filterValue === item.key
						) || {};
					if (Object.keys(filter).length > 0) {
						item.checked = true;
					} else item.checked = false;
				});
			});
		}
		setAggregations(aggArr);
	}

	function toggleFilterStatus(aggregationFilter, aggregationName) {
		setAggregations(
			aggregations.map((item) => {
				if (item[0] === aggregationName) {
					item[1].buckets.length > 0 &&
						item[1].buckets.map((bucket) => {
							if (bucket.key === aggregationFilter) {
								if (bucket.checked) {
									bucket.checked = false;
									setSelectedFilters(
										selectedFilters.filter(
											(f) =>
												!(
													f.filterName === item[0] &&
													f.filterValue === bucket.key
												)
										)
									);
								} else {
									bucket.checked = true;
									var filter =
										selectedFilters.find(
											(f) =>
												f.filterName === item[0] && f.filterValue === bucket.key
										) || {};
									if (Object.keys(filter).length === 0) {
										setSelectedFilters((selectedFilters) => [
											...selectedFilters,
											{ filterName: item[0], filterValue: bucket.key },
										]);
									}
								}
								return bucket;
							} else {
								return bucket;
							}
						});
				}
				return item;
			})
		);
	}

	function searchFilters() {
		var filterArr = [];
		aggregations.forEach(function (item) {
			var shouldArr = [];
			item[1].buckets.length > 0 &&
				item[1].buckets.forEach(function (bucket) {
					var matchObj = {};
					if (bucket.checked === true) {
						matchObj = { match: { [item[0]]: bucket.key } };
						shouldArr.push(matchObj);
					}
				});

			if (shouldArr.length > 0) {
				if (shouldArr.length > 1) {
					filterArr.push({ bool: { should: shouldArr } });
				} else {
					filterArr.push(shouldArr[0]);
				}
			}
		});
		setFilterArray(filterArr);

		fetchData(query, field, searchIndex, 0, [], filterArr);
	}

	function resetFilters() {
		setSelectedFilters([]);

		fetchData(query, field, searchIndex, 0, [], []);
		setFilterArray([]);
	}

	function resetSearch() {
		setSearchValues('', '');
		setSearchkeyword('');
		setSearchIndex(0);
		setFilterArray([]);
		setSelectedFilters([]);
		fetchData('', '', 0, 0, [], []);
	}

	useEffect(() => {
		setAggregationArray(aggrArray);
	}, [filterArray, aggrArray]);

	useEffect(() => {
		if (showSearch) {
			setSearchValues('', '');
			setSearchkeyword('');
			setSearchIndex(0);
			setFilterArray([]);
			setSelectedFilters([]);
			fetchData('', '', 0, 0, [], []);
		}
	}, [displayConfList, searchConfList, filterConfList]);


	return showSearch === true ? (
		<Search
			editConfiguration={editConfiguration}
			resetSearch={resetSearch}
			displayList={displayConfList}
			searchList={searchConfList}
			toggleFilterStatus={toggleFilterStatus}
			aggregations={aggregations}
			resetFilters={resetFilters}
			searchFilters={searchFilters}
			searchkeyword={searchkeyword}
			searchLoading={searchLoading}
			setSearchValues={setSearchValues}
			fetchData={fetchData}
			totalHits={totalHits}
			core={core}
			headers={headers}
			exportHeaders={exportHeaders}
			hits={hits}
			exportLoading ={exportLoading}
			exportHits={exportHits}
			getExportData={getExportData}
			getPagedResults={getPagedResults}
			recordsPerPage={recordsPerPage}
		/>
	) : (
		<Configuration
			fetchCores={fetchCores}
			url={url}
			core={core}
			userName={userName}
			password={password}
			loadingCoreList={loadingCoreList}
			connectUrl={connectUrl}
			loadingConnection={loadingConnection}
			coreList={coreList}
			showConfig={showConfig}
			displayList={displayList}
			selectAllDisplays={selectAllDisplays}
			changeDisplayConfig={changeDisplayConfig}
			filterList={filterList}
			changeFilterConfig={changeFilterConfig}
			searchList={searchList}
			selectAllSearches={selectAllSearches}
			changeSearchConfig={changeSearchConfig}
			saveDataConfiguration={saveDataConfiguration}
		/>
	);
}

export default ElasticBrowser;
