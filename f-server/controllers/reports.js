import OverallStat from "../models/OverallStat.js";

import htmlToPdf from "html-pdf-node"
import  ejs from "ejs"

import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const getDemo = async (req, res) => {
  try {
    
    const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('__filename>>',__filename);
console.log('__dirname>>',__dirname);
console.log("Current directory:", __dirname);

// let table_filePath = path.resolve(path.dirname(''),'./reports/templates/table.html.ejs')
// let layout_filePath = path.resolve(path.dirname(''),'./reports/templates/layout.html.ejs')

    const tableHtml = await ejs.renderFile(__dirname+'/reports/templates/table.html.ejs',
        { rows: [{"id":1,"first_name":"AAA","last_name":"BBB"}] },
        { async: true }
      );

      const html = await ejs.renderFile(__dirname+'/reports/templates/layout.html.ejs',
        { body: tableHtml },
        { async: true }
      );

      let options = {
        format: "A4",
        margin: { top: 15, left: 10, right: 10, bottom: 15 },
      };
      let file = { content: html };
      htmlToPdf
        .generatePdf(file, options)
        .then((pdfBuffer) => {
          res
            .writeHead(200, {
              "Content-Type": "application/pdf",
              "Content-Disposition": "attachment",
            })
            .end(pdfBuffer);
        })
        .catch((err) => {
          res.send({ success: false, error: err });
        });

    // const overallStats = await OverallStat.find();
    // res.status(200).json(overallStats[0]);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};