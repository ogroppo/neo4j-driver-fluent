# Fluent Neo4j

This library allows you to build any cypher query you like and get the query string and an object with all the parameters as it's an extention of [fluent-cypher](https://github.com/ogroppo/fluent-cypher)

In addition you have the methods to fetch the results from your Neo4j instance.

## Table of Contents
* [Usage](#usage)
	* [constuctor([options])](#constuctor)
* [Methods](#methods)
	* [fetchRow([alias])](#fetchRow)
	* [fetchRows([alias])](#fetchRows)
	* [fetchLastRow([alias])](#fetchLastRow)
* [Tests](#tests)

## <a name="usage"></a> Usage

You'll need to set env params to connect to neo4j

~~~sh
export NEO4J_URL="bolt://localhost"
export NEO4J_USER="neo4j"
export NEO4J_PASS="neo4j"
~~~

Now you can use the package on the server.

~~~js
const Neo4jQuery = require('fluent-neo4j')
var query = new Neo4jQuery([options])
~~~

#### constuctor([options])

` timestamps ` Bool, default: __false__
if you set to true timestamps will be added for you like `alias.createdAt = timestamp()` and `alias.updatedAt = timestamp()`


`userId` String, if set the properties `alias.createdBy = {userId}` and `alias.updatedBy = {userId}`

## <a name="methods"></a> Methods

All methods return a promise. So after any method is called concatenation is not possible.

#### <a name="fetchRow"></a> fetchRow([alias])

Returns the first row of results as an object and if specified accesses the alias of the row.

~~~js
new Neo4jQuery()
	.matchNode({alias: 'myNode', name: 'myName'})
	.returnNode()
	.fetchRow().then((row)=>{
		console.log(row) // => {myNode: {name: 'myName'}}
	})
~~~

~~~js
new Neo4jQuery()
	.matchNode({alias: 'myNode', name: 'myName'})
	.returnNode()
	.fetchRow('myNode').then((myNode)=>{
		console.log(myNode) // => {name: 'myName'}
	})
~~~

#### <a name="fetchRows"></a> fetchRows([alias])

Returns results in row format, if specified results will be mapped accessing the alias.

**example:** Get rows as they are

~~~js
new Neo4jQuery()
	.matchNode({alias: 'myNode'})
	.returnNode()
	.fetchRows().then(rows => {
		console.log(rows) // => [{myNode: {name: 'myName'}}, {myNode: {name: 'myName2'}}]
	})
~~~

**example:** Extract alias from array of objects

~~~js
new Neo4jQuery()
	.matchNode({alias: 'myNode'})
	.returnNode()
	.fetchRows('myNode').then((rows)=>{
		console.log(rows) // => [{name: 'myName'}, {name: 'myName2'}]
	})
~~~

#### <a name="tests"></a> How to run tests

This will test against an online test instance

~~~
npm test
~~~
