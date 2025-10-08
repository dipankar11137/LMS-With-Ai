import React from 'react';

const Score = ({ result, index, user, handleRemove }) => {
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
            {result?.date}
          </td>
          <td className="border-b-[1px] border-slate-500 bg-slate-800">
            {result?.time}
          </td>
          <td className="border-b-[1px] border-slate-500 bg-slate-800">
            {result?.questions}
          </td>
          <td className="border-b-[1px] border-slate-500 bg-slate-800">
            {result?.correctAnswer}
          </td>
          <td className="border-b-[1px] border-slate-500 bg-slate-800">
            {result?.percent} %
          </td>
          {user?.email === 'abc@def.com' && (
            <td className="border-b-[1px] border-slate-500 bg-slate-800">
              <button
                onClick={() => handleRemove(result._id)}
                className="btn btn-xs btn-primary"
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
          <td className="border-b-[1px] border-slate-500">{result?.date}</td>
          <td className="border-b-[1px] border-slate-500">{result?.time}</td>
          <td className="border-b-[1px] border-slate-500">
            {result?.questions}
          </td>
          <td className="border-b-[1px] border-slate-500">
            {result?.correctAnswer}
          </td>
          <td className="border-b-[1px] border-slate-500">
            {result?.percent} %
          </td>
          {user?.email === 'abc@def.com' && (
            <td className="border-b-[1px] border-slate-500 ">
              <button
                onClick={() => handleRemove(result._id)}
                className="btn btn-xs btn-primary"
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
