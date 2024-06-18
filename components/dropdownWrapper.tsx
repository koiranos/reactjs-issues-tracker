import { Select } from "antd";
import { useContext } from "react";
import { FilterContext } from "./context";
import styled from "styled-components";

function SelectWrapper() {
  const filterValues = useContext(FilterContext);

  return (
    <WrapperContainer>
      <span>Filter Issues:</span>
      <Select
        style={{ marginRight: "10px" }}
        popupMatchSelectWidth={100}
        defaultValue={filterValues.data}
        onChange={(value: string) => filterValues.updateData(value)}
        options={[
          { value: "OPEN", label: <span>OPEN</span> },
          { value: "CLOSED", label: <span>CLOSED</span> },
          { value: "ALL", label: <span>ALL</span> },
        ]}
      />
    </WrapperContainer>
  );
}

export default SelectWrapper;

const WrapperContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;
  align-items: center;
  padding-bottom: 10px;
`;
