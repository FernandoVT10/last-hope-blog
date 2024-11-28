import { useContext, useState } from "react";
import { PageWrapper } from "@/components/Layout";
import { Project } from "@/types";
import { parseCssModule } from "@/utils/css";
import { useModal, UseModalReturn } from "@/components/Modal";
import { GlobalContext } from "@/contexts";

import Navbar from "@/components/Navbar";
import Notifications from "@/Notifications";
import ConfirmationModal from "@/components/ConfirmationModal";
import api from "@/api";

import styles from "./styles.module.scss";

const getClassName = parseCssModule(styles);

type DeleteProjectModalProps = {
  modal: UseModalReturn;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  projectId: number | null;
};

function DeleteProjectModal(props: DeleteProjectModalProps) {
  const [loading, setLoading] = useState(false);

  const deleteProject = async () => {
    if(!props.projectId) return;

    setLoading(true);

    const notificationId = Notifications.loading("Deleting project...");
    try {
      await api.deleteProject(props.projectId);

      props.setProjects(
        projects => projects.filter(p => p.id !== props.projectId)
      );
      props.modal.hide();
      Notifications.success("Project deleted successfully!");
    } catch(e) {
      console.error(e);
      Notifications.error("There was an error trying to delete the project");
    }
    Notifications.remove(notificationId);

    setLoading(false);
  };

  return (
    <ConfirmationModal
      modal={props.modal}
      loading={loading}
      onConfirmation={deleteProject}
      deleteBtnText="Delete Project"
      modalTitle="Delete Project Confirmation"
    />
  );
}

function Projects({ projects: initialProjects }: { projects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);
  const deleteModal = useModal();

  const globalContext = useContext(GlobalContext);

  const showDeleteModal = (projectId: number) => {
    setProjectToDelete(projectId);
    deleteModal.show();
  };

  const getProjects = () => {
    if(!projects.length) {
      return (
        <h2 className={getClassName("no-projects-text")}>
          There is no projects to show
        </h2>
      );
    }

    return projects.map(project => {
      const getOptions = () => {
        if(!globalContext.isAuthenticated) return null;

        return (
          <div className={getClassName("options")}>
            <a href={`/projects/${project.id}/edit`}>
              <button
                type="button"
                className={getClassName("option")}
              >
                Edit
              </button>
            </a>

            <button
              type="button"
              className={getClassName("option")}
              onClick={() => showDeleteModal(project.id)}
            >
              Delete
            </button>
          </div>
        );
      };

      return (
        <div className={getClassName("project")} key={project.id}>
          <a href={project.link}>
            <div className={getClassName("cover-container")}>
              <img
                src={project.cover}
                alt="Project Cover"
                className={getClassName("cover")}
              />

              <span className={getClassName("name")}>
                {project.name}
              </span>
            </div>

            <div className={getClassName("description-container")}>
              <p className={getClassName("description")}>
                {project.description}
              </p>
            </div>
          </a>

          {getOptions()}
        </div>
      );
    });
  };

  return (
    <>
      <Navbar/>

      <DeleteProjectModal
        modal={deleteModal}
        setProjects={setProjects}
        projectId={projectToDelete}
      />

      <PageWrapper className={getClassName("projects")}>
        {getProjects()}
      </PageWrapper>
    </>
  );
}

export default Projects;
