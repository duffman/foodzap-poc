# Zynaptic Node
Zynaptic Node is a FAST, LIGHTWEIGHT **Type Script** implementation of a data container for working
with Hierarchial Data sets, (parent -> child relational data) such as
**XML** ,**JSON**, **YAML**, **Directory Strutures** and so on.

Data stored in Zynaptic node form a tree structure that starts at "the root" and branches to
"the leaves", each ndoe can hold an indefinite number of attributes and

## IMPORTANT"!
**Zynaptic Node is NOT a Parser, it cannot parse data by itself, it need to be fed wih data,
Connect it to a XML SAX Parser for example and you will have a perfect solution for
ready for production using event driven parsing of XML data**

## Use case examples
* Document for event Driven parsers such as **XML** **SAX**
* Storage class for configuration files providing easy access to your data.
* Data handler for structured data protocols cuch as the **XMPP** messaging protocol.
* there are a lot more, but I think you get the idea :)

## Road Map

## Usage
```TypeScript
var s = "JavaScript syntax highlighting";
alert(s);
```

## Samples
Please see the samples folder located in the repo, I have implemented a few use
cases to that will give yo ua pretty good idea of how you can make use of Zynaptic Nodea


### Simple Demo
Just a simple demo that shows how to manually use Zynaptic Node to create a simple tree
using parent->child and attributes, the sample also implements a simple XML Formatter,
that returns the internal data structure as an XML string.


### Simple XML Document and Parser
This project contains a very simple SAX parser where Zynaptic node is used as the document
container for the parsed XML.


### Directory Tree
Simple project where Zynaptic Node is used to hold a directory structure, providing an easy
way to work with directory/file-structures.


I hope your find this litt
