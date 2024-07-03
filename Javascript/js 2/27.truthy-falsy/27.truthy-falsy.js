// truthy 
true
1
2
-1
-2
Infinity
'a'
'abc'
{}
[]

//falsy
false
0
NaN
''
null
undefined

let user ;


if (user != null) {
  console.log('User available')
}

if (user) {
  console.log('2: User available')
}

if (!user) {
  console.log('User not available')
}

function logAndReturn (a) {
  console.log('log',a)
  return a;
}

logAndReturn(0) && logAndReturn(null) && logAndReturn(1) || logAndReturn(3) && logAndReturn(4) && logAndReturn(true) || logAndReturn('')