import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    margin: `${theme.spacing(2)}px 0px`,
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

type Order = "desc" | "asc";

interface SortedTableProps<T> {
  data: T[];
  thead: { name: string; sorted?: boolean; key?: string }[];
  tbody: (e: T, key: any) => JSX.Element;
  sort: (collection: T[], order: Order, key?: string) => T[];
}

export default function SortedTable<T>(props: SortedTableProps<T>) {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>("desc");
  const [key, setKey] = useState<string>();

  const toggleOrder = (k?: string) => {
    if (key === k) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setKey(k);
    }
  };

  return (
    <Paper className={classes.paper}>
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby='tableTitle'
          size={"medium"}
          aria-label='enhanced table'
        >
          <TableHead>
            <TableRow>
              {props.thead.map((h) => (
                <TableCell
                  key={h.name}
                  // align={headCell.numeric ? 'right' : 'left'}
                  // padding={headCell.disablePadding ? 'none' : 'default'}
                  sortDirection={key === h.key ? order : false}
                >
                  <TableSortLabel
                    active={h.sorted && key === h.key}
                    direction={key === h.key ? order : "asc"}
                    onClick={() => toggleOrder(h.key)}
                  >
                    <b>{h.name}</b>
                    {key === h.key ? (
                      <span className={classes.visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props
              .sort(props.data, order, key)
              .map((row, index) => props.tbody(row, index))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
