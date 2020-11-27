(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){e.exports=t(36)},36:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),o=t.n(u),c=t(2),l=function(e){return r.a.createElement("form",{onSubmit:e.addNewContact},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange})),r.a.createElement("div",null,r.a.createElement("p",null),r.a.createElement("button",{type:"submit"},"Add to the Phonebook")))},i=function(e){return r.a.createElement("li",null,e.name," ",e.number,r.a.createElement("button",{onClick:function(){return e.handleErase(e.person)}},"Erase"))},m=function(e){var n=e.persons,t=e.handleErase,a=n;return r.a.createElement("div",null,a.map((function(e){return r.a.createElement(i,{key:e.name,name:e.name,person:e,number:e.number,handleErase:t})})))},s=function(e){return r.a.createElement("div",null,"Filter phonebook with: ",r.a.createElement("input",{value:e.filter,onChange:e.handleFilterChange}))},d=t(3),f=t.n(d),h="api/persons",b=function(){return f.a.get(h)},E=function(e){return f.a.post(h,e)},p=function(e){return f.a.put("".concat(h,"/").concat(e.id),e).then((function(e){return e.data}))},v=function(e){return f.a.delete("".concat(h,"/").concat(e))},g=function(e){var n=e.message,t={color:"green",fontStyle:"italic",fontSize:16};return null===n?r.a.createElement("div",{style:t}):r.a.createElement("div",{className:"error",style:t},n)},w=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],u=n[1],o=Object(a.useState)(""),i=Object(c.a)(o,2),d=i[0],f=i[1],h=Object(a.useState)(""),w=Object(c.a)(h,2),C=w[0],k=w[1],N=Object(a.useState)(""),j=Object(c.a)(N,2),O=j[0],y=j[1],S=Object(a.useState)(null),A=Object(c.a)(S,2),F=A[0],T=A[1];Object(a.useEffect)((function(){b().then((function(e){u(e.data)}))}),[]);var P=t.filter((function(e){return e.name.toLowerCase().includes(O.toLowerCase())})),J=function(e){v(e.id).then((function(n){var a=t.filter((function(n){return n.id!==e.id}));u(a),T("Contact was removed successfully."),setTimeout((function(){T(null)}),5e3)}))};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(g,{message:F}),r.a.createElement(s,{newFilter:O,handleFilterChange:function(e){y(e.target.value)}}),r.a.createElement("h3",null,"Add new contact:"),r.a.createElement(l,{addNewContact:function(e){if(e.preventDefault(),t.every((function(e){return e.name!==d})))E({name:d,number:C}).then((function(e){u(t.concat(e.data)),f(""),k(""),T("A new contact was added to phonebook."),setTimeout((function(){T(null)}),5e3)})).catch((function(e){console.log(e.response.data),T("Adding a new contact failed. Please make sure, that name is at least 3 chars and number is at least 8 numbers long."),setTimeout((function(){return T(null)}),5e3)}));else if(window.confirm("".concat(d," is already added to phonebook, would you like to change the number"))){console.log("Change number");var n=t.find((function(e){return e.name===d}));n.number=C,p(n).then((function(e){u(t.map((function(t){return t.id!==n.id?t:e}))),f(""),k(""),T("".concat(e.name," has been changed")),setTimeout((function(){T(null)}),5e3)}))}},newName:d,newNumber:C,handleNameChange:function(e){f(e.target.value)},handleNumberChange:function(e){k(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(m,{persons:P,handleErase:function(e){var n=e.name;window.confirm("Should ".concat(n," be erased from the phonebook?"))&&J(e)}}))};o.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.00cc564e.chunk.js.map