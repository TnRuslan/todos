import axios from 'axios';

export type IFile = {
  file: string;
  size: number;
};

class FileService {
  uploadFile(
    file: FormData,
    progress: HTMLProgressElement | null,
    onUploadDone?: () => void,
  ) {
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (e: ProgressEvent) => {
      const size = Math.floor((e.loaded / e.total) * 100);
      console.log(size, '%');
      progress.value = size;
      progress.hidden = false;
    };
    xhr.upload.onload = () => {
      console.log('load done');
      progress.value = 0;
      progress.hidden = true;
      onUploadDone?.();
    };
    xhr.open('POST', `${process.env.SERVER_URL}/upload`);

    xhr.send(file);
  }

  async getFileList(): Promise<IFile[]> {
    const { data } = await axios.get(`${process.env.SERVER_URL}/files`);
    return data.files;
  }

  async downloadFile(href: string, progress: HTMLProgressElement | null) {
    const res = await fetch(href);

    let charsReceived = 0;

    const contentLength = Number(res.headers.get('content-length'));

    const chunks: Array<Uint8Array<ArrayBufferLike>> = [];

    progress.hidden = false;
    progress.value = 0;
    const reader = res.body.getReader();

    reader.read().then(function processFile({ done, value }) {
      if (done) {
        progress.hidden = true;
        progress.value = 0;
        console.log('Stream completed');

        const blobObj = new Blob(chunks);

        download(blobObj, href.split('/').at(-1));
        return;
      }

      chunks.push(value);
      charsReceived += value.length;

      progress.value = Math.floor((charsReceived / contentLength) * 100);
      return reader.read().then(processFile);
    });

    function download(blob: Blob, href: string) {
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');

      a.href = url;
      a.download = href;
      a.click();

      a.remove();
    }
  }

  // MAke these as class methods

  // private download(blob: Blob, href: string) {
  //   const url = URL.createObjectURL(blob);

  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = href;
  //   a.click();

  //   a.remove();
  // }

  // private processFile() {}
}

export default new FileService();
