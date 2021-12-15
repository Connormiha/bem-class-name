interface IModsType {
    [key: string]: boolean | string | number | undefined;
}

interface IStatesType {
    [key: string]: boolean | undefined;
}

interface IBlock {
    (element?: string, mods?: IModsType | null, states?: IStatesType | null): string;
    (mods?: IModsType | null, states?: IStatesType | null): string;
}

interface IOptions {
    throwOnError?: boolean;
    elementDelimiter?: string;
    modifierDelimiter?: string;
}

interface IModule {
    (name: string): IBlock;
    setSettings(options: IOptions): void;
}

const isDev = process.env.NODE_ENV !== 'production';
const settings = {
    elementDelimiter: '__',
    modifierDelimiter: '--',
    throwOnError: false
};

/**
 * Base function for bem naming with css modules
 * @param {String} name. BEM name
 * @param {String} [element]
 * @param {Object} [mods]
 * @param {Object} [states]
 * @return {String}
 */
function block(name: string, elementParam, modsParam, statesParam) {
    const isElementAsModes = elementParam && typeof elementParam === 'object';
    const mods = isElementAsModes ? elementParam : modsParam;
    const states = isElementAsModes ? modsParam : statesParam;
    const element = isElementAsModes ? '' : elementParam;
    const {modifierDelimiter, elementDelimiter, throwOnError} = settings;

    const baseBlock = element ? `${name}${elementDelimiter}${element}` : name;
    let result = baseBlock;

    if (isDev && (!result && !mods)) {
        const message = `There is no ${name}${elementDelimiter}${element} in cssModule`;

        if (throwOnError) {
            throw Error(message);
        } else {
            /* eslint-disable-next-line no-console */
            console.warn(message);
            return '';
        }
    }

    if (mods) {
        result = Object.keys(mods)
            .reduce((acc, next) => {
                const modValue = mods[next];
                let mod: string;

                if (modValue === undefined) {
                    return acc;
                }

                if (typeof modValue === 'boolean') {
                    if (modValue) {
                        mod = `${baseBlock}${modifierDelimiter}${next}`;
                    } else {
                        return acc;
                    }
                } else {
                    const currentMode = `${baseBlock}${modifierDelimiter}${next}${modifierDelimiter}${mods[next]}`;

                    mod = currentMode;
                }

                return `${acc} ${mod}`;
            }, result);
    }

    if (states) {
        result = Object.keys(states)
            .reduce((acc, next) => {
                if (!states[next]) {
                    return acc;
                }

                const state = `is-${next}`;

                return `${acc} ${state}`;
            }, result);
    }

    return result.trim();
}

const bem: any = (name) =>
    block.bind(null, name);

bem.setSettings = (newSettings: IOptions) =>
    Object.assign(settings, newSettings);

export default (bem as IModule);
