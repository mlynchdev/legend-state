import { symbolIsEvent, symbolIsObservable } from './globals';
import { observable } from './observable';
import type { ObservableEvent } from './observableInterfaces';

export function event(): ObservableEvent {
    // event simply wraps around a number observable
    // which increments its value to dispatch change events
    const obs = observable(0);
    return {
        fire: function () {
            // Notify increments the value so that the observable changes
            obs.set((v) => v + 1);
        },
        on: function (cb?: () => void) {
            return obs.onChange(cb);
        },
        get: () => obs.get(),
        // @ts-expect-error eslint doesn't like adding symbols to the object but this does work
        [symbolIsObservable]: true,
        [symbolIsEvent]: true,
    };
}
