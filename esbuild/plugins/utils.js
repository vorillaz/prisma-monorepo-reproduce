const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const isInDirectory = (parent, child) => {
  const relativePath = path.relative(parent, child);
  return !relativePath.startsWith('..') && !path.isAbsolute(relativePath);
};

const isInGitDirectory = (path, gitRootPath) => {
  return gitRootPath === undefined || isInDirectory(gitRootPath, path);
};

const log = (...message) => {
  console.log(chalk.magenta('build') + ' -', ...message);
};

const err = (...message) => {
  console.error(chalk.red('Proxima') + ' -', ...message);
};

/**
 * Iterates over package.json file paths recursively found in parent directories, starting from the
 * current working directory. If the current working directory is in a git repository, then package.json
 * files outside of the git repository will not be yielded.
 * Inspired by https://github.com/Septh/rollup-plugin-node-externals/blob/f13ee95c6f1f01d8ba2276bf491aac399adc5482/src/dependencies.ts#L18
 */
const findPackagePaths = async () => {
  const findUp = await import('find-up');
  // Find git root if in git repository
  const gitDirectoryPath = findUp.sync('.git', {
    type: 'directory',
  });

  const gitRootPath =
    gitDirectoryPath === undefined ? undefined : path.dirname(gitDirectoryPath);
  let cwd = process.cwd();
  let packagePath;
  const packagePaths = [];
  while (
    (packagePath = findUp.sync('package.json', { type: 'file', cwd })) &&
    isInGitDirectory(packagePath, gitRootPath)
  ) {
    packagePaths.push(packagePath);
    cwd = path.dirname(path.dirname(packagePath));
  }
  return packagePaths;
};
/**
 * Return an array of the package.json dependencies that should be excluded from the build.
 */
const findDependencies = options => {
  const packageJsonKeys = [
    options.dependencies && 'dependencies',
    options.devDependencies && 'devDependencies',
    options.peerDependencies && 'peerDependencies',
    options.optionalDependencies && 'optionalDependencies',
  ].filter(Boolean);
  const data = options.packagePaths.map(packagePath => {
    let packageJson;
    try {
      const packageJsonString = fs.readFileSync(packagePath, 'utf8');
      packageJson = JSON.parse(packageJsonString);
    } catch (error) {
      console.error(error);
      throw new Error(
        `Couldn't process ${packagePath}". Make sure it's a valid JSON.`,
      );
    }
    return packageJsonKeys
      .map(key => (packageJson[key] ? Object.keys(packageJson[key]) : []))
      .flat(1)
      .filter(packageName => !options.allowList.includes(packageName));
  });
  return data.flat(1);
};

module.exports = {
  findDependencies,
  findPackagePaths,
  log,
  err,
};
