import React from "react";
import "./table.css"
import { Link } from "react-router-dom";

const Table = (props) => {
    const { column_names, column_ids, column_widths, rows, button } = props;

    const [sortAscending, setSortAscending] = React.useState(false);
    const [sortColumn, setSortColumn] = React.useState(null);

    const buttons = {"Expand": require("../../static/expand.png"), "Edit": require("../../static/edit.png")}

    const sortFunctionGenerator = (column, ascending) => {
        if (column === "id") {
            if (ascending) {
                return function (first, second) {
                return parseInt(first[column]) > parseInt(second[column]) ? 1 : -1;
                }
            }
            return function (first, second) {
                return parseInt(second[column]) > parseInt(first[column]) ? 1 : -1;
            }
        }
        if (ascending) {
            return function (first, second) {
            return first[column] > second[column] ? 1 : -1;
            }
        }
        return function (first, second) {
            return second[column] > first[column] ? 1 : -1;
        }
    }
    
    const sortBy = (column) => {
        if (sortColumn == column) {
            console.log(sortColumn)
            setSortAscending(!sortAscending);
        } else {
            setSortAscending(true);
            setSortColumn(column);
        }
        console.log(sortAscending, sortColumn);
    }
    
    if (sortColumn != null) {
        rows.sort(sortFunctionGenerator(sortColumn, sortAscending));
    }
    return (
        <table class="decision-table">
            <thead>
                <tr>
                    <th></th>
                    {column_names.map((column_name, i) => {
                        return <th class="sort-header" onClick={() => sortBy(column_ids[i])} style={{width: column_widths[i]}}>{column_name}</th>
                    })}
                <th>{button}</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row, i) => (
                <tr>
                    <td>{i}</td>
                    {column_ids.map(column_id => {
                        return <td>{row[column_id]}</td>
                    })}
                    <td>
                    <Link
                        id="decisions"
                        to={row.button}
                        className="link"
                    >
                    <img src={buttons[button]} alt={button} class="action-button"></img>
                    </Link>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    )
}
  
export default Table;