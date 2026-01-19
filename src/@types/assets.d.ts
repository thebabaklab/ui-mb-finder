declare module "*.jpg";
declare module "*.jpeg";
declare module "*.mp3";
declare module "*.wav";
declare module "*.png";

declare module "*.svg" {
  const value: React.ComponentType<React.SVGProps>;
  export default value;
}
