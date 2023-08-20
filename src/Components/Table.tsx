import React, { useState } from 'react';


const TableCell = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className='font-maven-pro text-sm w-full text-gray-900 px-6 py-2'>
        {children}
      </div>
    )
  }
  
  interface TableHeaderProps {
    headers: string[];
  }
  
  const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => {
    return (
      <div className='flex flex-row border-b border-slate-300 bg-white font-semibold mb-2 px-6 py-2'>
        {headers.map((header, index) => (
          <TableCell key={index}>
            {header}
          </TableCell>
        ))}
      </div>
    );
  };
  
  interface TableRowProps {
    row: any;
    keys: string[];
    onRowClick: (row: any) => void;
  }

  const TableRow: React.FC<TableRowProps> = ({ row, keys, onRowClick }) => {

    const handleClick = () => {
      onRowClick(row);
    }
  
    return (
        <div className='flex flex-row border-b border-gray-200 hover:bg-gray-100' onClick={handleClick}>
        {keys.map((key, index) => (
          <TableCell key={index}>
            {row[key]}
          </TableCell>
        ))}
      </div>
    );
};
  
      
  const TableFooter = ({ page, setPage, maxPage }: { page: number, setPage: (page: number) => void, maxPage: number }) => {
    return (
      <div className='flex flex-row justify-center space-x-4 p-4'>
        <button disabled={page <= 0} onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {page + 1} of {maxPage + 1}</span>
        <button disabled={page >= maxPage} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    )
  }
  
  const TableBody = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className='flex-1 overflow-auto px-6'>
        {children}
      </div>
    )
  }
  
  
  interface TableProps {
    data: any[];
    headers: string[];
    keys: string[];
    onRowClick: (row: any) => void;
  }
  
  const Table: React.FC<TableProps> = ({ data , headers, keys, onRowClick }) => {
  
    const [page, setPage] = useState(0);
  
    const rowsPerPage = 10;
  
    const displayedRows = data.slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  
    return (
      <div className='flex flex-1 flex-col gap-2 bg-white rounded-md shadow-md'>
        <TableHeader headers={headers} />
        <TableBody>
          {displayedRows.map((row, index) => (
            <TableRow key={index} row={row} keys={keys} onRowClick={onRowClick} />
          ))}
        </TableBody>
        <TableFooter
          page={page}
          setPage={setPage}
          maxPage={Math.ceil(data.length / rowsPerPage) - 1}
        />
      </div>
    );
  };
  
  export default Table;