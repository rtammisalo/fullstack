import { CoursePart } from './types';

interface ContentProps {
  courseParts: Array<CoursePart>;
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map(part =>
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      )}
    </div>
  );
};

export default Content;
