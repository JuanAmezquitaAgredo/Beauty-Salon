import React from 'react'
import styled from 'styled-components'

interface ITableProps {
  thead: string[];
  tbody: any[];
  onEdit?: (rowIndex: number) => void;
  onDelete?: (rowIndex: number) => void;
}

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #FAF3EF;
    color: #D4AF37;
  }
  
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const ActionButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &.edit {
    background-color: #4CAF50;
    color: white;
  }

  &.delete {
    background-color: #f44336;
    color: white;
  }
`;

export default function TableComponent({ thead, tbody, onEdit, onDelete }: ITableProps) {
  return (
    <StyledTable>
      <thead>
        <tr>
          {thead.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {tbody.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {thead.map((header, cellIndex) => (
              <td key={cellIndex}>{row[header]}</td>
            ))}
            <td>
              <ActionButton 
                className="edit" 
                onClick={() => onEdit && onEdit(rowIndex)}
              >
                Editar
              </ActionButton>
              <ActionButton 
                className="delete" 
                onClick={() => onDelete && onDelete(rowIndex)}
              >
                Eliminar
              </ActionButton>
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
}
