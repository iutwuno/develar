console.log("4");
import Mn from "backbone.marionette";
import ProjectController from "./ProjectController";

var ProjectRouter = Mn.AppRouter.extend({
	controller: ProjectController,

	appRoutes: {
		"proyectos/alta": "projectCreate",
		"proyectos/editar/:id": "projectEdit",
		"proyectos/consulta": "showProjectList",
		"proyectos/ver/:id": "showProjectDetails"
	}
});

export default ProjectRouter;
