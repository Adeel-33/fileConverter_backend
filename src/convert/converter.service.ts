import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import path from 'path';
import { execFile } from 'child_process';
import { Response } from 'express';

@Injectable()
export class ConverterService {
  async ConvertFile(file: Express.Multer.File,res: Response) {
    const maxSize = 2 * 1024 * 1024; //2MB
    if (!file) {
      return res.status(400).json({
        message: 'please upload the file ',
      });
    }
    if (
      file.mimetype !== 'application/pdf' &&
      file.mimetype !==
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      return res.status(400).json({
        message: 'file type is not supported',
      });
    }
    if (file.size >= maxSize) {
      return res.status(400).json({
        message: 'file size is too large',
      });
    }
    const filePath = path.join(process.cwd(), 'temp', "input.pdf");
    await writeFile(filePath, file.buffer);

   await new Promise((resolve, reject) => {
  execFile('py', ['src/convert_pdf.py'], (error, stdout, stderr) => {
    if (error) {
      reject(error);
      return;
    }

    console.log('Python output:', stdout);
    console.error('Python warning:', stderr);

    resolve(true);
  });
});
   
    return res.download(path.join(process.cwd(), 'temp', "output.docx"));
  }
}
