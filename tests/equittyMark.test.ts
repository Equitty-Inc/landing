import assert from 'node:assert/strict';
import { EQUITTY_MARK_FACETS, EQUITTY_MARK_VIEW_BOX } from '../lib/equittyMark.ts';

export function runEquittyMarkTests() {
  assert.equal(EQUITTY_MARK_VIEW_BOX, '0 0 100 100');
  assert.deepEqual(EQUITTY_MARK_FACETS, [
    {
      id: 'turquoise',
      points: '0,0 100,0 50,50',
      fill: '#4bb9c0',
    },
    {
      id: 'steel-blue',
      points: '100,0 100,100 50,50',
      fill: '#3f6889',
    },
  ]);
  assert.equal(EQUITTY_MARK_FACETS.length, 2, 'the mark contains only the two supplied triangles');
}
