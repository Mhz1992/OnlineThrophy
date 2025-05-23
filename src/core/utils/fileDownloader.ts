const fileDownloader = (url: string): void => {
    const aTag = document.createElement('a');
    aTag.href = url;
    aTag.target = '_blank';
    document.body.append(aTag);
    aTag.click();
    document.body.removeChild(aTag);
};
export default fileDownloader;
