import bem from '../src/bem-gen';

const namesToArray = (name: string) =>
    name.split(' ').sort();

describe('bem-gen', () => {
    const block = bem('HASH_INPUT');

    it('should return base element', () => {
        expect(block()).toBe('HASH_INPUT');
        expect(block(null)).toBe('HASH_INPUT');
        expect(block('')).toBe('HASH_INPUT');
    });

    it('should return base element with mods', () => {
        expect(
            namesToArray(block('', {disabled: true}))
        ).toStrictEqual(namesToArray('HASH_INPUT HASH_INPUT--disabled'));

        expect(
            namesToArray(block(null, {disabled: true}))
        ).toStrictEqual(namesToArray('HASH_INPUT HASH_INPUT--disabled'));

        expect(
            namesToArray(block({disabled: true}))
        ).toStrictEqual(namesToArray('HASH_INPUT HASH_INPUT--disabled'));
    });

    it('should return base element with mods and states', () => {
        expect(
            namesToArray(block('', {disabled: true}, {active: true}))
        ).toStrictEqual(namesToArray('HASH_INPUT HASH_INPUT--disabled is-active'));

        expect(
            namesToArray(block(null as any, {disabled: true}, {active: true}))
        ).toStrictEqual(namesToArray('HASH_INPUT HASH_INPUT--disabled is-active'));

        expect(
            namesToArray(block({disabled: true}, {active: true}))
        ).toStrictEqual(namesToArray('HASH_INPUT HASH_INPUT--disabled is-active'));
    });

    it('should return elements', () => {
        expect(block('icon')).toBe('HASH_INPUT__icon');
        expect(block('field')).toBe('HASH_INPUT__field');
    });

    it('should return only mods when no block in css', () => {
        expect(block('button', {color: 'red'})).toBe('HASH_INPUT__button HASH_INPUT__button--color--red');
    });

    it('should return elements with mods', () => {
        expect(block('field', {disabled: true})).toBe('HASH_INPUT__field HASH_INPUT__field--disabled');
        expect(block('field', {disabled: false})).toBe('HASH_INPUT__field');
        expect(block('field', {disabled: undefined})).toBe('HASH_INPUT__field');
        expect(block('field', {type: 'text'})).toBe('HASH_INPUT__field HASH_INPUT__field--type--text');
        expect(
            namesToArray(block('field', {type: 'phone', disabled: true}))
        ).toStrictEqual(namesToArray('HASH_INPUT__field HASH_INPUT__field--type--phone HASH_INPUT__field--disabled'));
    });

    it('should return elements with states', () => {
        expect(
            block('field', null, {
                active: true,
                removed: false
            })
        ).toBe('HASH_INPUT__field is-active');
        expect(block('field', null, {
            active: true,
            removed: undefined
        })).toBe('HASH_INPUT__field is-active');
        expect(
            namesToArray(block('field', null, {
                active: true,
                removed: true
            }))
        ).toStrictEqual(namesToArray('HASH_INPUT__field is-active is-removed'));

        expect(
            namesToArray(block(null as any, null, {
                active: true,
                removed: true
            }))
        ).toStrictEqual(namesToArray('HASH_INPUT is-active is-removed'));
    });

    it('should return elements with mods and states', () => {
        expect(
            namesToArray(
                block(
                    'field',
                    {disabled: true},
                    {active: true, removed: true}
                )
            )
        ).toStrictEqual(namesToArray('HASH_INPUT__field is-active is-removed HASH_INPUT__field--disabled'));
        expect(
            namesToArray(block('field', {disabled: true, type: 'text'}, {active: true, removed: true}))
        ).toStrictEqual(
            namesToArray(
                'HASH_INPUT__field is-active is-removed HASH_INPUT__field--disabled HASH_INPUT__field--type--text'
            )
        );
    });

    describe('alernative delimiters', () => {
        const alernativeBlock = bem('INPUT');

        beforeAll(() => {
            bem.setSettings({elementDelimiter: '%', modifierDelimiter: '~'});
        });

        afterAll(() => {
            bem.setSettings({elementDelimiter: '__', modifierDelimiter: '_'});
        });

        it('should returns elements', () => {
            expect(
                namesToArray(alernativeBlock('icon', {red: true}))
            ).toStrictEqual(namesToArray('INPUT%icon INPUT%icon~red'));
        });
    });
});
