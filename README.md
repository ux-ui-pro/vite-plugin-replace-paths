<div align="center">
<br>

<h1>vite-plugin-replace-paths</h1>

<p><sup>A Vite plugin designed to replace file paths in HTML assets. This plugin scans the generated HTML, identifies file paths, and replaces them with updated paths from the build output.</sup></p>

[![npm](https://img.shields.io/npm/v/vite-plugin-replace-paths.svg?colorB=brightgreen)](https://www.npmjs.com/package/vite-plugin-replace-paths)
[![GitHub package version](https://img.shields.io/github/package-json/v/ux-ui-pro/vite-plugin-replace-paths.svg)](https://github.com/ux-ui-pro/vite-plugin-replace-paths)
[![NPM Downloads](https://img.shields.io/npm/dm/vite-plugin-replace-paths.svg?style=flat)](https://www.npmjs.org/package/vite-plugin-replace-paths)

</div>
<br>

&#10148; **How Does the Plugin Work?**

For example, after PUG files have been converted to HTML by other plugins, vite-plugin-replace-paths finds and updates all resource paths during the build process, ensuring the application functions correctly.

Before Build:
```html
<img src="/src/assets/images/jpg/bg_1280w.jpg" alt="Background">
```

After Build:
```html
<img src="/dist/assets/bg_1280w-B89I5yDh.jpg" alt="Background">
```
<br>

&#10148; **Install**
```console
$ yarn add vite-plugin-replace-paths
```
<br>

&#10148; **Usage**
```javascript
import { replacePathsPlugin } from 'vite-plugin-replace-paths';

export default defineConfig({
  plugins: [
    replacePathsPlugin({
      verbose: true,
    }),
  ],
});
```

This snippet ensures that all image files are preloaded during development by utilizing import.meta.glob with the eager: true option. You can customize the pattern in import.meta.glob to match the specific directory and file types relevant to your project. Note that this snippet is executed only in development mode.
```javascript
// main.ts
if (process.env.NODE_ENV === 'development') {
  const images = import.meta.glob('./assets/images/**/*.{jpg,webp,avif,svg,png}', { eager: true });

  Object.entries(images).forEach(([path, module]) => {
    console.log('Image processed:', path, module);
  });
}
```
<br>

&#10148; **Options**

|   Option    |    Type    |   Default    | Description                                                                                                                                       |
|:-----------:|:----------:|:------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------|
|  `verbose`  | `boolean`  |   `false`    | Enables verbose logging to provide details about which files are being processed and replaced.                                                    |
<br>

&#10148; **License**

vite-plugin-replace-paths is released under MIT license
