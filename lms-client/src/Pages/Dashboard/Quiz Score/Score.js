

const Score = ({
  result,
  index,
  user,
  handleRemove,
  handleQuestion,
  handleCheck,
  handleMarksChange,
  marks,
}) => {
  return (
    <>
      {index === 1 ? (
        <tr className="border-[1px] border-slate-500  text-green-300 first-letter:00 font-semibold">
          <th className="border-b-[1px] border-slate-500 bg-slate-800">
            {index}
          </th>
          <td className="border-b-[1px] border-slate-500 bg-slate-800">
            {result?.name}
          </td>
          <td className="border-b-[1px] border-slate-500 bg-slate-800">
            {result?.totalQuestionMark}
          </td>
          <td className="border-b-[1px] border-slate-500 bg-slate-800">
            {/* {result?.totalMarks} */}
            <div className="flex items-center gap-2">
              <span>{result.questionTitle}</span>
              <input
                type="number"
                value={marks}
                min={0}
                max={result.maxMarks}
                onChange={handleMarksChange}
                className="border p-1 w-16 text-center"
              />
              <span> / {result.maxMarks}</span>
            </div>
          </td>

          <td className="border-b-[1px] border-slate-500 bg-slate-800">
            {result?.totalMarks
              ? ((result.totalMarks / result.totalQuestionMark) * 100).toFixed(
                  2
                )
              : 0}{' '}
            %
          </td>
          <td className="border-b-[1px] border-slate-500 bg-slate-800">
            <button
              onClick={() => handleQuestion(result._id)}
              className="btn btn-xs btn-primary"
            >
              Question
            </button>
          </td>
          <td className="border-b-[1px] border-slate-500 bg-slate-800">
            <button
              onClick={() => handleCheck(result._id)}
              className="btn btn-xs btn-secondary"
            >
              Done
            </button>
          </td>
          {user?.email === 'abc@def.com' && (
            <td className="border-b-[1px] border-slate-500 bg-slate-800">
              <button
                onClick={() => handleRemove(result._id)}
                className="btn btn-xs btn-accent"
              >
                Remove
              </button>
            </td>
          )}
        </tr>
      ) : (
        <tr className="border-[1px] border-slate-500  text-slate-800">
          <th className="border-b-[1px] border-slate-500">{index}</th>
          <td className="border-b-[1px] border-slate-500">{result?.name}</td>
          <td className="border-b-[1px] border-slate-500">
            {result?.totalQuestionMark}
          </td>
          <td className="border-b-[1px] border-slate-500">
            {result?.totalMarks}
          </td>

          <td className="border-b-[1px] border-slate-500">
            {result?.totalMarks
              ? ((result.totalMarks / result.totalQuestionMark) * 100).toFixed(
                  2
                )
              : 0}{' '}
            %
          </td>
          <td className="border-b-[1px] border-slate-500 ">
            <button
              onClick={() => handleQuestion(result._id)}
              className="btn btn-xs btn-primary"
            >
              Question
            </button>
          </td>
          <td className="border-b-[1px] border-slate-500 ">
            <button
              onClick={() => handleCheck(result._id)}
              className="btn btn-xs btn-secondary"
            >
              Done
            </button>
          </td>
          {user?.email === 'abc@def.com' && (
            <td className="border-b-[1px] border-slate-500 ">
              <button
                onClick={() => handleRemove(result._id)}
                className="btn btn-xs btn-accent"
              >
                Remove
              </button>
            </td>
          )}
        </tr>
      )}
    </>
  );
};

export default Score;
