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

  td {
    color: #4d4d4d;
  }
  
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  td.Colum-Buttons{
    width: 180px;
    text-align: center;
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
    background-color: #4caf4fa2;
    color: white;
  }

  &.delete {
    background-color: #f443368f;
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
        {tbody.map((row, rowIndex) => {
          const id = row[thead[0]]; 

          return (
            <tr key={rowIndex}>
              {thead.map((header, cellIndex) => (
                <td key={cellIndex}>{row[header]}</td>
              ))}
              <td className="Colum-Buttons">
                <ActionButton
                  className="edit"
                  onClick={() => onEdit && onEdit(id)} 
                >
                  Editar
                </ActionButton>
                <ActionButton
                  className="delete"
                  onClick={() => onDelete && onDelete(id)} 
                >
                  Eliminar
                </ActionButton>
              </td>
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
}

