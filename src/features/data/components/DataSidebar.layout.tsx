import * as React from "react";
import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
`;
export const TableBody = styled.tbody``;

export const TableHeader = styled.tr`
  background: #0063ac;
  color: white;
  font-size: 14px;

  > td {
    padding: 4px 20px;
  }
`;

export const TableRowLabels = styled.tr`
  padding: 5px;
  border-bottom: 1px solid #eee;
  height: 20px;

  font-weight: bold;
`;

export const TableRow = styled.tr`
  padding: 5px;
  border-bottom: 1px solid #eee;
  height: 20px;

  &:nth-child(odd) {
    background: #fafafa;
    border-bottom: 1px solid #eee;
  }
`;

export const TableCell = styled.td`
  padding: 2px 20px;
`;
