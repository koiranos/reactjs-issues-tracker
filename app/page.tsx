"use client";
import { getDataFromTree } from "@apollo/client/react/ssr";
import withApollo from "../lib/withApollo";
import {
  Get_IssuesQuery,
  Query,
  useGet_IssuesQuery,
  useGet_Issues_AfterQuery,
  useQuery,
} from "../generated";
import styled, { createGlobalStyle } from "styled-components";
import { Button, Typography } from "antd";
import TableWrapper from "@/components/tableWrapper";

const { Title } = Typography;

import { FilterContext } from "@/components/context";
import { useEffect, useState } from "react";
import SelectWrapper from "@/components/dropdownWrapper";

function Home() {
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const { data } = useGet_IssuesQuery();

  const changeFilter = (value: string) => {
    setSelectedFilter(value);
  };

  return (
    <FilterContext.Provider
      value={{
        data: selectedFilter,
        updateData: (value: string) => setSelectedFilter(value),
      }}
    >
      <GlobalStyles />
      <AppContainer>
        <AppTitle level={2}>Github Repository Issue Tracker</AppTitle>
        <SelectWrapper />
        <TableWrapper data={data} />
      </AppContainer>
    </FilterContext.Provider>
  );
}

export default withApollo(Home, { getDataFromTree });

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
  }
`;

const AppContainer = styled.div`
  width: 800px;
  height: 500px;
  margin: 0 auto;
  background-color: #d3d3d336;
`;

const AppTitle = styled(Title)`
  text-align: center;
  font-size: 24px;
`;
