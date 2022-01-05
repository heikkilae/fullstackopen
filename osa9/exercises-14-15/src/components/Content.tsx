import { CoursePart } from "../types";

interface ContentProps {
  courseParts: Array<CoursePart>;
}

const Content = ({ courseParts }: ContentProps) => {
  // Helper function for exhaustive type checking
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  return (
    <>
      {courseParts.map((c) => {
        switch (c.type) {
          case "normal":
            return (
              <p key={c.name}>
                {c.name} {c.exerciseCount} <br />
                {c.description}
              </p>
            );
          case "groupProject":
            return (
              <p key={c.name}>
                {c.name} {c.exerciseCount} <br />
                project exercises {c.groupProjectCount}
              </p>
            );
          case "submission":
            return (
              <p key={c.name}>
                {c.name} {c.exerciseCount} <br />
                {c.description} <br />
                submit to {c.exerciseSubmissionLink}
              </p>
            );
          case "special":
            return (
              <p key={c.name}>
                {c.name} {c.exerciseCount} <br />
                {c.description} <br />
                required skills: {c.requirements.join(", ")}
              </p>
            );
          default:
            assertNever(c);
            return null;
        }
      })}
    </>
  );
};

export default Content;
