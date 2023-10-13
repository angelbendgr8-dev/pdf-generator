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
    var width = doc.internal.pageSize.getWidth() - 15;
    const headers: any = document.getElementsByClassName("header");
    const chartheader = await toPng(headers.item(0));
    doc.addImage(chartheader, "PNG", 10, 5, width ,10);
    const elements: any = document.getElementsByClassName("chartPage");
    const chartImage = await toPng(elements.item(0));
    doc.addImage(chartImage, "PNG", 10, 20, width, 200);

    const footer: any = document.getElementsByClassName("footer");
    const chartfooter = await toPng(footer.item(0));
    doc.addImage(chartfooter, "PNG", 10, doc.internal.pageSize.height - 25, width, 20);

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
