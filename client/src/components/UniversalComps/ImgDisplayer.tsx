const imgPlaceholderUrl =
  "https://htmlcolorcodes.com/assets/images/colors/steel-gray-color-solid-background-1920x1080.png";

type LocalParams = {
  src: string;
  className: string;
};

function imageExists(image_url: string) {
  var http = new XMLHttpRequest();
  http.open("HEAD", image_url, false);
  http.send();
  return http.status != 404;
}

const ImgDisplayer = (params: LocalParams) => {
  const { src, className } = params;
  let actualSrc = "";
  if (imageExists(src)) actualSrc = src;
  else actualSrc = imgPlaceholderUrl;
  return <img src={actualSrc} className={className}></img>;
};

export default ImgDisplayer;
