const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const fromPath = (name) => path.join(__dirname, `../packages/${name}/dist`);
const toPath = (name) => path.join(__dirname, `../dist/${name}`);

const targetMap = {
  editor: {
    from: fromPath('editor'),
    to: toPath('editor'),
  },
  template: {
    from: fromPath('template'),
    to: toPath('template'),
  },
  server: {
    from: fromPath('server'),
    to: toPath('server'),
  },
  serverDep: {
    from: path.join(__dirname, '../packages/server/node_modules'),
    to: path.join(__dirname, '../dist/server/node_modules'),
  },
};

class Core {
  constructor() {
    process.env.ENV = 'prod';
  }

  #build(name) {
    console.log(`正在执行 [${name}] 构建`);
    execSync(`pnpm run ${name}`);
    console.log(`[${name}] 构建完成`);
  }

  #clear() {
    fs.removeSync(path.join(__dirname, '../dist'), { force: true });
  }

  #copy() {
    Object.keys(targetMap).forEach((key) => {
      fs.copySync(targetMap[key].from, targetMap[key].to);
    });
  }

  build(name) {
    this.#clear();

    Array.isArray(name) ? name.forEach(this.#build) : this.#build(name);

    this.#copy();

    return this;
  }
}

const bundle = new Core();

bundle.build(['build:front', 'server:build']);
