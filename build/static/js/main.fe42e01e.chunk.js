(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{20:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),c=t(1),o=t.n(c),r=t(14),i=t.n(r),s=(t(20),t(4)),u=function(e){var n=e.name;return Object(a.jsx)("h2",{children:n})},d=function(e){var n=e.actions;return Object(a.jsxs)(a.Fragment,{children:["filter shown with: ",Object(a.jsx)("input",{onChange:n})]})},l=function(e){var n=e.addNew,t=e.handleNameChange,c=e.handleNumberChange;return Object(a.jsx)(a.Fragment,{children:Object(a.jsxs)("form",{onSubmit:n,children:[Object(a.jsxs)("div",{children:["name: ",Object(a.jsx)("input",{id:"nameField",onChange:t})]}),Object(a.jsxs)("div",{children:["number: ",Object(a.jsx)("input",{id:"numberField",type:"number",onChange:c})]}),Object(a.jsx)("div",{children:Object(a.jsx)("button",{type:"submit",children:"add"})})]})})},m=function(e){var n=e.person;return Object(a.jsxs)(a.Fragment,{children:[n.name," ",n.number]})},b=function(e){var n=e.id,t=e.action,c=e.name;return Object(a.jsx)(a.Fragment,{children:Object(a.jsx)("button",{id:n,onClick:t,name:c,children:"delete"})})},j=function(e){var n=e.showThese,t=e.deleteFunc;return Object(a.jsx)(a.Fragment,{children:n.map((function(e){return Object(a.jsxs)("div",{children:[Object(a.jsx)(m,{person:e}),Object(a.jsx)(b,{id:e.id,action:t,name:e.name})]},e.name)}))})},h={color:"green"},f=function(e){var n=e.message;return console.log("this pops",n),null===n.msg?null:n.badNews?Object(a.jsx)("div",{className:"notifications",children:n.msg}):Object(a.jsx)("div",{className:"notifications",style:h,children:n.msg})},g=t(3),O=t.n(g),v="http://localhost:3001/api/persons",x=function(){return O.a.get(v).then((function(e){return e.data}))},w=function(e){return O.a.post(v,e).then((function(e){return e.data}))},p=function(e,n){return O.a.put("".concat(v,"/").concat(e),n).then((function(e){return e.data}))},N=function(e,n){return O.a.delete("".concat(v,"/").concat(e),n).then((function(e){return e.data}))},F=function(){var e=Object(c.useState)([]),n=Object(s.a)(e,2),t=n[0],o=n[1],r=Object(c.useState)({name:"",number:""}),i=Object(s.a)(r,2),m=i[0],b=i[1],h=Object(c.useState)([]),g=Object(s.a)(h,2),O=g[0],v=g[1],F=Object(c.useState)({msg:null,badNews:!1}),C=Object(s.a)(F,2),y=C[0],S=C[1];Object(c.useEffect)((function(){x().then((function(e){console.log("ini data: ",e),o(e),v(e)})).catch((function(e){console.log("error on loading database!",e)}))}),[]);return Object(a.jsxs)("div",{children:[Object(a.jsx)(u,{name:"Phonebook"}),Object(a.jsx)(f,{message:y}),Object(a.jsx)(d,{actions:function(e){var n=e.target.value.toLowerCase();if(""!==e.target.value){var a=t.filter((function(e){return e.name.toLowerCase().includes(n)}));v(a)}else v(t)}}),Object(a.jsx)(u,{name:"Add a new"}),Object(a.jsx)(l,{addNew:function(e){e.preventDefault();var n={name:m.name,number:m.number},a=t.filter((function(e){return e.name===n.name}));if(""!==m.name&&0===a.length){var c=t.concat(n);o(c),v(c),w(n).catch((function(e){return console.log("error on adding to database!",e)})),S({msg:"added ".concat(n.name,"!"),badNews:!1}),setTimeout((function(){S({msg:null,badNews:!1})}),2e3)}else 0!==a.length&&window.confirm("".concat(m.name," is already added, replace new number with old?"))&&(p(a[0].id,n).then((function(){x().then((function(e){o(e),v(e)})).catch((function(e){console.log("error on loading database!",e)}))})).catch((function(e){return console.log("error on adding to database!",e)})),S({msg:"updated number of ".concat(n.name,"!"),badNews:!1}),setTimeout((function(){S({msg:null,badNews:!1})}),2e3));b({name:"",number:""}),document.getElementById("nameField").value="",document.getElementById("numberField").value=""},handleNameChange:function(e){var n=m;n.name=e.target.value,b(n)},handleNumberChange:function(e){var n=m;n.number=e.target.value,b(n)}}),Object(a.jsx)(u,{name:"Numbers"}),Object(a.jsx)(j,{showThese:O,deleteFunc:function(e){window.confirm("really delete details of ".concat(e.target.name))&&(N(e.target.id).then((function(){x().then((function(e){o(e),v(e)})).catch((function(e){console.log("error on loading database!",e)}))})).catch((function(n){console.log(n),S({msg:"info of ".concat(e.target.name," has already been deleted from database!"),badNews:!0}),setTimeout((function(){S({msg:null,badNews:!1})}),5e3),x().then((function(e){o(e),v(e)})).catch((function(e){console.log("error on loading database!",e)}))})),S({msg:"removed details of ".concat(e.target.name,"!"),badNews:!1}),setTimeout((function(){S({msg:null,badNews:!1})}),2e3))}})]})};i.a.render(Object(a.jsx)(o.a.StrictMode,{children:Object(a.jsx)(F,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.fe42e01e.chunk.js.map