console.log("3");
import Marionette from "backbone.marionette";
import template from "../templates/projectEdit.jst";
import "../styles/backboneforms.css";



export default Marionette.View.extend({
	whoami:"ProjectEdit:",
	
	initialize: function(data){
		console.log("[%s] Initialize", this.whoami);
		this.form = data.form;
	},

	template: template,

	regions: {
		form: "#form-hook",
	},
	
	events:{
	},

	closeView: function(e){
		e.preventDefault();
		e.stopPropagation();
		console.log("[%s] CLOSE", this.whoami);
		this.triggerMethod("project:view:close");

	},

	onRender: function(){
		this.showChildView("form",this.form);
	}

});
