<div align="center">
<br>

<h1>vite-plugin-replace-paths</h1>

<p><sup>A Vite plugin designed to optimize build output by replacing file paths in HTML assets. This plugin scans the generated HTML, matches file paths based on configurable regex patterns, and replaces them with updated paths from the build output. It supports custom filters, verbose logging, and flexible source/output directory configurations.</sup></p>

[![npm](https://img.shields.io/npm/v/vite-plugin-replace-paths.svg?colorB=brightgreen)](https://www.npmjs.com/package/vite-plugin-replace-paths)
[![GitHub package version](https://img.shields.io/github/package-json/v/ux-ui-pro/vite-plugin-replace-paths.svg)](https://github.com/ux-ui-pro/vite-plugin-replace-paths)
[![NPM Downloads](https://img.shields.io/npm/dm/vite-plugin-replace-paths.svg?style=flat)](https://www.npmjs.org/package/vite-plugin-replace-paths)

</div>
<br>

&#10148; **How Does the Plugin Work?**

**vite-plugin-replace-paths** is a Vite build plugin that automatically updates resource paths (e.g., images) in compiled HTML files. This is especially useful when files from the source directory (`sourceDir`) are moved to the output directory (`outputDir`) and renamed (e.g., with added hashes).

After the build process, the plugin will find and replace all paths in HTML files. For example:

Before Build:
```html
<img src="/src/assets/images/jpg/bg_1024w.jpg" alt="Background">
<img src="/src/assets/images/jpg/bg_1280w.jpg" alt="Background">
```

After Build:
```html
<img src="/dist/assets/bg_1024w-CcF7drgT.jpg" alt="Background">
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
      sourceDir: '/src/assets/',
      outputDir: 'assets/',
      verbose: true,
    }),
  ],
});
```

If you're working in development mode (process.env.NODE_ENV === 'development'), it is recommended to include the following snippet in your main.ts file:

```javascript
if (process.env.NODE_ENV === 'development') {
  const images = import.meta.glob('./assets/images/**/*.{jpg,webp,avif,svg,png}', { eager: true });

  Object.entries(images).forEach(([path, module]) => {
    console.log('Image processed:', path, module);
  });
}
```

This snippet ensures that all image files from the specified directory (`./assets/images/`) are preloaded during development. By using `import.meta.glob` with the `eager: true` option.

Customization: Adjust the import.meta.glob pattern to match the directory and file types specific to your project.

Production Mode: This snippet is only executed in development mode and does not affect the production build, ensuring minimal performance overhead.

<br>

&#10148; **Options**

|   Option    |    Type    |   Default    | Description                                                                                                                                       |
|:-----------:|:----------:|:------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------|
| `sourceDir` |  `string`  | `'source/'`  | Directory containing source files. Used to match paths for replacement.                                                                           |
| `outputDir` |  `string`  | `'output/'`  | Directory where the output files are generated. Paths in the HTML will be replaced with relative paths to this directory.                         |
|  `filter`   | `function` | `() => true` | A callback function to filter files based on their names. Only files that pass the filter will have their paths replaced.                         |
| `pathRegex` | `function` | `undefined`  | A function that takes the original file name and returns a custom regular expression for path matching. If not provided, a default regex is used. |
|  `verbose`  | `boolean`  |   `false`    | Enables verbose logging to provide details about which files are being processed and replaced.                                                    |
<br>

**Additional Notes:**
- **Path Matching:** The `pathRegex` option allows for custom regex patterns to match specific paths in the HTML. If not specified, a default regex based on `sourceDir` and file names will be used.
- **Filter Functionality:** Use the `filter` option to exclude or include files dynamically based on their names. This is useful for scenarios where only specific asset types or file names should be processed.
- **Verbose Mode:** Setting `verbose: true` is helpful for debugging and monitoring which paths are being replaced during the build process.

<br>

&#10148; **License**

vite-plugin-replace-paths is released under MIT license
