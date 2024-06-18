import { Maybe, Query, SearchResultItemEdge } from "@/generated";
import { Table, Tag, Dropdown } from "antd";
import type { TableProps, MenuProps } from "antd";
import moment from "moment";
import { useContext } from "react";
import styled from "styled-components";
import { FilterContext } from "./context";

interface DataType {
  key: string;
  state: string;
  number: number;
  title: string;
  url: string;
  createdAt: string;
}

interface Issue {
  key: string;
  state: string;
  title: string;
  number: number;
  createdAt: string;
}
interface Node {
  cursor: string;
  node: Issue;
}

function TableWrapper({ data }: any) {
  const filterValues = useContext(FilterContext);

  const handleData = () => {
    const items = data?.search?.edges.map((item: Node, id: number) => {
      return {
        key: id,
        state: item.node.state,
        title: item.node.title,
        number: item.node.number,
        createdAt: item.node.createdAt,
      };
    });

    if (filterValues.data === "ALL") {
      return items;
    } else {
      return items.filter((item) => item.state === filterValues.data);
    }
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Status",
      dataIndex: "state",
      key: "state",
      render: (text) => (
        <ColoredTag $isOpen={text === "OPEN"}>{text}</ColoredTag>
      ),
      sorter: (a, b) => {
        return a.state.length - b.state.length;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      width: 80,
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (text) => moment(text).format("MMMM Do YYYY, h:mm:ss a"),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={handleData()}
        scroll={{ x: true, y: 500 }}
        size="small"
        bordered
        pagination={{ position: ["bottomRight"], size: "small" }}
      />
    </div>
  );
}

export default TableWrapper;

interface ColoredTagProps {
  $isOpen: boolean;
}

const ColoredTag = styled(Tag)<ColoredTagProps>`
  background-color: ${(p) => (p.$isOpen ? "#F0F5FF" : "#FFF2E8")};
  color: ${(p) => (p.$isOpen ? "#1E39C4" : "#D4380E")};
  border: ${(p) => (p.$isOpen ? "1px solid #ADC6FF" : "1px solid #FFBB96")};
`;
