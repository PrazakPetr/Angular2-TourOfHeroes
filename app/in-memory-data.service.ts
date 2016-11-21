import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let heroes = [
            { id: 11, name: 'Mr. Nice-a' },
            { id: 12, name: 'Narco-a' },
            { id: 13, name: 'Bombasto-a' },
            { id: 14, name: 'Celeritas-a' },
            { id: 15, name: 'Magneta-a' },
            { id: 16, name: 'RubberMan-a' },
            { id: 17, name: 'Dynama-a' },
            { id: 18, name: 'Dr IQ-a' },
            { id: 19, name: 'Magma-a' },
            { id: 20, name: 'Tornado-a' }
        ];

        return {heroes};
    }
}