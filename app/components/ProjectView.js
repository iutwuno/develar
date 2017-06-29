console.log("5");
import Marionette from "backbone.marionette";
import template from "../templates/projectView.jst";



export default Marionette.View.extend({
	whoami:"ProjectView (detail):",
	
	template: template,

	events:{
		"click #closeview": "closeView",
		"click #projectedit": "editProject"

	},

	triggers:{
		"click #projectedit": "project:edit"
	},

	editProject: function(){
		console.log("[%s] editProject Event", this.whoami);
	},

	closeView: function(e){
		e.preventDefault();
		e.stopPropagation();
		console.log("[%s] CLOSE", this.whoami);
		this.triggerMethod("project:view:close");

	},

	onRender: function(){
		console.log("[%s] RENDER ProjectView!!", this.whoami);
	}

});







