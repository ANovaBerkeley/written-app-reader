(this.webpackJsonpappreader=this.webpackJsonpappreader||[]).push([[0],[,,,,,,,,,,,,function(e,t,a){"use strict";(function(e){var n=a(7),s=a.n(n),i=a(13),r=a(1),l=a(4),c=a(3),o=a(2),m=a(0),u=a.n(m),d=a(8),p=(a(23),a(24),function(t){Object(c.a)(n,t);var a=Object(o.a)(n);function n(){var e;return Object(r.a)(this,n),(e=a.call(this)).state={error:null,isLoaded:!1,userDecisions:[],allApplications:[],remainingApps:[],comments:"",flag:"No",numYeses:null,reviewerName:"test"},e}return Object(l.a)(n,[{key:"formatFieldResponse",value:function(e){return"string"!==typeof e?Array.from(e).join(", "):e}},{key:"shuffle",value:function(e){return e.sort((function(){return Math.random()-.5})),e}},{key:"airtableStateHandler",value:function(t){var a=this;return fetch(e.DECISIONS_URL+"?filterByFormula=%7BReviewer%20Name%7D%20%3D%20%20%22"+t+"%22&view=Grid%20view",{headers:{Authorization:"Bearer "+e.AIRTABLE_KEY}}).then((function(e){return e.json()})).then((function(e){a.setState({userDecisions:e.records})}),(function(e){a.setState({error:e})})),fetch(e.APPLICATIONS_URL+"?view=Grid%20view",{headers:{Authorization:"Bearer "+e.AIRTABLE_KEY}}).then((function(e){return e.json()})).then((function(t){a.setState((function(n){return{allApplications:a.shuffle(t.records),numYeses:e.NUM_YES-n.userDecisions.filter((function(e){return"Yes"===e.fields.Interview})).length,remainingApps:t.records.filter((function(e){return!n.userDecisions.map((function(e){return e.fields.ID})).includes(e.id)})),isLoaded:!0}}))}),(function(e){a.setState({isLoaded:!0,error:e})})),!this.state.error}},{key:"airtableVoteHandler",value:function(){var t=Object(i.a)(s.a.mark((function t(a,n,i,r,l,c){var o;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch(e.DECISIONS_URL,{body:'{"records": [{"fields": {"Applicant Name": "'+a+'","Reviewer Name": "'+n+'","Interview": "'+i+'","Flag": "'+r+'","Comments": "'+l+'", "ID": "'+c+'"}}]}',headers:{Authorization:"Bearer "+e.AIRTABLE_KEY,"Content-Type":"application/json"},method:"POST"});case 3:return o=t.sent,t.t0=console,t.next=7,o.text();case 7:t.t1=t.sent,t.t0.log.call(t.t0,t.t1),this.setState({comments:"",flag:"No"}),d.a.notify(u.a.createElement("div",{className:"toast"},u.a.createElement("h4",{className:"toast-text"},"Voted ",i," for ",a,"!")),{duration:1e3,position:"bottom"}),this.airtableStateHandler(n),document.getElementById("app-view").scrollTop=0,console.log(this.state),t.next=19;break;case 16:t.prev=16,t.t2=t.catch(0),console.log("fetch failed [VOTE]",t.t2);case 19:case"end":return t.stop()}}),t,this,[[0,16]])})));return function(e,a,n,s,i,r){return t.apply(this,arguments)}}()},{key:"renderAppLine",value:function(t,a){var n=this.formatFieldResponse(t[a]);if(!e.IGNORED_FIELDS.includes(a))return u.a.createElement("div",{className:"app-question",key:a},u.a.createElement("p",{className:"app-field"},u.a.createElement("b",null,a)),u.a.createElement("p",{className:"app-response"},n))}},{key:"orderFields",value:function(t){return e.QUESTION_ORDER?e.QUESTION_ORDER.slice().map((function(e){return Object.keys(t)[e]})):Object.keys(t)}},{key:"renderApp",value:function(e){var t=this;return this.orderFields(e).map((function(a){return t.renderAppLine(e,a)}))}},{key:"handleCommentsChange",value:function(e){this.setState({comments:e.target.value})}},{key:"handleFlagChange",value:function(e){var t=e.target.checked?"Yes":"No";console.log(t),this.setState({flag:t})}},{key:"componentDidMount",value:function(){this.airtableStateHandler(this.state.reviewerName)}},{key:"render",value:function(){var e=this,t=this.state.error,a=this.state.isLoaded;if(t)return u.a.createElement("div",null,"Error: ",t.message);if(!a)return u.a.createElement("div",null,"Loading...");if(!this.state.remainingApps.length||0===this.state.numYeses){var n=this.state.remainingApps.length?"yeses":"apps";return d.a.notify(u.a.createElement("div",{className:"toast"},u.a.createElement("h4",{className:"toast-text"},"No ",n," remaining!")),{position:"bottom",duration:null}),u.a.createElement("div",null,u.a.createElement("div",{className:"container"},u.a.createElement("div",{className:"header"},u.a.createElement("div",{className:"header-application"},"Application"),u.a.createElement("div",{className:"header-stats"},"Apps Remaining: ",this.state.remainingApps.length),u.a.createElement("div",{className:"header-stats"},"Yeses Remaining: ",this.state.numYeses)),u.a.createElement("div",{className:"app-section"},u.a.createElement("div",{className:"app-view",id:"app-view"}),u.a.createElement("div",{className:"app-options"},u.a.createElement("h3",{className:"reviewer-name"},"Reviewer: ",this.state.reviewerName),u.a.createElement("h4",{className:"comments-label"},"Comment:"),u.a.createElement("textarea",{id:"comments-textbox",className:"comments-textbox",name:"app",value:this.state.comments,disabled:"true"}),u.a.createElement("div",{className:"flag"},u.a.createElement("input",{id:"flag-checkbox",className:"flag-checkbox",type:"checkbox",checked:"Yes"===this.state.flag,disabled:"true"}),u.a.createElement("label",{htmlFor:"flag-checkbox"},"Flag")),u.a.createElement("div",{className:"vote"},u.a.createElement("h3",{className:"vote-label"},"Vote"),u.a.createElement("button",{className:"no-button",disabled:"true"},"No"),u.a.createElement("button",{className:"skip-button",disabled:"true"},"Skip"),u.a.createElement("button",{className:"yes-button",disabled:"true"},"Yes"))))))}var s=this.state.remainingApps[0],i=s.fields,r=s.id,l=i.Name,c=this.state.reviewerName,o=this.renderApp(i);return u.a.createElement("div",null,u.a.createElement("div",{className:"container"},u.a.createElement("div",{className:"header"},u.a.createElement("div",{className:"header-application"},"Application"),u.a.createElement("div",{className:"header-stats"},"Apps Remaining: ",this.state.remainingApps.length),u.a.createElement("div",{className:"header-stats"},"Yeses Remaining: ",this.state.numYeses)),u.a.createElement("div",{className:"app-section"},u.a.createElement("div",{className:"app-view",id:"app-view"},o),u.a.createElement("div",{className:"app-options"},u.a.createElement("h3",{className:"reviewer-name"},"Reviewer: ",this.state.reviewerName),u.a.createElement("h4",{className:"comments-label"},"Comment:"),u.a.createElement("textarea",{id:"comments-textbox",className:"comments-textbox",name:"app",value:this.state.comments,onChange:this.handleCommentsChange.bind(this)}),u.a.createElement("div",{className:"flag"},u.a.createElement("input",{id:"flag-checkbox",className:"flag-checkbox",type:"checkbox",checked:"Yes"===this.state.flag,onChange:this.handleFlagChange.bind(this)}),u.a.createElement("label",{htmlFor:"flag-checkbox"},"Flag")),u.a.createElement("div",{className:"vote"},u.a.createElement("h3",{className:"vote-label"},"Vote"),u.a.createElement("button",{className:"no-button",disabled:this.state.numYeses<=0,onClick:function(){e.airtableVoteHandler(l,c,"No",e.state.flag,e.state.comments,r),window.scrollTo(0,0)}},"No"),u.a.createElement("button",{className:"skip-button",onClick:function(){e.airtableStateHandler(c),document.getElementById("app-view").scrollTop=0}},"Skip"),u.a.createElement("button",{className:"yes-button",disabled:this.state.numYeses<=0,onClick:function(){e.airtableVoteHandler(l,c,"Yes",e.state.flag,e.state.comments,r),window.scrollTo(0,0)}},"Yes"))))))}}]),n}(m.Component));t.a=p}).call(this,a(10))},,function(e,t,a){e.exports=a(26)},,,,,function(e,t,a){},,,,function(e,t,a){},function(e,t,a){(function(e){e.AIRTABLE_KEY="keyd6qkfF0Q6csT9G",e.APPLICATIONS_URL="https://api.airtable.com/v0/appm1EwjHL56mOmPx/All%20Applications",e.DECISIONS_URL="https://api.airtable.com/v0/appm1EwjHL56mOmPx/Decisions",e.OFFICERS=["sai","maggie","joy"],e.NUM_YES=30,e.IGNORED_FIELDS=["Name","Email","Year","Phone Number"],e.QUESTION_ORDER=[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,0,1,2,3,4,5]}).call(this,a(10))},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(6),r=a.n(i),l=(a(19),a(12));a(25);var c=function(){return s.a.createElement(l.a,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(c,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[14,1,2]]]);
//# sourceMappingURL=main.59a0e6d1.chunk.js.map