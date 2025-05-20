// import.meta.glob의 반환 타입에 대한 타입
type ImageModules = Record<string, { default: string } | string>;


const modules: ImageModules = import.meta.glob('../assets/*.{png,jpeg,jpg,svg,gif}', { eager: true });

const images: Record<string, string> = {}; // 파일 이름을 키로, 이미지 URL 문자열을 값으로 가지는 객체

for (const path in modules) {
  const fileNameWithExtension = path.split('/').pop(); // '../assets/logo.png' -> 'logo.png'
  if (!fileNameWithExtension) continue; // 파일 이름이 없으면 건너뛰기

  const imageName = fileNameWithExtension.split('.')[0]; // 'logo.png' -> 'logo'

  const module = modules[path];

  // 가져온 모듈에서 이미지 URL을 추출해서 객체에 담아
  // 모듈의 형태에 따라 .default 속성이 있거나, 모듈 자체가 URL 문자열
  if (typeof module === 'object' && module && 'default' in module && typeof module.default === 'string') {
     images[imageName] = module.default;
  } else if (typeof module === 'string') {
     images[imageName] = module;
  }

}

export default images;
