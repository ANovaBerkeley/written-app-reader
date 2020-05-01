(this.webpackJsonpappreader=this.webpackJsonpappreader||[]).push([[0],{17:function(e,t,a){(function(e){e.AIRTABLE_KEY="keyd6qkfF0Q6csT9G",e.APPLICATIONS_URL="https://api.airtable.com/v0/appm1EwjHL56mOmPx/All%20Applications",e.DECISIONS_URL="https://api.airtable.com/v0/appm1EwjHL56mOmPx/Decisions",e.OFFICERS=["Aditya Varshney","Anna Gao","Sai Yandapalli","Hau Nguyen","Andrew Lieu"],e.SEM_SECRET="993342",e.NUM_YES=30,e.IGNORED_FIELDS=["Name","Email","Year","Phone Number"],e.QUESTION_ORDER=[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,0,1,2,3,4,5],e.INSTRUCTIONS="\n# Recruitment guidelines\nPlease review this page for instructions, reminders, and tips on how to proceed app-reading. \nAlthough each officer brings his or her own unique perspective to the app-reading process, standardized app-reading criteria and expectations make the decision process smoother for everyone!\n\n## Deadlines\n- app reading is due by **DATE** at **TIME**\n- the deliberations meeting will be in **LOCATION** from **7:00pm to 9:00pm** on **Friday**\n\n### Mission Statement\nSome things to look out for:\n\n- is the candidate discussing ANova's actual mission? \n- do they make generalizations about our students and/or their backgrounds or communities? \n- is their response centered around themselves or around our service impact?\n- do they have a desire to learn more about the communities we work with?\n- etc. etc.\n\n### Mentorship response\n- do they have some understanding of the challenges and responsibilities of mentoring students?\n- do they come off as open-minded, strict, self-centered, aloof, etc.?\n- reading this app, would you anticipate that they'd adjust well to an ANova site?\n- etc. etc.\n\n### Structural inequality\n- gauge how much they understand about inequality vs. inequity \n- gauge how much they know about different socioeconomic issues relating to education and beyond\n- have they been active in assisting underresourced or marginalized communities?\n- etc. etc.\n\n### Site availability\n- do they have at least 3 site times? If not, but the app is good, flag it and bring it up during delibs.\n"}).call(this,a(13))},26:function(e,t,a){"use strict";(function(e){var n=a(1),i=a(5),r=a(4),s=a(3),o=a(0),l=a.n(o),c=a(16),m=a(7),u=a(27),p=a(28),d=a(31),h=(a(17),a(46),function(t){Object(r.a)(o,t);var a=Object(s.a)(o);function o(){var e;return Object(n.a)(this,o),(e=a.call(this)).state={reviewerName:null,error:null},e}return Object(i.a)(o,[{key:"authUser",value:function(){var t=Error("Invalid Credentials!");if(!this.state.reviewerName){var a=prompt("Please enter your name: ","First Last");if(null!==a&&""!==a&&e.OFFICERS.includes(a)){var n=prompt("Secret key: ","Given to you by executives");null===n||""===n||!e.SEM_SECRET===n?this.setState({error:t}):this.setState({reviewerName:a})}else this.setState({error:t})}}},{key:"componentDidMount",value:function(){this.authUser()}},{key:"render",value:function(){var e=this.state.error;return e?l.a.createElement("div",null,"Error: ",e.message):l.a.createElement(c.a,null,l.a.createElement("div",null,l.a.createElement(v,null),l.a.createElement("hr",null),l.a.createElement("div",null,l.a.createElement(m.c,null,l.a.createElement(m.a,{path:"/written-app/guidelines"},l.a.createElement(p.a,null)),l.a.createElement(m.a,{path:"/written-app/applications"},l.a.createElement(u.a,{reviewerName:this.state.reviewerName})),l.a.createElement(m.a,{path:"/written-app/decisions"},l.a.createElement(d.a,null))))))}}]),o}(o.Component));function v(){return l.a.createElement("div",{class:"topnav"},l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement(c.b,{id:"guidelines",to:"/written-app/guidelines",style:{color:"inherit",textDecoration:"inherit"}},"Guidelines")),l.a.createElement("li",null,l.a.createElement(c.b,{id:"apps",to:"/written-app/applications",style:{color:"inherit",textDecoration:"inherit"}},"Read applications")),l.a.createElement("li",null,l.a.createElement(c.b,{id:"decisions",to:"/written-app/decisions",style:{color:"inherit",textDecoration:"inherit"}},"See Your App Decision History (tbd)"))))}t.a=h}).call(this,a(13))},27:function(e,t,a){"use strict";(function(e){var n=a(15),i=a.n(n),r=a(19),s=a(1),o=a(5),l=a(4),c=a(3),m=a(0),u=a.n(m),p=a(22),d=(a(43),a(17),function(t){Object(l.a)(n,t);var a=Object(c.a)(n);function n(){var e;return Object(s.a)(this,n),(e=a.call(this)).state={error:null,userDecisions:[],allApplications:[],remainingApps:[],comments:"",flag:"No",numYeses:null,votingStarted:!1,votingComplete:!1},e}return Object(o.a)(n,[{key:"formatFieldResponse",value:function(e){return"string"!==typeof e?Array.from(e).join(", "):e}},{key:"shuffle",value:function(e){return e.sort((function(){return Math.random()-.5})),e}},{key:"airtableStateHandler",value:function(t){var a=this;return fetch(e.DECISIONS_URL+"?filterByFormula=%7BReviewer%20Name%7D%20%3D%20%20%22"+t+"%22&view=Grid%20view",{headers:{Authorization:"Bearer "+e.AIRTABLE_KEY}}).then((function(e){return e.json()})).then((function(e){a.setState({userDecisions:e.records})}),(function(e){a.setState({error:e})})),fetch(e.APPLICATIONS_URL+"?view=Grid%20view",{headers:{Authorization:"Bearer "+e.AIRTABLE_KEY}}).then((function(e){return e.json()})).then((function(t){a.setState((function(n){return{allApplications:a.shuffle(t.records),numYeses:e.NUM_YES-n.userDecisions.filter((function(e){return"Yes"===e.fields.Interview})).length,remainingApps:t.records.filter((function(e){return!n.userDecisions.map((function(e){return e.fields.ID})).includes(e.id)}))}}))}),(function(e){a.setState({error:e})})),this.setState({comments:"",flag:"No"}),!this.state.error}},{key:"airtableVoteHandler",value:function(){var t=Object(r.a)(i.a.mark((function t(a,n,r,s,o,l){var c;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch(e.DECISIONS_URL,{body:'{"records": [{"fields": {"Applicant Name": "'+a+'","Reviewer Name": "'+n+'","Interview": "'+r+'","Flag": "'+s+'","Comments": "'+o+'", "ID": "'+l+'"}}]}',headers:{Authorization:"Bearer "+e.AIRTABLE_KEY,"Content-Type":"application/json"},method:"POST"});case 3:return c=t.sent,t.t0=console,t.next=7,c.text();case 7:t.t1=t.sent,t.t0.log.call(t.t0,t.t1),p.a.notify(u.a.createElement("div",{className:"toast"},u.a.createElement("h4",{className:"toast-text"},"Voted ",r," for ",a,"!")),{duration:1e3,position:"bottom"}),this.airtableStateHandler(n),document.getElementById("app-view").scrollTop=0,console.log(this.state),t.next=18;break;case 15:t.prev=15,t.t2=t.catch(0),console.log("fetch failed [VOTE]",t.t2);case 18:case"end":return t.stop()}}),t,this,[[0,15]])})));return function(e,a,n,i,r,s){return t.apply(this,arguments)}}()},{key:"renderAppLine",value:function(t,a){var n=this.formatFieldResponse(t[a]);if(!e.IGNORED_FIELDS.includes(a))return u.a.createElement("div",{className:"app-question",key:a},u.a.createElement("p",{className:"app-field"},u.a.createElement("b",null,a)),u.a.createElement("p",{className:"app-response"},n))}},{key:"orderFields",value:function(t){return e.QUESTION_ORDER?e.QUESTION_ORDER.slice().map((function(e){return Object.keys(t)[e]})):Object.keys(t)}},{key:"renderApp",value:function(e){var t=this;return this.orderFields(e).map((function(a){return t.renderAppLine(e,a)}))}},{key:"handleCommentsChange",value:function(e){this.setState({comments:e.target.value})}},{key:"handleFlagChange",value:function(e){var t=e.target.checked?"Yes":"No";console.log(t),this.setState({flag:t})}},{key:"voteOnRemainingApps",value:function(){var t=Object(r.a)(i.a.mark((function t(){var a,n=this;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(document.getElementById("leftover-no-button").disabled=!0,0===this.state.numYeses){console.log("Voting 'No' on remaining apps!"),a=this.state.remainingApps.map((function(e){return'{"fields": {"Applicant Name": "'+e.fields.Name+'","Reviewer Name": "'+n.props.reviewerName+'","Interview": "No","Flag": "No","Comments": "", "ID": "'+e.id+'"}}'}));try{a.map((function(t){return fetch(e.DECISIONS_URL,{body:'{"records": ['+t+"]}",headers:{Authorization:"Bearer "+e.AIRTABLE_KEY,"Content-Type":"application/json"},method:"POST"})}))}catch(i){console.log("fetch failed [VOTE]",i)}}this.setState({votingComplete:!0},(function(){console.log(n.state.votingComplete,"votingComplete"),p.a.notify(u.a.createElement("div",{className:"done-toast"},u.a.createElement("h4",{className:"toast-text"},"All done! Great work!")),{position:"bottom",duration:null})}));case 3:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"renderVoteRemainingButton",value:function(){var e=this;return this.state.remainingApps.length>0?u.a.createElement("div",null,u.a.createElement("h3",null,"No Yeses Remaining"),u.a.createElement("button",{className:"leftover-no-button",id:"leftover-no-button",onClick:function(){e.voteOnRemainingApps(),e.airtableStateHandler(e.props.reviewerName)}},'Vote "No" on Remaining ',this.state.remainingApps.length," Apps")):u.a.createElement("div",null,u.a.createElement("h3",null,"No Apps to Review."),u.a.createElement("p",null,"Visit the Airtable to make changes"))}},{key:"initPage",value:function(){console.log(this.state.votingStarted,"status in startVoting"),this.setState({votingStarted:!0}),this.airtableStateHandler(this.props.reviewerName)}},{key:"componentDidMount",value:function(){this.airtableStateHandler(this.props.reviewerName)}},{key:"render",value:function(){var e=this;if(this.state.votingStarted||(console.info("Initializing"),this.initPage()),0===this.state.remainingApps.length||0===this.state.numYeses){var t=this.renderVoteRemainingButton();return u.a.createElement("div",null,u.a.createElement("div",{className:"container"},u.a.createElement("div",{className:"header"},u.a.createElement("div",{className:"header-application"},"Application"),u.a.createElement("div",{className:"header-stats"},"Apps Remaining: ",this.state.remainingApps.length),u.a.createElement("div",{className:"header-stats"},"Yeses Remaining: ",this.state.numYeses)),u.a.createElement("div",{className:"app-section"},u.a.createElement("div",{className:"app-view",id:"app-view"}),u.a.createElement("div",{className:"app-options"},u.a.createElement("h3",{className:"reviewer-label"},"Reviewer:"),u.a.createElement("p",{className:"reviewer-name"},this.props.reviewerName),u.a.createElement("h4",{className:"comments-label"},"Comment:"),u.a.createElement("textarea",{id:"comments-textbox",className:"comments-textbox",name:"app",value:this.state.comments,disabled:!0}),u.a.createElement("div",{className:"flag"},u.a.createElement("input",{id:"flag-checkbox",className:"flag-checkbox",type:"checkbox",checked:"Yes"===this.state.flag,disabled:!0}),u.a.createElement("label",{htmlFor:"flag-checkbox"},"Flag")),u.a.createElement("div",{className:"vote"},t)))))}var a=this.state.remainingApps[0],n=a.fields,i=a.id,r=n.Name,s=this.props.reviewerName,o=this.renderApp(n);return u.a.createElement("div",null,u.a.createElement("div",{className:"container"},u.a.createElement("div",{className:"header"},u.a.createElement("div",{className:"header-application"},"Application"),u.a.createElement("div",{className:"header-stats"},"Apps Remaining: ",this.state.remainingApps.length),u.a.createElement("div",{className:"header-stats"},"Yeses Remaining: ",this.state.numYeses)),u.a.createElement("div",{className:"app-section"},u.a.createElement("div",{className:"app-view",id:"app-view"},o),u.a.createElement("div",{className:"app-options"},u.a.createElement("h3",{className:"reviewer-label"},"Reviewer:"),u.a.createElement("p",{className:"reviewer-name"},this.props.reviewerName),u.a.createElement("h4",{className:"comments-label"},"Comment:"),u.a.createElement("textarea",{id:"comments-textbox",className:"comments-textbox",name:"app",value:this.state.comments,onChange:this.handleCommentsChange.bind(this)}),u.a.createElement("div",{className:"flag"},u.a.createElement("input",{id:"flag-checkbox",className:"flag-checkbox",type:"checkbox",checked:"Yes"===this.state.flag,onChange:this.handleFlagChange.bind(this)}),u.a.createElement("label",{htmlFor:"flag-checkbox"},"Flag")),u.a.createElement("div",{className:"vote"},u.a.createElement("h3",{className:"vote-label"},"Vote"),u.a.createElement("button",{className:"no-button",disabled:this.state.numYeses<=0,onClick:function(){e.airtableVoteHandler(r,s,"No",e.state.flag,e.state.comments,i),window.scrollTo(0,0)}},"No"),u.a.createElement("button",{className:"skip-button",onClick:function(){e.airtableStateHandler(s),document.getElementById("app-view").scrollTop=0}},"Skip"),u.a.createElement("button",{className:"yes-button",disabled:this.state.numYeses<=0,onClick:function(){e.airtableVoteHandler(r,s,"Yes",e.state.flag,e.state.comments,i),window.scrollTo(0,0)}},"Yes"))))))}}]),n}(m.Component));t.a=d}).call(this,a(13))},28:function(e,t,a){"use strict";(function(e){var n=a(1),i=a(5),r=a(4),s=a(3),o=a(0),l=a.n(o),c=a(29),m=(a(44),a(17),e.INSTRUCTIONS),u=function(e){Object(r.a)(a,e);var t=Object(s.a)(a);function a(){var e;return Object(n.a)(this,a),(e=t.call(this)).state={},e}return Object(i.a)(a,[{key:"render",value:function(){return l.a.createElement(c.a,{className:"md-body",children:m})}}]),a}(o.Component);t.a=u}).call(this,a(13))},31:function(e,t,a){"use strict";var n=a(1),i=a(5),r=a(4),s=a(3),o=a(0),l=a.n(o),c=(a(45),a(17),function(e){Object(r.a)(a,e);var t=Object(s.a)(a);function a(){var e;return Object(n.a)(this,a),(e=t.call(this)).state={},e}return Object(i.a)(a,[{key:"render",value:function(){return l.a.createElement("div",{className:"md-body"},l.a.createElement("h2",null,"App Decision History"))}}]),a}(o.Component));t.a=c},34:function(e,t,a){e.exports=a(51)},39:function(e,t,a){},43:function(e,t,a){},44:function(e,t,a){},45:function(e,t,a){},46:function(e,t,a){},51:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(12),s=a.n(r),o=(a(39),a(26));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(o.a,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[34,1,2]]]);
//# sourceMappingURL=main.42ab9545.chunk.js.map