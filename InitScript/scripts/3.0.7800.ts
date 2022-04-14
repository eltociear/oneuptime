import { find, update } from '../util/db';

const monitorCollection: string = 'monitors';

async function run(): void {
    // get all monitors that have a monitorCategoryId
    const monitors = await find(monitorCollection, {
        disabled: { $exists: false },
    });

    for (const monitor of monitors) {
        await update(
            monitorCollection,
            { _id: monitor._id },
            { disabled: false }
        );
    }

    return `Script ran for ${monitors.length} monitors`;
}

export default run;
