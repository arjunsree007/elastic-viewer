import React, { useEffect } from "react";
import ElasticConnection from "./ElasticConnection";
import CoreConfiguration from "./CoreConfiguration";

function Configuration(props) {
  const {
    fetchCores,
    loadingCoreList,
    coreList,
    connectUrl,
    loadingConnection,
    showConfig,
    displayList,
    selectAllDisplays,
    changeDisplayConfig,
    filterList,
    changeFilterConfig,
    searchList,
    selectAllSearches,
    changeSearchConfig,
    saveDataConfiguration,
    url,
    password,
    userName,
    core
  } = props;

  useEffect(() => {}, []);

  return (
    <>
      <div>
        <ElasticConnection
          fetchCores={fetchCores}
          loadingCoreList={loadingCoreList}
          coreList={coreList}
          connectUrl={connectUrl}
          loadingConnection={loadingConnection}
          url={url}
          core={core}
          userName={userName}
          password={password}
        />
      </div>

      {showConfig === true && (
        <CoreConfiguration
          loadingConnection={loadingConnection}
          saveDataConfiguration={saveDataConfiguration}
          displayList={displayList}
          selectAllDisplays={selectAllDisplays}
          changeDisplayConfig={changeDisplayConfig}
          filterList={filterList}
          changeFilterConfig={changeFilterConfig}
          searchList={searchList}
          selectAllSearches={selectAllSearches}
          changeSearchConfig={changeSearchConfig}
        />
      )}
    </>
  );
}

export default Configuration;
