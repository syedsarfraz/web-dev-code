// if input is string, pass another argument to whether to validate
// if input is Date not validation needed
function processDate(input: Date): void;
function processDate(input: string, validate: boolean): void;
function processDate() {
    const input = arguments[0]
    const validate = arguments[1]
}

processDate(new Date());
processDate("", true);
processDate("", false);
processDate()


function fn(x: string): void;
function fn() {
  // ...
}

function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}

len(Math.random() > 0.5 ? "hello" : [0]);

