import { useParams } from "react-router-dom";

const ShowQuestion = () => {
  const { id } = useParams();
  return (
    <div className="mt-20">
      <h1>Dado {id}</h1>
    </div>
  );
};

export default ShowQuestion;