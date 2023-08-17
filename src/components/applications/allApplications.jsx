import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { updateAllApplications } from "../../store/actions";
import { handleErrors } from "../../utils/helpers";
import { AIRTABLE_KEY } from "../../secrets.js";
import Table from "../table/table";

const AllApplications = (props) => {
    const { dispatch, allApplications } = props;

    const getAllApplications = async () => {
        if (allApplications.length == 0) {
            const responses = await fetch(global.APPLICATIONS_URL + `?api_key=${AIRTABLE_KEY}&view=Grid%20view`)
                .then(handleErrors)

            var offset = responses.offset;
            var collectedApplications = responses.records;
            while (offset != null) {
                const offset_responses = await fetch(global.APPLICATIONS_URL + `?api_key=${AIRTABLE_KEY}&view=Grid%20view&offset=${offset}`)
                    .then(handleErrors);
                    collectedApplications = collectedApplications.concat(offset_responses.records);
                offset = offset_responses.offset;
            }
            dispatch(updateAllApplications(collectedApplications));
            console.log("GOT ALL APPLICATIONS");
            console.log(allApplications);
        } else {
            console.log("ALREADY HAVE ALL APPLICATIONS");
            console.log(allApplications);
        }
    }

    React.useEffect(
        () => {
            getAllApplications();
        }, [])

    const applicationsList = [];
        for (let i = 0; i < allApplications.length; i++) {
            const currentApplication = allApplications[i];
            const fields = currentApplication.fields;
                applicationsList.push({
                id: fields["ID"],
                name: fields["Name"],
                phone: fields["Phone Number"],
                email: fields["Email"],
                year: fields["Year"],
                pronouns: fields["Pronouns"],
                yeses: fields["Yes count"],
                button: "/app-reader-test-deploy/applicant?id=" + i.toString()
        })
    }

    const column_names = ["ID", "Applicant Name", "Phone Number", "Email", "Year", "Pronouns", "Yes Count"];
    const column_ids = ["id", "name", "phone", "email", "year", "pronouns", "yeses",];
    const column_widths = ["5vw", "20vw", "8vw", "10vw", "10vw", "10vw", "10vw",]

    return (
        <>
            <Table
                column_names={column_names}
                column_ids={column_ids}
                column_widths={column_widths}
                rows={applicationsList}
                button="Expand"
            />
        </>
    )

}


const mapStateToProps = (state) => {
    return {
      allApplications: state.mainReducer.allApplications,
    };
  };
  
  export default connect(mapStateToProps)(AllApplications);