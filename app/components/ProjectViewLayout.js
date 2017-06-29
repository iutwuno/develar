console.log("7");
import Marionette from "backbone.marionette";
import template from "../templates/projectLayout.jst";


export default Marionette.View.extend({
	whoami:"ProjectViewLayout:",

	template: template,

	events: {
		"click #newProject": "newProject"

	},

	triggers: {
		"click #newProject": "add:new:project"
	},

	regions: {
		project: "#projectView",
		projectlist: "#projectList",
		projectedit: "#projectEditPanel"
	},

	childViewEvents:{
		"project:col:render": "childColRender",
		"project:view:close": "projectViewClose",
		"project:form:close": "projectFormClose",
	},

	newProject: function(){

	},

	projectViewClose: function(){
		console.log("[%s] user:view:close bubbled on user layout", this.whoami);
		this.$("#projectlayout a[href=\"#projectList\"]").tab("show");
	},

	projectFormClose: function(){
		console.log("[%s] user:form:close bubbled on user layout", this.whoami);
		this.$("#projectlayout a[href=\"#projectList\"]").tab("show");
	},



	onProjectListShow: function(view, region, options){
		console.log("[%s] user:list:show bubbled on user layout", this.whoami);
		this.$("#projectlayout a[href=\"#projectList\"]").tab("show");
	},

	onProjectViewShow: function(view, region, options){
		console.log("[%s] user:view:show bubbled on user layout", this.whoami);
		this.$("#projectlayout a[href=\"#projectView\"]").tab("show");
	},

	onProjectFormShow: function(view, region, options){
		console.log("[%s] user:form:show bubbled on user layout", this.whoami);
		this.$("#projectlayout a[href=\"#projectEditPanel\"]").tab("show");
	},


	onChildProjectColRender: function(){
		console.log("[%s] user:col:render bubbled on user layout", this.whoami);
	},

	childColRender: function(){
		console.log("[%s] child:col:render EVENT on user layout", this.whoami);
		this.$("#projectlayout a[href=\"#projectList\"]").tab("show"); 
	},

});







