Package.describe({
  name: 'letoribo:csv',
  summary: '',
  version: '0.0.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.1');
  api.use('mongo', ['server']);
  api.use('ecmascript', ['server']);
  api.addFiles('import-csv.js');
  api.addFiles('DENMARK.csv', 'server', {isAsset: true});
  api.export(['TblItem'], ['web.browser', 'server']);
});
