import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import { isEmpty } from "lodash";

export const options = {
  hAxis: {
    title: "",
  },
  vAxis: {
    title: "Arrests",
  },
  series: {
    1: { curveType: "function" },
  },
};

const Charts = ({ data }: { data: any }) => {
  useEffect(() => {}, [data]);

  return (
    <div className="bg-white flex flex-col justify-between my-6  chartPage ">
      <div className="  flex flex-col flex-1">
        <div className="mx-36 flex flex-row justify-center items-center py-4 ">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.4">
              <path
                d="M3.33366 7.33329C3.33366 10.2788 6.33366 13.3333 8.00033 13.3333C9.66699 13.3333 12.667 10.2788 12.667 7.33329C12.667 4.38777 10.5777 2.66663 8.00033 2.66663C5.423 2.66663 3.33366 4.38777 3.33366 7.33329Z"
                fill="#1463FF"
              />
            </g>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.7418 3.55453C13.4959 3.68007 13.3983 3.98123 13.5238 4.22718C13.9316 5.02612 14.167 5.98061 14.167 7.0832C14.167 7.77204 14.0311 8.47542 13.7891 9.16832C13.6981 9.42902 13.8356 9.71417 14.0963 9.80523C14.357 9.89629 14.6421 9.75877 14.7332 9.49807C15.0056 8.71803 15.167 7.90269 15.167 7.0832C15.167 5.83569 14.8999 4.7235 14.4145 3.77254C14.2889 3.52659 13.9878 3.42898 13.7418 3.55453ZM2.25884 3.55453C2.01289 3.42898 1.71173 3.52659 1.58618 3.77254C1.10076 4.7235 0.833658 5.83569 0.833658 7.0832C0.833658 7.90269 0.99501 8.71803 1.26746 9.49807C1.35852 9.75877 1.64367 9.89629 1.90437 9.80523C2.16507 9.71417 2.30259 9.42902 2.21153 9.16832C1.96951 8.47542 1.83366 7.77204 1.83366 7.0832C1.83366 5.98061 2.06904 5.02612 2.47685 4.22718C2.6024 3.98123 2.50479 3.68007 2.25884 3.55453Z"
              fill="#1463FF"
            />
            <ellipse
              cx="2"
              cy="2"
              rx="2"
              ry="2"
              transform="matrix(-1 0 0 1 10 5.33325)"
              fill="#1463FF"
            />
          </svg>
          <p className="px-2">Crime</p>{" "}
          <div className="flex flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 h-1"></div>{" "}
        </div>
        <div className=" px-6 rounded-t-md py-1 mx-36 text-left  bg-gradient-to-r from-[#E8EEFB] to-[#E7EDFA]">
          <p className="align-left text-blue-400">Burglary</p>
        </div>
        <div className=" mb-4 bg-[#eff1f2] p-8 mx-36  ">
          {!isEmpty(data) && (
            <Chart
              chartType="LineChart"
              width="100%"
              height="200px"
              className="rounded-md"
              data={data}
              options={options}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Charts;
