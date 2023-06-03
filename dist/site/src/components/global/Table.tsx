import React from 'react';

interface HeadProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

function Head({ children, ...props }: HeadProps) {
  return (
    <thead {...props}>
      <tr>{children}</tr>
    </thead>
  );
}

interface BodyProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

function Body({ children, ...props }: BodyProps) {
  return <tbody {...props}>{children}</tbody>;
}

interface RowProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

function Row({ children, ...props }: RowProps) {
  return (
    <tr className="odd:bg-default" {...props}>
      {children}
    </tr>
  );
}

interface CellProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

function HeadCell({ children, ...props }: CellProps) {
  return (
    <th
      className="text-text-secondary border-border border-collapse border-b border-r px-3 py-2 text-sm font-medium  uppercase"
      {...props}
    >
      {children}
    </th>
  );
}

function Cell({ children, ...props }: CellProps) {
  return (
    <td
      className="text-text border-border border-collapse border-b border-r px-3  py-2 text-sm font-medium"
      {...props}
    >
      {children}
    </td>
  );
}

enum Variant {
  Default = 'default',
}

interface BaseProps {
  className?: string;
  responsive?: boolean;
  [key: string]: unknown;
}

interface PropsWithData extends BaseProps {
  data: (string | React.ReactNode)[][];
  children?: undefined;
}

interface PropsWithoutData extends BaseProps {
  data?: undefined;
  children: React.ReactNode;
}

type Props = PropsWithData | PropsWithoutData;

const Table = function Table({ data, children, className, ...props }: Props) {
  return data ? (
    <table
      className={`border-border text-text-secondary my-5 w-full table-auto border-collapse break-words border border-l border-t text-left ${
        className ?? ''
      }`}
      {...props}
    >
      <Head>
        {data[0].map((cell, cellIndex) => (
          <HeadCell key={cellIndex}>{cell}</HeadCell>
        ))}
      </Head>
      <Body>
        {data.slice(1).map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <Cell key={`${rowIndex}-${cellIndex}`}>{cell}</Cell>
            ))}
          </Row>
        ))}
      </Body>
    </table>
  ) : (
    <table {...props}>{children}</table>
  );
};

Table.Head = Head;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;

Table.Variant = Variant;

export default Table;
