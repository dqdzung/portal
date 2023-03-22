/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly NODE_ENV: "development" | "production";
	readonly VITE_PORT: number;
	readonly VITE_APP_URL: string;
	readonly VITE_PUBLIC_KEY: string;
}
interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare module "*.svg" {
	import React = require("react");

	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}
