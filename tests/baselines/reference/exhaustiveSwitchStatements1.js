//// [exhaustiveSwitchStatements1.ts]
function f1(x: 1 | 2): string {
    if (!!true) {
        switch (x) {
            case 1: return 'a';
            case 2: return 'b';
        }
        x;  // Unreachable
    }
    else {
        throw 0;
    }
}

function f2(x: 1 | 2) {
    let z: number;
    switch (x) {
        case 1: z = 10; break;
        case 2: z = 20; break;
    }
    z;  // Definitely assigned
}

function f3(x: 1 | 2) {
    switch (x) {
        case 1: return 10;
        case 2: return 20;
        // Default considered reachable to allow defensive coding
        default: throw new Error("Bad input");
    }
}

// Repro from #11572

enum E { A, B }

function f(e: E): number {
    switch (e) {
        case E.A: return 0
        case E.B: return 1
    }
}

function g(e: E): number {
    if (!true)
        return -1
    else
        switch (e) {
            case E.A: return 0
            case E.B: return 1
        }
}

// Repro from #12668

interface Square { kind: "square"; size: number; }

interface Rectangle { kind: "rectangle"; width: number; height: number; }

interface Circle { kind: "circle"; radius: number; }

interface Triangle { kind: "triangle"; side: number; }

type Shape = Square | Rectangle | Circle | Triangle;

function area(s: Shape): number {
    let area;
    switch (s.kind) {
        case "square": area = s.size * s.size; break;
        case "rectangle": area = s.width * s.height; break;
        case "circle": area = Math.PI * s.radius * s.radius; break;
        case "triangle": area = Math.sqrt(3) / 4 * s.side * s.side; break;
    }
    return area;
}

function areaWrapped(s: Shape): number {
    let area;
    area = (() => {
        switch (s.kind) {
            case "square": return s.size * s.size;
            case "rectangle": return s.width * s.height;
            case "circle": return Math.PI * s.radius * s.radius;
            case "triangle": return Math.sqrt(3) / 4 * s.side * s.side;
        }
    })();
    return area;
}

// Repro from #13241

enum MyEnum {
	A,
	B
}

function thisGivesError(e: MyEnum): string {
	let s: string;
	switch (e) {
		case MyEnum.A: s = "it was A"; break;
		case MyEnum.B: s = "it was B"; break;
	}
	return s;
}

function good1(e: MyEnum): string {
	let s: string;
	switch (e) {
		case MyEnum.A: s = "it was A"; break;
		case MyEnum.B: s = "it was B"; break;
		default: s = "it was something else"; break;
	}
	return s;
}

function good2(e: MyEnum): string {
	switch (e) {
		case MyEnum.A: return "it was A";
		case MyEnum.B: return "it was B";
	}
}

// Repro from #18362

enum Level {
  One,
  Two,
}

const doSomethingWithLevel = (level: Level) => {
  let next: Level;
  switch (level) {
    case Level.One:
      next = Level.Two;
      break;
    case Level.Two:
      next = Level.One;
      break;
  }
  return next;
};

// Repro from #20409

interface Square2 {
    kind: "square";
    size: number;
}

interface Circle2 {
    kind: "circle";
    radius: number;
}

type Shape2 = Square2 | Circle2;

function withDefault(s1: Shape2, s2: Shape2): string {
    switch (s1.kind) {
        case "square":
            return "1";
        case "circle":
            switch (s2.kind) {
                case "square":
                    return "2";
                case "circle":
                    return "3";
                default:
                    return "never";
            }
    }
}

function withoutDefault(s1: Shape2, s2: Shape2): string {
    switch (s1.kind) {
        case "square":
            return "1";
        case "circle":
            switch (s2.kind) {
                case "square":
                    return "2";
                case "circle":
                    return "3";
            }
    }
}

// Repro from #20823

function test4(value: 1 | 2) {
    let x: string;
    switch (value) {
        case 1: x = "one"; break;
        case 2: x = "two"; break;
    }
    return x;
}

// Repro from #34661

enum Animal { DOG, CAT }

declare const zoo: { animal: Animal } | undefined;

function expression(): Animal {
    switch (zoo?.animal ?? Animal.DOG) {
        case Animal.DOG: return Animal.DOG
        case Animal.CAT: return Animal.CAT
    }
}

// Repro from #34840

function foo() {
    const foo: number | undefined = 0;
    while (true) {
        const stats = foo;
        switch (stats) {
            case 1: break;
            case 2: break;
        }
    }
}


