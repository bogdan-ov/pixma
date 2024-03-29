import { Tab } from "@base/common/tabs";
import { ProjectTabElement, ProjectTabView } from "@source/elements/tabs";
import type { TabsManager } from "@base/managers";
import type { Project } from "../project";

export default class ProjectTab extends Tab<ProjectTabView> {
    static readonly NAME = "project";
    
    readonly project: Project;

    constructor(manager: TabsManager, project: Project) {
        super(ProjectTab.NAME, manager, project.titleState);
    
        this.project = project;
        this.project.attachTab(this);

        this.attachView(new ProjectTabView(this));
    }

    createElement(): ProjectTabElement {
        return new ProjectTabElement(this);
    }

    // On
    onOpen(): void {
        super.onOpen();
        this.project.onOpen();
    }
    onClose(): void {
        super.onClose();
        this.project.onClose();
    }
}
