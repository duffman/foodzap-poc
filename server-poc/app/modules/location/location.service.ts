/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */

import { injectable }     from 'inversify';

export interface ILocationService {}

@injectable()
export class LocationService implements ILocationService {
}
