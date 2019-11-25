import * as fs from 'fs';

export function isDirCreated(path: string): boolean {
  return fs.existsSync(path);
}

export function createDir(path: string) {
  if (isDirCreated(path)) {
    fs.mkdir(path, { recursive: true }, err => {
      console.log('Directory created!');
      if (err) {
        console.log(`Couldn't create directory...`);
        throw err;
      }
    });
  } else {
    console.log(`Directory already exists!`);
  }
}
export function moveFile(sourcePath: string, destPath: string) {
  const source = fs.createReadStream(sourcePath);
  const dest = fs.createWriteStream(destPath);
  source.pipe(dest);
  source.on('end', function() {
    /* copied */
    console.log('Copied');
  });
  source.on('error', function(err) {
    /* error */ console.log('Error while copying!');
  });
}


export function parseFormData(data: any){
  return JSON.parse(JSON.stringify(data))
}
