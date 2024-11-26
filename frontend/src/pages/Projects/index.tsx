import { PageWrapper } from "@/components/Layout";
import { Project } from "@/types";
import { parseCssModule } from "@/utils/css";

import Navbar from "@/components/Navbar";

import styles from "./styles.module.scss";

const getClassName = parseCssModule(styles);

function Projects({ projects }: { projects: Project[] }) {
  const getProjects = () => {
    return projects.map(project => {
      return (
        <a href={project.link} key={project.id}>
          <div className={getClassName("project")}>
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
          </div>
        </a>
      );
    });
  };

  return (
    <>
      <Navbar/>

      <PageWrapper className={getClassName("projects")}>
        {getProjects()}
      </PageWrapper>
    </>
  );
}

export default Projects;
