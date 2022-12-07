const Handlebars = require('handlebars');
const { Transformer } = require('@parcel/plugin');

module.exports = new Transformer({
    async transform({asset}) {
        const source = await asset.getCode();
        const precompiled = Handlebars.precompile(source);
        const js = `
                import Handlebars from 'handlebars/runtime';
                const templateFunction = Handlebars.template(${precompiled});
                export default templateFunction;
                `;
        asset.type = 'js';
        asset.setCode(js);
        return [asset];
    }
});
