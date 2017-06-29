console.log("2");
import $ from "jquery";

import Bb from "../lib/backboneforms.js";

import {ProjectCol, ProjectManager} from "./Project";
import ProjectView from "./ProjectView";
import ProjectEdit from "./ProjectEdit";
import ProjectViewLayout from "./ProjectViewLayout";
import ProjectViewCol from "./ProjectViewCol";
import projectEditForm from "../templates/projectEditForm.jst";

var whoami = "ProjectController:";

var Form = Bb.Form;

var projectCollection,
	projectLayoutView,
	projectColView;



var fetchProjectsFromDB = function(cb){
	var projects = [
		{
			projectname: "projecto1222",
		},
		{
			projectname: "projecto2",
		}
	];


	cb(new ProjectCol(projects)) ;
};

/*********************
*  HELPER(S)
*********************/
var findProjectByName = function(name){
	if(!projectCollection) return null;

	return projectCollection.findByName(name);
};


/*********************
*  USER LIST
*********************/
var renderProjectList = function(layout, projects){
	if(projectColView) projectColView.destroy();

	projectColView = new ProjectViewCol({collection: projects});
	// Eventos
	projectColView.on("project:selected", function(view){

		renderProjectView(view.model);

	});

	layout.getRegion("projectlist").show(projectColView.render());
	Bb.history.navigate("#proyectos/consulta");

};



/*********************
*  ProjecT EDIT
*********************/
var initProjectEdit = function(name){

	var project = findProjectByName(name);
	if(project){

		editProjectData(project);

	}else{
		console.log("Project no encontrado");
	}
};

var editProjectData = function(project){
	console.log("[%s] editProjectData: BEGINS[%s]",whoami, project.get("projectname"));
	var form = editProjectForm(project);
	renderProjectForm(form);
	Bb.history.navigate("#proyectos/editar" + project.get("projectname"));

};

var editProjectForm = function(project){
	var form = new Form({
		model: project,
		template: projectEditForm
	});

	form.on("blur", function(form, editor){
		var error = form.commit();
		if(error){
			console.log("[%s] onRENDER blur: ERROR [%s]",whoami, form.model.get("username"));
		}else{
			console.log("[%s] onRENDER blur: OK [%s] Bb:[%s]",whoami, form.model.get("username"), Bb.VERSION);

			ProjectManager.updateProject(form.model, projectCollection);

			renderProjectList(projectLayoutView, projectCollection);
		}
	});
	return form;
};

var renderProjectForm = function(form){
	var projectForm = new ProjectEdit({form: form});

	projectLayoutView.getRegion("projectedit").show(projectForm.render());
	projectLayoutView.triggerMethod("project:form:show");
};


/*********************
*  USER NEW
*********************/
var createNewProject = function(){
	var project = ProjectManager.factoryNewProject();

	var form = factoryProjectFormNew(project);
	renderProjectFormModal(form);
	Bb.history.navigate("#proyectos/alta");

};

var factoryProjectFormNew = function(project){
	var form = new Form({
		model: project,
	});

	form.on("blur", function(form, editor){
		var error = form.commit();
		if(error){
			console.log("[%s] onRENDER blur: ERROR [%s]",whoami, form.model.get("projectname"));
		}else{
			console.log("[%s] onRENDER blur: OK [%s] Bb:[%s]",whoami, form.model.get("projectname"), Bb.VERSION);
		}
	});
	return form;
};


var renderProjectFormModal = function(form){
	var modal = new Bb.BootstrapModal({
		content: form,
		title: "Alta nuevo projecto" ,
		okText: "aceptar",
		cancelText: "cancelar",
		enterTriggersOk: false,
	});

	modal.on("ok",function(){
		var errors = form.commit({validate: true});
		if(!errors){
			//----------------------------------------------------: facet       user asking for meeting    user's mica profile  other's profile
			console.log("[%s] OK Modal [%s] Bb:[%s]",whoami, form.model.get("username"), Bb.VERSION);
			ProjectManager.addProject(form.model, projectCollection);

			renderProjectList(projectLayoutView, projectCollection);

		}else{
			console.log("Se produjo un error en la actualización de sus datos. Inténtelo nuevamente");
		}
	});

	modal.open();
};



/*********************
*  USER VIEW
*********************/
var initProjectView = function(name){
	var project = findProjectByName(name);
	if(project){
                
		console.log("Projecto ENCONTRADO!!!!");
		renderProjectView(project);

	}else{
		console.log("Projecto no encontrado ojo");
	}
};


var listenProjectViewEvents = function(model, view){

	view.on("project:edit", function(view){
		console.log("[%s] USER VIEW listen user:edit %s] [%s]", whoami, arguments.length, model.get("username"));
		editProjectData(model, view);
	});
};

var renderProjectView = function(model){

        console.log("entro a renderProjectView");
	var projectView = new ProjectView({model: model});

	listenProjectViewEvents(model, projectView);
	projectLayoutView.getRegion("project").show(projectView.render());
};


/*********************
*  USER MODULE
*********************/
var projectModuleFactory = function(cb){

	fetchProjectsFromDB(function(projects){

		projectCollection = projects;

		var layout = initModuleLayout();

		renderProjectList(layout, projects);

		cb(layout);
	});
};

var initModuleLayout = function(){

	projectLayoutView = new ProjectViewLayout();

	projectLayoutView.getRegion("project").on("show", function(region, view, options){
		console.log("[%s] projectoo region triggers user:view:show [%s] [%s]", whoami, arguments.length, view.whoami);
		projectLayoutView.triggerMethod("project:view:show", view, region, options);
	});

	projectLayoutView.getRegion("projectlist").on("show", function(region, view, options){
		console.log("[%s] userlist region triggers user:list:show [%s] [%s]", whoami, arguments.length, region.whoami);
		projectLayoutView.triggerMethod("project:list:show", view, region, options);
	});

	projectLayoutView.on("add:new:project", function(){
		console.log("add:new:user bubbled");
		ProjectController.projectCreate();
	});

	projectLayoutView.render();

	return projectLayoutView;
};

/**********************************************
           USER CONTROLLER API
***********************************************/
var ProjectController = {
	loadModule: function(cb){

		projectModuleFactory(cb);

	},

	showProjectList: function(){
		console.log("[%s] showProjectList", whoami);
		Bb.history.navigate("#proyectos/consulta");
		if(!projectLayoutView){
			this.loadModule(function(view){
				$("#appcontent").html(view.$el);
			});
		}else{
			projectLayoutView.getRegion("projectlist").show(projectColView.render());
		}
	},

	showProjectDetails: function(name){
		console.log("aaaaa[%s] showProjectDetails [%s]", whoami, name);
		if(!projectLayoutView){
			this.loadModule(function(view){
				$("#appcontent").html(view.$el);
				initProjectView(name);
			});
		}else{
                        
			initProjectView(name);
		}
	},

	projectCreate: function(){
		console.log("[%s] projectCreate ", whoami);
		if(!projectLayoutView){
			this.loadModule(function(view){
				$("#appcontent").html(view.$el);
				createNewProject();
			});

		}else{
			createNewProject();
		}

	},

	projectEdit: function(name){
		console.log("[%s] projectEdit ", whoami);
		if(!projectLayoutView){
			this.loadModule(function(view){
				$("#appcontent").html(view.$el);
				initProjectEdit(name);
			});

		}else{
			initProjectEdit(name);
		}

	}
};

export default ProjectController;
