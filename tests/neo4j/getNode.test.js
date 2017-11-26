import test from 'ava';
import Neo4jQuery from '../../class/Neo4jQuery';

const testNodeName = "Test Node"

test.before('cleanup', t => {
	var q = new Neo4jQuery()
	q.matchNode()
	q.detachDeleteNode()
	return q.run()
});

test('getNode default', t => {
	var q = new Neo4jQuery()
	q.createNode({name: testNodeName})
	.returnNode()
	return q.getNode().then(node => {
		t.is(node.name, testNodeName)
	})
});

test('getNode throws where many results are returned', t => {
	var q = new Neo4jQuery()
	.createNode({name: testNodeName})
	.withNode()
	.matchNode({name: testNodeName})
	.returnNode()
	return t.throws(q.getNode());
});