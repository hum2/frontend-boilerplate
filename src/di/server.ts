import { createContainer, DIContainer } from './container';

let container: DIContainer | null = null;

export const getServerContainer = (): DIContainer => {
    if (!container) {
        container = createContainer();
    }
    return container;
};
