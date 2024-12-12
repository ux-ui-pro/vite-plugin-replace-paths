import type { Plugin as RollupPlugin, RollupOutput, OutputAsset } from 'rollup';
import * as path from 'path';

interface VitePlugin extends RollupPlugin {
  enforce?: 'pre' | 'post';
}

interface ReplacePathsPluginOptions {
  verbose?: boolean;
}

class ReplacePathsPlugin {
  private readonly verbose: boolean;

  constructor(options: ReplacePathsPluginOptions = {}) {
    this.verbose = options.verbose || false;
  }

  public apply(): VitePlugin {
    return {
      name: 'replace-paths-plugin',
      enforce: 'post',
      generateBundle: this.generateBundle.bind(this),
    };
  }

  private generateBundle(_: unknown, bundle: RollupOutput): void {
    const htmlFile = Object.keys(bundle).find((fileName) => fileName.endsWith('.html'));

    if (!htmlFile) return;

    const asset = bundle[htmlFile];

    if (!this.isAsset(asset) || typeof asset.source !== 'string') return;

    let htmlContent = asset.source;

    for (const [_, fileData] of Object.entries(bundle)) {
      if (this.isAsset(fileData) && this.isOutputFile(fileData)) {
        const originalFileName = path.basename(fileData.name || '');
        const escapedFileName = this.escapeRegExp(originalFileName);

        const regex = new RegExp(`[^"']*${escapedFileName}`, 'g');

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

  private isOutputFile(fileData: OutputAsset): boolean {
    return fileData.fileName.startsWith('assets/');
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  }
}

export function replacePathsPlugin(options: ReplacePathsPluginOptions = {}): VitePlugin {
  const pluginInstance = new ReplacePathsPlugin(options);

  return pluginInstance.apply();
}
