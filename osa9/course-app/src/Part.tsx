import { CoursePart, CoursePartDescription } from './types';

interface PartProps {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: PartProps) => {
  const style = { marginBottom: 10 };
  let _neverCheck: never;

  const courseNameAndExercises = () => {
    return (
      <div>
        <b>{coursePart.name} {coursePart.exerciseCount}</b>
      </div>);
  };

  const courseDescription = (part: CoursePartDescription) => {
    return (
      <div>
        <i>{part.description}</i>
      </div>
    );
  }

  switch (coursePart.type) {
    case 'normal':
      return (
        <div style={style}>
          {courseNameAndExercises()}
          {courseDescription(coursePart)}
        </div >
      );
    case 'groupProject':
      return (
        <div style={style}>
          {courseNameAndExercises()}
          <div>
            project exercises {coursePart.groupProjectCount}
          </div>
        </div>
      );
    case 'submission':
      return (
        <div style={style}>
          {courseNameAndExercises()}
          {courseDescription(coursePart)}
          <div>
            submit to {coursePart.exerciseSubmissionLink}
          </div>
        </div>
      );
    case 'special':
      return (
        <div style={style}>
          {courseNameAndExercises()}
          {courseDescription(coursePart)}
          <div>
            required skills: {coursePart.requirements.join(', ')}
          </div>
        </div>
      );
    default:
      _neverCheck = coursePart;
      throw new Error(`Unhandled case: ${JSON.stringify(_neverCheck)}`)
  }
};

export default Part;
