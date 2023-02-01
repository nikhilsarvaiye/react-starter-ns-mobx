import path from "path";
import {CracoConfig} from '@craco/types'
const CracoAlias = require('craco-alias');

const a = <CracoConfig>{
    webpack: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
        },
    },
    eslint: {
        enable: true,
    },
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                debug: false,
                source: 'tsconfig',
                // baseUrl SHOULD be specified
                // plugin does not take it from tsconfig
                baseUrl: './src',
                // tsConfigPath should point to the file where "baseUrl" and "paths" are specified
                tsConfigPath: './tsconfig.extend.json',
            },
        }
    ]
}

export default a;