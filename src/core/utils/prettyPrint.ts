import util from 'util';

export function prettyPrint(obj: unknown): void {
    console.log(
        util.inspect(obj, {
            showHidden: false,
            depth: null,
            colors: true,
            compact: false,
            breakLength: 80,
        }),
    );
}
