console.log("6");
import Mn from "backbone.marionette";
import _ from "underscore";

var table = `
<thead class="thead-inverse">
  <tr>
    <th>projectname</th>
  </tr>
</thead>
<tbody></tbody>
`;
var tablerow = `
<td><a href="#proyectos/ver/<%- projectname %>"><%- projectname %></a></td>

`;

var RowView = Mn.View.extend({
	whoami:"RowView:ProjectViewCol:",
	tagName: "tr",
	template: _.template(tablerow),
  
	events:{
		"click a": "projectSelected"
	},
  
	projectSelected: function(e){
		this.triggerMethod("project:row", this);
	}  
});

var TableBody = Mn.CollectionView.extend({
	whoami:"TableBody:ProjectViewCol:",

	tagName: "tbody",

	childView: RowView,

	childViewEvents:{
		"project:row": "projectSelected"
	},
  
	projectSelected: function(view){
		this.triggerMethod("project:selected", view);
	},



});


var TableView = Mn.View.extend({
	whoami:"TableView:ProjectViewCol:",

	tagName: "table",

	className: "table table-striped",
	
	template: _.template(table),

	regions: {
		body: {
			el: "tbody",
			replaceElement: true
		}
	},

	childViewEvents:{
		"project:selected": "projectSelected"
	},

	projectSelected: function(view){
		console.log("[%s] user:selected [%s]", this.whoami, view.model.get("projectname"));
		this.triggerMethod("project:selected", view);
	},

	onChildviewProjectSelected: function(e){
		console.log("[%s] onChildviewUserSelected [%s]", this.whoami, arguments.length);
	},

  
	onRender: function() {
		this.showChildView("body", new TableBody({
			collection: this.collection
		}));
		this.triggerMethod("project:col:render");
	}

});



export default TableView;

