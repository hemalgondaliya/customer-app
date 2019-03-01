
import {Injectable} from '@angular/core';

import {Subject} from 'rxjs';

import * as _ from 'lodash';

@Injectable()
export class EventService {

    observables: object = {};

    /**
     * Takes an event name and returns the respective Observable when there is one present.
     *
     * @param eventName
     * @returns Subject
     */
    on(eventName: string): Subject<any> {

        let observable = this.observables[eventName];
        if (!observable) {
            observable = new Subject<any>();
            this.observables[eventName] = observable;
        }

        return observable;
    }

    /**
     * Provides data for an Observable with the given event name or returns an error if no matching Observable can be found.
     *
     * @param eventName
     * @param data
     */
    emit(eventName: string, data: any) {

        const observable = this.observables[eventName];
        if (!observable) {
            console.warn('No observables registered for event \'' + eventName + '\'');
            return;
            // throw {error: 'No observable found for name: ' + eventName};
        }

        observable.next(data);
    }

    /**
     * Removes the Observable with the given event name from the list of Observables.
     *
     * @param eventName
     */
    remove(eventName: string) {
        const observable = this.observables[eventName];
        if (!observable) {
            throw {error: 'No observable found for name: ' + eventName};
        }

        this.observables = _.omit(this.observables, [eventName]);
    }

}
