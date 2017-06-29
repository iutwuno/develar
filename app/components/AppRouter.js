import Mn from "backbone.marionette";
import AppController from "./AppController";

var AppRouter = Mn.AppRouter.extend({
	controller: AppController,

	appRoutes: {
		"inicio": "showLanding",
		"usuarios": "loadUserModule",
		"proyectos": "loadProjectModule"
	}
});

export default AppRouter;
