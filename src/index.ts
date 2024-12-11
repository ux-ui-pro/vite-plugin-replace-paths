import type { Plugin as RollupPlugin } from 'rollup';
import type { RollupOutput, OutputAsset } from 'rollup';
import * as path from 'path';

interface VitePlugin extends RollupPlugin {
  enforce?: 'pre' | 'post';
}

interface ReplacePathsPluginOptions {
  sourceDir?: string;
  outputDir?: string;
  filter?: (fileName: string) => boolean;
  pathRegex?: (originalFileName: string) => RegExp;
  verbose?: boolean;
}

class ReplacePathsPlugin {
  private readonly sourceDir: string;
  private readonly outputDir: string;
  private readonly filter: (fileName: string) => boolean;
  private readonly pathRegex?: (originalFileName: string) => RegExp;
  private readonly verbose: boolean;

  constructor(options: ReplacePathsPluginOptions = {}) {
    this.sourceDir = options.sourceDir || 'source/';
    this.outputDir = options.outputDir || 'output/';
    this.filter = options.filter || (() => true);
    this.pathRegex = options.pathRegex;
    this.verbose = options.verbose || false;
  }

  public apply(): VitePlugin {
    return {
      name: 'replace-paths-plugin',
      enforce: 'post',
      generateBundle: this.generateBundle.bind(this),
    };
  }

  private async generateBundle(_: unknown, bundle: RollupOutput): Promise<void> {
    const htmlFile = Object.keys(bundle).find((fileName) => fileName.endsWith('.html'));

    if (!htmlFile) return;

    const asset = bundle[htmlFile];

    if (!this.isAsset(asset) || typeof asset.source !== 'string') return;

    let htmlContent = asset.source;

    for (const [_, fileData] of Object.entries(bundle)) {
      if (this.isAsset(fileData) && fileData.fileName.startsWith(this.outputDir) && this.filter(fileData.fileName)) {
        const originalFileName = path.basename(fileData.name || '');
        const escapedFileName = this.escapeRegExp(originalFileName);

        const regex = this.pathRegex
            ? this.pathRegex(originalFileName)
            : new RegExp(`${this.escapeRegExp(this.sourceDir)}[^"']*${escapedFileName}`, 'g');

        if (this.verbose) {
          console.log(`Replacing paths for file: ${originalFileName}`);
        }

        htmlContent = htmlContent.replace(regex, `/${fileData.fileName}`);
      }
    }

    asset.source = htmlContent;
  }

  private isAsset(fileData: unknown): fileData is OutputAsset {
    return (
        typeof fileData === 'object' &&
        fileData !== null &&
        'type' in fileData &&
        (fileData as OutputAsset).type === 'asset'
    );
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  }
}

export function replacePathsPlugin(options: ReplacePathsPluginOptions = {}): VitePlugin {
  const pluginInstance = new ReplacePathsPlugin(options);

  return pluginInstance.apply();
}