//// [exhaustiveSwitchStatements1.js]
"use strict";
function f1(x) {
    if (!!true) {
        switch (x) {
            case 1: return 'a';
            case 2: return 'b';
        }
        x; // Unreachable
    }
    else {
        throw 0;
    }
}
function f2(x) {
    var z;
    switch (x) {
        case 1:
            z = 10;
            break;
        case 2:
            z = 20;
            break;
    }
    z; // Definitely assigned
}
function f3(x) {
    switch (x) {
        case 1: return 10;
        case 2: return 20;
        // Default considered reachable to allow defensive coding
        default: throw new Error("Bad input");
    }
}
// Repro from #11572
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
})(E || (E = {}));
function f(e) {
    switch (e) {
        case E.A: return 0;
        case E.B: return 1;
    }
}
function g(e) {
    if (!true)
        return -1;
    else
        switch (e) {
            case E.A: return 0;
            case E.B: return 1;
        }
}
function area(s) {
    var area;
    switch (s.kind) {
        case "square":
            area = s.size * s.size;
            break;
        case "rectangle":
            area = s.width * s.height;
            break;
        case "circle":
            area = Math.PI * s.radius * s.radius;
            break;
        case "triangle":
            area = Math.sqrt(3) / 4 * s.side * s.side;
            break;
    }
    return area;
}
function areaWrapped(s) {
    var area;
    area = (function () {
        switch (s.kind) {
            case "square": return s.size * s.size;
            case "rectangle": return s.width * s.height;
            case "circle": return Math.PI * s.radius * s.radius;
            case "triangle": return Math.sqrt(3) / 4 * s.side * s.side;
        }
    })();
    return area;
}
// Repro from #13241
var MyEnum;
(function (MyEnum) {
    MyEnum[MyEnum["A"] = 0] = "A";
    MyEnum[MyEnum["B"] = 1] = "B";
})(MyEnum || (MyEnum = {}));
function thisGivesError(e) {
    var s;
    switch (e) {
        case MyEnum.A:
            s = "it was A";
            break;
        case MyEnum.B:
            s = "it was B";
            break;
    }
    return s;
}
function good1(e) {
    var s;
    switch (e) {
        case MyEnum.A:
            s = "it was A";
            break;
        case MyEnum.B:
            s = "it was B";
            break;
        default:
            s = "it was something else";
            break;
    }
    return s;
}
function good2(e) {
    switch (e) {
        case MyEnum.A: return "it was A";
        case MyEnum.B: return "it was B";
    }
}
// Repro from #18362
var Level;
(function (Level) {
    Level[Level["One"] = 0] = "One";
    Level[Level["Two"] = 1] = "Two";
})(Level || (Level = {}));
var doSomethingWithLevel = function (level) {
    var next;
    switch (level) {
        case Level.One:
            next = Level.Two;
            break;
        case Level.Two:
            next = Level.One;
            break;
    }
    return next;
};
function withDefault(s1, s2) {
    switch (s1.kind) {
        case "square":
            return "1";
        case "circle":
            switch (s2.kind) {
                case "square":
                    return "2";
                case "circle":
                    return "3";
                default:
                    return "never";
            }
    }
}
function withoutDefault(s1, s2) {
    switch (s1.kind) {
        case "square":
            return "1";
        case "circle":
            switch (s2.kind) {
                case "square":
                    return "2";
                case "circle":
                    return "3";
            }
    }
}
// Repro from #20823
function test4(value) {
    var x;
    switch (value) {
        case 1:
            x = "one";
            break;
        case 2:
            x = "two";
            break;
    }
    return x;
}
// Repro from #34661
var Animal;
(function (Animal) {
    Animal[Animal["DOG"] = 0] = "DOG";
    Animal[Animal["CAT"] = 1] = "CAT";
})(Animal || (Animal = {}));
function expression() {
    var _a, _b;
    switch ((_b = (_a = zoo) === null || _a === void 0 ? void 0 : _a.animal, (_b !== null && _b !== void 0 ? _b : Animal.DOG))) {
        case Animal.DOG: return Animal.DOG;
        case Animal.CAT: return Animal.CAT;
    }
}
// Repro from #34840
function foo() {
    var foo = 0;
    while (true) {
        var stats = foo;
        switch (stats) {
            case 1: break;
            case 2: break;
        }
    }
}


//// [exhaustiveSwitchStatements1.d.ts]
declare function f1(x: 1 | 2): string;
declare function f2(x: 1 | 2): void;
declare function f3(x: 1 | 2): 10 | 20;
declare enum E {
    A = 0,
    B = 1
}
declare function f(e: E): number;
declare function g(e: E): number;
interface Square {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
interface Circle {
    kind: "circle";
    radius: number;
}
interface Triangle {
    kind: "triangle";
    side: number;
}
declare type Shape = Square | Rectangle | Circle | Triangle;
declare function area(s: Shape): number;
declare function areaWrapped(s: Shape): number;
declare enum MyEnum {
    A = 0,
    B = 1
}
declare function thisGivesError(e: MyEnum): string;
declare function good1(e: MyEnum): string;
declare function good2(e: MyEnum): string;
declare enum Level {
    One = 0,
    Two = 1
}
declare const doSomethingWithLevel: (level: Level) => Level;
interface Square2 {
    kind: "square";
    size: number;
}
interface Circle2 {
    kind: "circle";
    radius: number;
}
declare type Shape2 = Square2 | Circle2;
declare function withDefault(s1: Shape2, s2: Shape2): string;
declare function withoutDefault(s1: Shape2, s2: Shape2): string;
declare function test4(value: 1 | 2): string;
declare enum Animal {
    DOG = 0,
    CAT = 1
}
declare const zoo: {
    animal: Animal;
} | undefined;
declare function expression(): Animal;
declare function foo(): void;
