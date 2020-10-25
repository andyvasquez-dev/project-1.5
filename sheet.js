const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = class Sheet {
   constructor(){
    // spreadsheet key is the long id in the URL when in sheets
   // from the d/copy this long string/edit for the arg in google spreadsheet
   // following line makes it an internal variable after the class has been created ==> with this.
   this.doc = new GoogleSpreadsheet('13_VK5Ol6W9762CucflFj8_qes44VHOu900GlZ6YXIGM');

   }
   async load(){
      // OR load directly from json file if not in secure environment
      await this.doc.useServiceAccountAuth(require('./credentials.json'));
      await this.doc.loadInfo(); // loads document properties and worksheets
   }
   async addRows(rows){
         // ************ targets the first sheet in excel, then we are adding rows/data to google sheets **********************
         const sheet = this.doc.sheetsByIndex[0]; // or use doc.sheetsById[id]

         // ******************* adds rows to the declared sheet above, and if the row had been declared in terms of column title, or key
         await sheet.addRows(rows);
   }
   async getRows(){
      const sheet = this.doc.sheetsByIndex[0];
      return await sheet.getRows() // can pass in a limit or and or offset
   }
}

// *******************     IFFY TO TEST ***********************
// (async function(){
//    const sheet = new Sheet();
//    await sheet.load()
//    await sheet.addRows([
//       { title: 'Software Engineer', location: 'New York' },
//       { title: 'Designer', location: 'Boston' },
//    ])
// })()
