import fs from 'fs';

const newLine = '\n';

if (!fs.existsSync('files')) {
  fs.mkdirSync('files');
}

if (!fs.existsSync('files/capillary')) {
  fs.mkdirSync('files/capillary');
}

export const remove = path => new Promise((resolve, reject) => {
  fs.unlink(path, (err) => {
    if (err) return reject(err);
    console.log(`successfully deleted ${path}`);
    return resolve();
  });
});

export const isExist = path => new Promise((resolve) => {
  fs.open(path, 'r', (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log('file does not exists');
        return resolve(false);
      }
      console.error('Checking isFileExist error: ', err);
      return resolve(true);
    }
    return resolve(true);
  });
});

export const get = pathFile => new Promise(async (resolve, reject) => {
  fs.readdir(pathFile, 'utf8', (err, files) => {
    if (err) return reject(err);
    return resolve(files);
  });
});

export const read = pathFile => new Promise(async (resolve, reject) => {
  fs.readFile(pathFile, 'utf8', (err, data) => {
    if (err) return reject(err);
    return resolve(data);
  });
});

export const create = async (name, data, withTitle) => {
  if (!name || !data || typeof data !== 'string') {
    return;
  }
  const options = {
    encoding: 'utf8',
    flag: 'w',
  };
  let tmpData = data;
  if (!withTitle) {
    options.flag = 'a';
    tmpData = `${newLine}${tmpData}`;
  }
  await fs.writeFileSync(`files/${name}`, tmpData, options);
};

// export const remove = (name) => {
//   if (!name) {
//     return;
//   }
//
//   fs.unlink(`files/${name}`, (err) => {
//     if (err) {
//       return err;
//     }
//     return null;
//   });
// };
