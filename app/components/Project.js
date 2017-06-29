console.log("1");
import Backbone from "backbone";
import _ from "underscore";

var updateProjectData = function(model, col){
	console.log("update Project");
	var project = col.findByName(model.get("projectname"));
	project.set(model.attributes);
};



var ProjectManager = {
	whoami: "ProjectManager:",

	addProject: function(model, col){
		console.log("[%s] addProject",this.whoami);
		col.add(new Project(model.attributes));
	},

        updateProject: function(model, col){
		updateProjectData(model, col);
	},

	factoryNewProject: function(){
		return new ProjectNew();

	},
};

var Project = Backbone.Model.extend({

	whoami: "User:User.js: ",
	urlRoot: "/proyectos",

	idAttribute: "_id",

	schema: {
		projectname: {type: "Text", title: "Nombre de projecto", editorAttrs:{placeholder : "sera su identificación como usuario"},validators:["required"]}},
        defaults : {
		_id: null,
		projectname: ""
        }
});


var ProjectNew = Backbone.Model.extend({

	whoami: "ProjectNew:Project.js ",
	urlRoot: "/proyectos",

	idAttribute: "_id",

        schema: {
		projectname:       {type: "Text", title: "Nombre de projecto", editorAttrs:{placeholder : "sera su identificación como usuario"},validators:["required"]},},
	defaults : {
		_id: null,
		projectname: "",

	}
});

var ProjectCol = Backbone.Collection.extend({

	model: Project,

	url: "/proyectos",
	
	findByName: function(name){

		return this.findWhere({projectname: name});
	}

});



export  {Project, ProjectCol, ProjectManager};
