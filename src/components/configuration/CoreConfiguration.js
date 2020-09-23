import React, { useEffect } from "react";
import DataConfiguration from "./DataConfiguration";

function CoreConfiguration(props) {
  const {
    loadingConnection,
    displayList,
    selectAllDisplays,
    changeDisplayConfig,
    filterList,
    changeFilterConfig,
    searchList,
    selectAllSearches,
    changeSearchConfig,
    saveDataConfiguration
  } = props;

  useEffect(() => {}, [props]);

  return (
    <DataConfiguration
      loadingConnection={loadingConnection}
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

export default CoreConfiguration;
