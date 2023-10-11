import { useEffect, useState } from "react";
import "./App.css";
import Charts from "./Chart";
import { useFetch } from "usehooks-ts";
import { union } from "lodash";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import moment from "moment";

const assetUrl =
  "https://api.usa.gov/crime/fbi/cde/arrest/state/AK/all?from=2015&to=2020&API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv";

function App() {
  const { data: apiData } = useFetch<any>(assetUrl);
  const [newdata, setNewdata] = useState<any>([]);
  useEffect(() => {
    console.log(apiData);
    const graphData = apiData?.data.map((offence: any) => {
      const { data_year, Burglary } = offence;
      return [data_year, Burglary];
    });

    const data = union([["x", ""]], graphData);
    console.log(data);
    setNewdata(data);
  }, [apiData]);

  const generate = async () => {
    const doc = new jsPDF("p", "px");

    doc.setTextColor(40);
    doc.setFontSize(8);
    doc.addSvgAsImage(
      `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.46711 1.16181C8.46711 1.80345 7.94579 2.32363 7.30273 2.32363H3.39419C2.86535 2.32363 2.43671 2.75139 2.43671 3.279V8.69844C2.43671 9.36985 1.89125 9.91411 1.21836 9.91411C0.545461 9.91411 0 9.36985 0 8.69844V2.90553C0 1.30083 1.3037 0 2.91193 0H7.30267C7.94572 0 8.46711 0.520174 8.46711 1.16181Z" fill="#1463FF"/>
<path d="M15.0207 5.92453V15.5702C15.0207 15.8748 14.7117 16.0826 14.4287 15.9683L11.0528 14.6048C10.9274 14.5652 10.7968 14.5451 10.6653 14.5451H6.13365C5.42449 14.5451 4.84961 13.9715 4.84961 13.2639V5.92453C4.84961 5.21692 5.42449 4.64331 6.13365 4.64331H13.7366C14.4458 4.64331 15.0207 5.21692 15.0207 5.92453Z" fill="#1463FF"/>
</svg>`,
      5,
      16,
      7,
      7,
      "logo",
      false
    );
    doc.setFont("arial", "normal", "bold");
    doc.text("RealAssist.Ai", 15, 22);
    doc.setFont("poppins", "normal", "bold");
    doc.text(
      "123 Main Street, Dover, NH 03820-4667",
      doc.internal.pageSize.width - 120,
      22
    );
    doc.setDrawColor(20, 196, 255);
    doc.setLineWidth(2);
    doc.line(5, 25, doc.internal.pageSize.width - 10, 25);

    const elements: any = document.getElementsByClassName("chartPage");
    const chartImage = await toPng(elements.item(0));
    doc.addImage(chartImage, "PNG", 10, 20, 400, 200);
    doc.setLineWidth(2);
    doc.line(
      5,
      doc.internal.pageSize.height - 15,
      doc.internal.pageSize.width - 10,
      doc.internal.pageSize.height - 15
    );
    doc.setTextColor("#1463FF");
    doc.setFontSize(8);
    doc.text(
      `Report Generated on ${moment().format("MMMM DD, yyyy")}`,
      10,
      doc.internal.pageSize.height - 7
    );

    doc.setTextColor("#000000");
    doc.text(
      "RealAssistProperty Report | Page 1 of 1",
      doc.internal.pageSize.width - 120,
      doc.internal.pageSize.height - 7
    );
    doc.save(`crimechart.pdf`); // (6)
  };

  useEffect(() => {}, [newdata]);

  return (
    <>
      <div className="card">
        <button onClick={() => generate()}>Print Pdf</button>
      </div>
      <div>
        <Charts data={newdata} />
      </div>
    </>
  );
}

export default App;
