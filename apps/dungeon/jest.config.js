module.exports = {
  name: 'dungeon',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/dungeon',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
