import cardStyles from "@/app/(styles)/card.module.scss";

export default function PositionProject({ currentPosition, editPosition }) {
  return (
    <>
      <div>
        <h4 className="column-name">PROJECT NAME</h4>
        <input
          type="text"
          placeholder="Project name"
          value={currentPosition?.projectName || ""}
          id="projectName"
          onChange={(e) => editPosition({ projectName: e.target.value })}
        />
      </div>
      <div className={cardStyles.position_technology_stack}>
        <h2 className="my-1">Technology Stack: </h2>
        <textarea
          placeholder="Technology Stack"
          value={currentPosition?.technologyStack || ""}
          id="technologyStack"
          onChange={(e) => editPosition({ technologyStack: e.target.value })}
        ></textarea>
      </div>
      <div className={cardStyles.position_description}>
        <h2 className="my-1">Description: </h2>
        <textarea
          placeholder="Description"
          value={currentPosition?.description || ""}
          id="description"
          onChange={(e) => editPosition({ description: e.target.value })}
        ></textarea>
      </div>
    </>
  );
}
