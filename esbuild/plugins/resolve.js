const { findPackagePaths, findDependencies } = require('./utils.js');

const nodeExternalsPlugin = (paramsOptions = {}) => {
  const options = Object.assign(
    Object.assign(
      {
        dependencies: true,
        devDependencies: true,
        peerDependencies: true,
        optionalDependencies: true,
        allowList: [],
      },
      paramsOptions,
    ),
    {
      packagePath:
        paramsOptions.packagePath &&
        typeof paramsOptions.packagePath === 'string'
          ? [paramsOptions.packagePath]
          : paramsOptions.packagePath,
    },
  );
  const nodeModules = findDependencies({
    packagePaths: options.packagePath
      ? options.packagePath
      : findPackagePaths(),
    dependencies: options.dependencies,
    devDependencies: options.devDependencies,
    peerDependencies: options.peerDependencies,
    optionalDependencies: options.optionalDependencies,
    allowList: options.allowList,
  });
  return {
    name: 'node-externals',
    setup(build) {
      // On every module resolved, we check if the module name should be an external
      build.onResolve({ namespace: 'file', filter: /.*/ }, args => {
        // To allow sub imports from packages we take only the first path to deduct the name
        let moduleName = args.path.split('/')[0];
        // In case of scoped package
        if (args.path.startsWith('@')) {
          const split = args.path.split('/');
          moduleName = `${split[0]}/${split[1]}`;
        }
        // Mark the module as external so it is not resolved
        if (nodeModules.includes(moduleName)) {
          return { path: args.path, external: true };
        }
        return null;
      });
    },
  };
};

module.exports = nodeExternalsPlugin;
