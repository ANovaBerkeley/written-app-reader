import React from "react";
import "./table.css"
import { Link } from "react-router-dom";

const Table = (props) => {
    const { column_names, column_ids, column_widths, rows, button, blur_names } = props;

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
            setSortAscending(!sortAscending);
        } else {
            setSortAscending(true);
            setSortColumn(column);
        }
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
                        const blur = blur_names && column_id == "name";
                        return <td style={blur ? {color: "transparent", textShadow: "0 0 10px #000", userSelect: "none"} : {}}>{row[column_id]}</td>
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