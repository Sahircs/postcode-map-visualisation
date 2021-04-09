/*

DOCS:

https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

---

https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

https://www.tutorialspoint.com/typescript/index.htm

--------------------------------------------------------------------------------------------------------------------------------------------------------

INSTALL:        sudo npm install -g typescript          - installs globally
                npm install typescript --save-dev       - installs locally


VERSION:        tsc --version   
                npm ls typescript                 


COMPILE:        tsc file_name.ts  
                tsc || tsc src/*.tsc                    - run in project dir -> to compile all (into 'outDir')
                npx tsc file_name.ts

With Flag:      tsc --flag-name file_name.ts            - Adds condition to compiling the program
                tsc --noEmitOnError hello.ts            - If errors -> output file isn't updated 


WEB:            <script src="file_name.js"></script>      - In the Body Tag

----------------------------------------------------------------------------

[SET-UP]

DIRECTORIES:
projectRoot
├── src                     -> from tsconfig.json -> "rootDir": "./src"
│   ├── file1.js
│   └── file2.js
├── built                   -> from tsconfig.json -> outDir="./built"
├── tsconfig.json           -> tsc --init
└── package.json            -> npm init -y


INSTALL DEV DEPENDENCY:     npm i -D typescript         - ensures typescript installed in project 
CHECK DEV DEPENDENCIES:     npm ls --depth=0            - checks packages installed in current project | can see any conflicts..
CHECK GLOBAL PACKAGES:      npm ls --depth=0 --g

--------------------------------------

[1]
COMPILE THEN RUN:           

>> add to package.json
"scripts": {
    "start": "ts-node src/index.ts",                    
    "build": "tsc"
}

npm run-script build        - compile
node src/index.js           - run

--------------------------------------

[2]
COMPILE + RUN:              npm i -D ts-node            - install ts-node   

>> add to package.json
"scripts": {
    "start": "ts-node src/index.ts",                    
    "build": "tsc"
}

>> npm start

--------------------------------------

[3]
COMPILE + RUN CONTINUOUSLY:     npm i -D ts-node-dev        - install ts-node-dev 

>> add to package.json
"scripts": {
    "start": "ts-node-dev --respawn src/index.ts",                    
    "build": "tsc"
}

>> npm start

OR use nodemon


WEBPACK:        https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html


--------------------------------------------------------------------------------------------------------------------------------------------------------

[IMPORTS/EXPORTS]

npm i -D @types/_                           // e.g. types/node -> for node.js packages 
>> if you don't use @types/_ -> won't get TS info when you import 


import _ from "./filename.js"               // If 'export default' used
import {_, _, _} from "./filename.js"       // Multiple imports -> if 'export' used
import * as alias                           // Importing everything into a single namespace 
import {_ as alias} from "./filename.js"    // Giving an import an alias

export default _                            // can be a function/class/variables
export _                                    // multiple exports -> put 'export' before all the things you want to export 

Types:
import type ...
export type ...

Error Importing Modules:    npm install -S @types/<module-name>

Modules:            - A JS file without an export or top-level await is NOT a module 
                    - export {};    -> treats the file as a module + doesn't export anything 
           
--------------------------------------------------------------------------------------------------------------------------------------------------------

[TYPES]                     - static type-checking | In many cases, TypeScript can infer the types for us even if we omit them.
                            
>> 2 types are compatible if their internal structure is equal 
-> e.g. an interface of an object && a defined object that happens to be equal (i.e. have the same attributes)


: any               - refers to any type | properties of it will be type: any | gives flexibility 

Primitives:
string
number              - (=int/float)
boolean 

Arrays:
1. type[]           - e.g. string[], number[]
2. Array<type>      - e.g. Array<number> 

object:             - anything that isn't primitive (!= Object)
unknown:            - represents any value | != 'any' 
this                - refers to some class/object/etc...

Object
Function:           - can always be called && return-type: any


>> TypeScript can automatically infer the type in some cases (e.g. declaring variables) -> so you don't need to 


Null/Undefined:
If "strictNullChecks": "false"  -> null/undefined act normally 

If false:
>> You need to test/check ('type guard') for null/undefined -> i.e. if (var == null) {...}

Non-Null Assertion:     - param followed by ! | Asserts that the param is definitely present 
>> param!


OPERATORS:
&           - Intersection Type -> combines different interfaces/types (of Object type) 
            - saves it to a type alias
|           - Combining possible types -> e.g. const name: (string | number);
...         - spread operator -> {..., attr: value} -> keeps the object the same + adds the attribute to it 
var!: type  - asserts that the var will have that type

--------------------------------------

IF-STATEMENTS:              - condition is always 'coerced'/converted into a boolean | maybe required in functions 

Values below, all coerce to false, while others coerce to true 
- 0
- NaN
- "" (the empty string)
- 0n (the bigint version of zero)
- null
- undefined

Convert to Boolean:
Boolean(input)  or  !!(input)

--------------------------------------

FUNCTIONS:                  - You can add types to parameters -> causing arguments of function calls to be checked 

>>  Can have default values for parameters -> (param1=value,..)

Return type annotations     - can specifiy what type the return will be

function funcName(param1: type, param2: type): return-type {
    return ...;
}

Anonymous Functions:        - don't require type-checking | parameters of function are automatically given types 

let numbers = ['1', '2', '3']
numbers.forEach((num) => {console.log(s.toUpperCase());})


Function-Type-Expressions:

function funcName(arrow-func: (arrow-func-param: type) => return-type) {    // Function with an Arrow Function parameter
    // can call the arrow-func here..
}     


Multiple-Types:

function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}

const parsed = map(["1", "2", "3"], (n) => parseInt(n));


Function-Signatures:        - Allow you to set-up the inputs/outputs/types in different ways
                            -> Can call the function with parameters matching any of the function signatures

function func(param1: type): type;                  // signature1
function func(param1: type, param2: type): type;    // signature2
function func(param1: type, param2?: type): type {  // func with body -> param2 is optional as 1 func signature doesn't require it 
    // do something...
}

--------------------------------------

Objects:

function funcName(objName: {attr1: type, attr2: type}) {
    console.log(objName.attr1);
}

Optional Properties:        - Objects types can specify that some/all of their properites are optional

>> attr?: type 
-> The argument passed in could be empty -> so must check if undefined -> use a 'type guard'

function funcName(param: {attr1: type, attr2?: type}) {   // Can also assign default values within param
    if (param.attr2 == undefined) {...}   // type guard 
}

>> Can use interfaces/type instead 
interface/type TypeName {
    attr1: type,
    attr2: type,
}

function funcName(param: TypeName) {...}

-------------------

READ-ONLY:
>> can make properties read-only by adding 'readonly' before it
*** The property itself is immutable BUT its internal contents are not ***

Example:
interface SomeType {
    readonly attrName: type,    // can access it BUT cannot write to it (via instance.attrName = ...)
    readonly obj: {attr: type}  // obj is read-only BUT attr is NOT 
}

--------------------------------------

[TUPLES]

type tuple = [string, number]       // asserts that index1: string and index2: number

REST Elements:              - Must be array/tuple type | can also be used in function parameters

type tuple = [string, number, ...boolean[]] 
>> describes tuple with first 2 elements being a string + number -> followed by any no. of booleans


--------------------------------------------------------------------------------------------------------------------------------------------------------


GENERICS:                   - Linking the types of different values -> e.g. input + output 
                            - Uses the type parameter 'Type'

function funcName<Type>(arr: Type[]): Type {    // Creates a link between input parameter + the return value 
  return arr[0];
}

const genericFunc = <X, Y = default-type>(x: X, y: Y): [X, Y] => {   // TS can infer the return-type
    return [x, y];
}

const variable = <>genericFunc(val1, val2);     // <can explicitly specifiy types before func-call>
>> e.g. <string | null, number>                 // params are optional if there is a default specified in the generics within func

Constraints:

function longest<Type extends { length: number }>(a: Type, b: Type) {   // Parameters must have the .length method 
  if (a.length >= b.length) {                                           // strings/arrays can be used 
    return a;
  } else {
    return b;
  }
}

Interfaces/Types:           - Can use generics if attributes are of type: any 
                            - can be combined with generics used in functions 

interface/type SomeType<Type> {  // Type can be any type/interface
    attr: Type              // instead of attr: any
}

>> Access -> can specify any type/interface
>> let instance = SomeType<string>  // will set 'attr: string'
>> let instance = SomeType<string> = {attr: "text.."}

type SomeType<Type> = Type | null   - using type -> doesn't need to be objects

Array-Type:
1. Array<Type>
2. Type[]

Read-Only-Array-Type:
1. ReadonlyArray<Type>
2. readonly Type[]

>> e.g. const array: ReadonlyArray<string> = ["..", ".."]


--------------------------------------------------------------------------------------------------------------------------------------------------------

[MORE ON TYPES]


Union-Types:                - Combining types 

function funcName(param: string | number) {
    param.method()                  - method MUST be available for all types in union (number and string) 
    if (typeof param == type)       - OR check the type before using the method -> use a 'type guard'
    else if (Array.isArray(param))  // checking if Array type 
}

--------------------------------------

Type-Guard:                 - using the typeof operator | checking against the value returned by typeof
>> allows you to check the type of a parameter which can have 1 of a number of types -> e.g. param: string | number 
>> if (typeof param == "number") {...}

typeof:                     - supports below types 
string
number
bigint
boolean
symbol
undefined
object                      // careful -> typeof null == 'object' | check 'Coercing' in If-Statements 
                            // Check if param is 'truthy' -> if (param) or if (param !== null)
function

--------------------------------------

Type-ALIAS:

Examples:
type type1 {
    attr1: type,
    attr2: type,
    (arg: type): type,      // makes it callable 
}
type ID = number | string;  


Extending:                  -  Using Intersection

type type2 = type1 & {attr3: type};

>> A type cannot be changed once after being created - unlike interfaces!

--------------------------------------

Interfaces:                 - Another way to name an object type 

interface Interface1 {
    attr1: type,
    attr2: type,
    method(): type,         // void: no return 
}

function funcName(param1: Interface1) {..}


Extending:
interface Interface2 extends Interface1 {attr3: type}   // Adding something to existing interface 
interface Interface3 extends Interface1, Interface2, {} // Extending multiple interfaces 

Adding Fields:
interface Interface1 {new-attr: type}   // Just adds it onto existing interface 

--------------------------------------

Type-Assertions:            - Use a type assertion to specify a more specific type 
                            - .tsx doesn't allow <type> so MUST use 'as type' syntax
const varName = ... as type   // OR <type>...

Example:
>> const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
OR
>> const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");

--------------------------------------------------------------------------------------------------------------------------------------------------------

[CLASSES]

>> Field declarations create a public writeable propeerty 

class SomeClass {
    prop1: type;            
    propV: type = value;    // Can be initialized with values 
    prop2!: type;           // can use '!:' to assert that it doesn't need to be initialized in constructor 
    readonly prop3: type;   // Prevents assignment to field outside constructor 
    _prop4: type;           // property is private & only accessible via setters/getters

    // Normal constructor with defaults 
    constructor(val1, val2 = default) {     
        this.prop1 = value;
        this.prop3 = value;
    }
}

Constructors:               - can have multiple signatures with 1 main contructor with a body

constructor(x: number, y: string);  // signature1
constructor(s: string);             // signature2
constructor(xs: any, y?: any) {     // y: optional as 1 signature doesn't require it 
    // main-body...
}
>> --strictPropertyInitialization -> controls whether class fields need to be initialized in the constructor

Super:

class SubClass extends ParentClass {
    constructor() {
        super();
    }
}

Visibility:                 - Can control whether certain methods/attributes are visible outside the class 

public          - Can be accessed anywhere | default 
protected       - Only visible to subclasses they're declared in 
private         - Only visible to the class itself + not even its subclasses
static          - Accessed via the Class | Instance not needed | Don't use if not needed -> function may be better
                -> Can be combined with one of the above 
                -> Certain ones are not allowed -> length/name/call


Getters/Setters:            

class SomeClass {
    _prop: type;
    
    set setMethod(value) { // type of the setter is inferred from the return-type of the getter 
        this._prop = value
    }
    get getMethod() {
        return this._prop;
    }
}

Heritage:                   - classes that implement interfaces must have the exact same methods/variables/..

interface SomeInterface {
    param: type;
    method(param: type): void;
}

class SomeClass implements SomeInterface {
    param: type;
    method(param) {
        ...
    }
}

>> When a class extends another class
-> Inherit its methods/attribites using 'super()'
-> Can override them by just declaring the method + altering it 


Generic Classes:            - The Types of the attributes/methods are inferred from class instantiation 

class SomeClass<Type> {     // Cannot have static attributes/methods with generic type 'Type'
    prop: Type;
    constructor(param: Type) {
        this.prop = param;
    }
}


THIS:

>> Can be used as a parameter annotation 

class SomeClass {
    function func(param: this) {    // e.g. param can be some class
        return param.attr;
    }
}

obj = {
    attr1: true;
    func: () => {this.obj: false}   // this refers to the 'obj' Object
}

--------------------------------------------------------------------------------------------------------------------------------------------------------

[REACT + TS]

SETUP:

create-react-app project_name --typescript
create-react-app project_name --template typescript     - for future release!

npm start

--------------------------------------

*** Hover over things to see what type it requires ***

Components:

interface Props {   
    prop1: type;
    fn: () => return-type;
    handleChange: (event: React.ChangeEvent<HTML_Element>) => void;     // onChange={handleChange} 
}

const SomeComp: React.FC<Props> = ({prop1, fn}) => {    // declared as React.FunctionComponent
    ...
}

useState:
const [count, setCount] = useState<string | null>();    // specify types the state accepts | can use an interface/type

useRef:
const inputRef = useRef<HTML_Element>(null);            // where _ is the Tag -> hover over 'ref={}' to see type

<Tag ref={inputRef} />

--------------------------------------------------------------------------------------------------------------------------------------------------------

[REDUX]                         npm install redux react-redux

Functional Programming: 

import { pipe } from "lodash/fp";       // shortcut for writing high-order functions 

const combineFunctionCalls = pipe(func1, func2, func3)
combineFunctionCalls(input)     // input is arg for func1 -> return of func1 is arg for func2..

--------------------------------------

STORE           - Immutable so requires a reducer function to make changes to it
                - has a dispatch method which takes the action as a parameter
Methods:        .getState() | .dispatch() | .subscribe()

REDUCER:        - Takes the current store instance + returns updated store based on action type
action          - describes what event occurred -> therefore how the store should be updated 

SUMMARY:
action: dispatch -> store -> reducer 
reducer: new-state -> store -> updates UI


STEPS:
1. Design store         - can be an object/array of objects
[{
    id: 1,
    description: "",
    resolved: false,
}]

2. Define Actions       - Object with attributes: type & payload
[{
    type: "bugAdded",       // MUST have a type
    paylaod: {              // optional extra
        description: "describe action",
        resolved: false
    }
}]

>> can create 'action creators'     -> action.js
export function bugAdded(description) {
    return {
        type: "bugAdded",
        payload: {
            description,    // shorthand syntax if attr & value have same name 
        }
    }
}

3. Create Reducer       - reducer.js

function reducer(state = [], action) {      // give a default state -> when 1st declared
    switch(action.type) {
        case "bugAdded":
            return [...state, {
                description: action.payload.description,
                resolved: false,
                id: ++id, 
            }]
        case "bugRemoved":
            return state.filter(bug => bug.id != action.payload.id)
        case "budResolved":
            return state.map(bug => 
                bug.id !== action.payload.id ? bug : {...bug, resolved: true}
            )
        default:
            return state;
    }
}

export default reducer

4. Set up the store     - store.js

import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const unsubscribe = store.subscribe(() => {         // Executes whenever state changes 
    console.log("msg", store.getState());
})

export default store;

5. Integration 

import store from "./store";

store.dispatch({                    // give initial value to store     
    type: "bugAdded",
    payload: {
        description: "Bug1",
    }
})
OR
store.dispatch(bugAdded("Bug1"))    // Using 'action creator'

unsubscribe();

store.dispatch({
    type: "bugRemoved",
    payload: {
        id: 1,
    }
})

console.log(store.getState())   // return the current state


REDUX-DEV-TOOLS:        npm install --save redux-devtools-extension

import { createStore, compose } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";

const composeEnhancers = // for redux-dev-tool
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(reducer, composeEnhancers());

*/
