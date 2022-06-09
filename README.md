# Orange-Hr-E2E
## Goals and limitations of the project
The main goal of the project is to get familiar with manual testing. Moreover my intention was to touch upon the topic of automated testing by writing code for some test cases.<br/>
The tool which I used to write test scenarios is Google Sheets. Google allows sharing work using a simple link 😊. To write automated tests I chose Playwright and TypeScript language.<br/>
The project which was tested is Orange HR Demo - available at https://opensource-demo.orangehrmlive.com. The system supports simple scenarios like logging as well as more complicated cases like handling recruitment processes. In addition Orange HR Demo, as its name suggests, is a demo project, which fits perfectly for developing testing skills purposes.

## Manual Testing
I divided manual tests cases into five test scenarios concerning issues of:
- Logging
- Recruitment process
- Employees Management

I chose those functionalities because IMHO they are most often used.<br/>
I tested almost the whole process of recruitment (adding candidate, recruitment processing - candidate status changing, searching for candidates using various filters, removing candidate). In logging functionality I checked actually all possible cases - authentication using valid credentials and authentication using various permutations of incorrect credentials. Employees management testing relied on verification following features: adding new employee, modifying employee`s personal data, preview job history and deleting workers. <br/>
Generally most cases succeeded 😊. Only one failed. The application returned incorrect result when I searched for candidate by it’s name. Apart from candidates meeting the requirements the system displayed several incorrect records.<br/><br/>
All tests scenarios are available at  <br/>
https://docs.google.com/spreadsheets/d/12kjYPtKwmF8zu8LuNlPmehLliCcbvhQbIz2_czGggqk/edit?usp=sharing

## Automated Testing
I decided to use Playwright to write automated testing. The tool won me over with a community opinions, cross-browser and mobile support and well-maintained documentation. Playwright tests can be written in various languages. We are able to generate initial test code, which speeds up the test automation process and is very helpful - especially for beginners. <br/>
Playwright has really great tutorials including an introduction for a first time user, tips on how to write/modify test code and a clear list of commands. Even a beginner can write some automated tests if wants to study and work hard 😊.<br/><br/>
**Steps I`ve made to automate some tests cases using Playwright**<br/><br/>
At the beginning I created my project “orange-hr-e2e”, by writing following command in the terminal:
```
npm init playwright@latest orange-hr-e2e
```
Thanks to that I created a Playwright tests project template, including example tests in file `tests/example.spec.ts`. In the process of executing the command I was asked among others about project language - I chose Typescript.<br/>
After short review of generated code and options I decided to create my first test using code generation, so I executed a following command:
```
npx playwright codegen https://opensource-demo.orangehrmlive.com/
```
Orange HR Demo webpage opened in the browser. I was performing actions according to the selected test cases (which I previously have written). Playwright was generating code related to my actions.<br/>
This way I received initial code for four test cases devoted to the logging process: 
- using valid credentials
- using incorrect username and correct password 
- using correct username and incorrect password 
- using incorrect username and incorrect password 

Of course the generated code was not perfect - for exemple needed html elements were located by quite poor selectors:
```
 // Click input[name="txtUsername"]
 await page.locator('input[name="txtUsername"]').click();
 // Fill input[name="txtUsername"]
 await page.locator('input[name="txtUsername"]').fill('Admin');
```
Why is it poor? The `name` attribute has not to be unique, so it’s possible that not related directly to the test case changes in the website can affect its result.<br/>
What is better? Wherever possible we should use the `id` attribute, which is unique. So I slightly improved the generated code and used `id` for locating html elements.

In order to run tests I executed a following command in terminal:
```
npx playwright test
```
All tests were green. I was quite happy 😊<br/>
However when I reviewed the code one more time I noticed that big blocks of identical code are repeated. So I decided to separate those fragments into dedicated functions:

```
const logIn = async (page, username, password) => {
  // Fill an input[id="txtUsername"]
  await page.locator('id=txtUsername').fill(username);
  // Fill an input[id="txtPassword"]
  await page.locator('id=txtPassword').fill(password);
  // Fill an input [id="btnLogin"]
  await page.locator('id=btnLogin').click();
}

const logInUsingValidCredentials = async (page) => {    
  await logIn(page, 'Admin', 'admin123');
}

const assertInvalidCredentialsMessage = async (page) => {
  const errorMessageContainer = page.locator('id=spanMessage'); 
  const errorMessage = await errorMessageContainer.innerHTML();
  expect(errorMessage).toBe("Invalid credentials");
}
```
I created those functions in a separate file, so I had to export them:
```
export {
  logIn,  
  logInUsingValidCredentials,
  assertInvalidCredentialsMessage
};

```
In my tests code file I imported necessary functions:
```
import { assertInvalidCredentialsMessage, logIn, logInUsingValidCredentials } from '../login.utils';

```
Once again I ran my tests:
```
npx playwright test
```
Everything worked as I expected - all tests were green 😊
The project I uploaded to Github 😊

## My opinion & Conclusion

**Automated testing is more efficient than manual testing**
1. Time 
Automated testing is less time consuming. Moreover Playwright can run tests in multiple browsers and configurations in the same time
2. Repeatability
Already written tests can be run many times. It`is important in the case of regression testing, because it reduces the time required for testing. Thanks to that it's possible to conduct regression testing more often and improve software quality
3. Reliability
Automated tests perform precisely the same operations each time they are runned - it eliminates inaccuracy of manual testing. Automated testing omits human factor.

**Manual testing**
1. Complicated test cases
Manual testing is still desired because it gives more ability to handle complex and nuanced test scenarios. 
2. False negative
Manual tests are performed by a human, therefore there is a risk of false negatives. 
