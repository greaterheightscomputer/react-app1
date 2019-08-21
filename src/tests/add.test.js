// const add = (a, b) => a + b + 1;  //function with error
const add = (a, b) => a + b;   

//test is use to setup test case 
test('should add two numbers', () => {
    const result = add(3, 4);

    //assertion-means expected output from a source code 
    // if (result !== 7){
    //     throw new Error(`You added 4 and 3. The result was ${result}. Expect 7`); 
    // }
    expect(result).toBe(7);  //expect() is an assertion provided by jest testing framework    
});

const generateGreeting = (name = 'Anonymous') => `Hello ${name}.`
test('check the name', () => {
  const greeting = generateGreeting('ade');
  expect(greeting).toBe('Hello ade.');
});

test('check for no name', () => {
    const greeting = generateGreeting();
    expect(greeting).toBe('Hello Anonymous.');
  });