<div align="center">
<br>

<h1>vite-plugin-replace-paths</h1>

<p><sup>A Vite plugin designed to optimize build output by replacing file paths in HTML assets. This plugin scans the generated HTML, matches file paths based on configurable regex patterns, and replaces them with updated paths from the build output. It supports custom filters, verbose logging, and flexible source/output directory configurations.</sup></p>

[![npm](https://img.shields.io/npm/v/vite-plugin-replace-paths.svg?colorB=brightgreen)](https://www.npmjs.com/package/vite-plugin-replace-paths)
[![GitHub package version](https://img.shields.io/github/package-json/v/ux-ui-pro/vite-plugin-replace-paths.svg)](https://github.com/ux-ui-pro/vite-plugin-replace-paths)
[![NPM Downloads](https://img.shields.io/npm/dm/vite-plugin-replace-paths.svg?style=flat)](https://www.npmjs.org/package/vite-plugin-replace-paths)

</div>
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
<br>

&#10148; **Options**

|   Option    |    Type    |   Default    | Description                                                                                                                                       |
|:-----------:|:----------:|:------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------|
| `sourceDir` |  `string`  | `'source/'`  | Directory containing source files. Used to match paths for replacement.                                                                           |
| `outputDir` |  `string`  | `'output/'`  | Directory where the output files are generated. Paths in the HTML will be replaced with relative paths to this directory.                         |
|  `filter`   | `function` | `() => true` | A callback function to filter files based on their names. Only files that pass the filter will have their paths replaced.                         |
| `pathRegex` | `function` | `undefined`  | A function that takes the original file name and returns a custom regular expression for path matching. If not provided, a default regex is used. |
|  `verbose`  | `boolean`  |   `false`    | Enables verbose logging to provide details about which files are being processed and replaced.                                                    |

**Additional Notes:**
- **Path Matching:** The `pathRegex` option allows for custom regex patterns to match specific paths in the HTML. If not specified, a default regex based on `sourceDir` and file names will be used.
- **Filter Functionality:** Use the `filter` option to exclude or include files dynamically based on their names. This is useful for scenarios where only specific asset types or file names should be processed.
- **Verbose Mode:** Setting `verbose: true` is helpful for debugging and monitoring which paths are being replaced during the build process.

<br>

&#10148; **License**

vite-plugin-replace-paths is released under MIT license
