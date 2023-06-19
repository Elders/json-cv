import parseReferences from "./parseReferences.mjs";

const migrations = [migrateV0];

export default function getMigratedCV(cv, targetSchema) {
  const migrationRange = migrations.slice(0, targetSchema);

  function migrate(cv, migrations) {
    cv = migrations[cv.schema](cv);

    return migrate(cv, migrations);
  }

  try {
    cv = migrate(cv, migrationRange);
  } catch {}

  return cv;
}

function migrateV0(cv) {
  cv.schema = 1;

  if (cv.positions?.length) {
    cv.positions = cv.positions.map((position) => {
      if (!position.projects.length) return position;
      position.projects = position.projects.map((project) => {
        project.references = parseReferences(
          project.references,
          project.referencesLabels
        );

        delete project.referencesLabels;
        return project;
      });

      return position;
    });
  }

  if (!cv.projects?.length) return cv;

  cv.projects = cv.projects.map((project) => {
    const parsedProject = {
      ...project,
      references: parseReferences(project.references, project.labels),
    };

    delete parsedProject.labels;

    return parsedProject;
  });

  return cv;
}
