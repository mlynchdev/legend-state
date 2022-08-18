import { tracking, TrackingNode } from '@legendapp/state';
import { getNodePath } from './traceHelpers';

export function traceListeners(name?: string) {
    tracking.traceListeners = traceNodes.bind(this, name);
}

function traceNodes(name: string, nodes: Map<number, TrackingNode>) {
    tracking.traceListeners = undefined;
    const arr: string[] = [];
    for (let tracked of nodes) {
        const { node, shallow } = tracked[1];
        arr.push(`${arr.length + 1}: ${getNodePath(node)}${shallow ? ' (shallow)' : ''}`);
    }

    console.log(
        `[legend-state] ${name ? name + ' ' : ''}tracking ${arr.length} observable${
            arr.length > 1 ? 's' : ''
        }:\n${arr.join('\n')}`
    );
}