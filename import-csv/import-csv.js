const TblItem = new Mongo.Collection('items');

if (Meteor.isServer) {
  Meteor.startup(() => {
    console.log('Importing documents');
    const csvRowSplitter = new RegExp(',(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))');

    const importCSV = () => {
      let CSV = Assets.getText('DENMARK.csv');
      CSV = CSV.replace(/(\r\n|\r|\n)/g, '\n');

      const fileData = CSV.split('\n');
      
      let header = fileData[0];
      header = header.replace(/"/g,"");
      
      fileData.shift();

      const head = header.split(csvRowSplitter);
      
      for (let [index, value] of fileData.entries()) {
        const row = value.split(csvRowSplitter);

    	  if (row.length !== 10) {
          return;
        }

        const rowAsObject = {};
        _.each(row, (n, i) => {
          const field = head[i];
          if (_.isEmpty(field)) {
            return;
          }
          rowAsObject[field] = n.replace(/"/g,"");
        });
      
        console.log(rowAsObject);
        TblItem.insert(rowAsObject);
      }
    
    };

	 importCSV();
  });
  
}