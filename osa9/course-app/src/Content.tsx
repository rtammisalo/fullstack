import { CoursePart } from './types';
import Part from './Part';

interface ContentProps {
  courseParts: Array<CoursePart>;
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map(part => <Part key={part.name} coursePart={part} />)}
    </div>
  );
};

export default Content;
