function getMimeType(fileName: string) {
  const extension = fileName?.split('.')?.pop()?.toLowerCase();
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
  }
}

export {getMimeType};
