# Digipet

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a>

> This is part of Academy's [technical curriculum for **The Mark**](https://github.com/WeAreAcademy/curriculum-mark). All parts of that curriculum, including this project, are licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.

We're going to be interpreting and extending a server using TDD.

## Learning Outcomes

- Test HTTP GET requests with supertest
- Distinguish between unit tests and non-unit tests (either integration tests or end-to-end tests)

# Exercise 1: Reading, understanding and documenting

> 🎯 **Success criterion:** a document which outlines how you think this Express server works. You don't have to achieve a theory which explains 100%, but you should strive to explain as much as possible.

1. Clone/fork the repo
2. Take some time to read and digest the code
3. Explore and run the tests
4. Play around with it via Postman
5. Google things that you don't understand
6. Experiment with changing things
7. Produce a narrative document

## Making sense of the structure

### `/digipet` vs `server.ts`

The `/digipet` folder is for all functions that read or update digipet data.

The job of `server.ts` is to set up our server endpoints and dictate server responses (and sometimes calling a function from `/digipet` to make side-effects happen).

### Model vs Controller

Some software architectural patterns distinguish between 'Model' and 'Controller' (a famous pattern is MVC: Model-View-Controller).

We're not formally using MVC (e.g. it's traditionally object-oriented, which this example is not). However, we're repurposing its vocabulary to make an approximate distinction between things in our digipet code:

- _Model_: the code that creates the _levers_ which can be pulled to read/update digipet data (the puppet with strings)
- _Controller_: the functions that pull the digipet model's levers in order to effect changes (the puppeteer pulling strings)

For example: `walkDigipet` is a descriptive controller function which calls the `updateDigipetBounded` model function.

## Making sense of the tests

There are [lots of different types of testing](https://www.atlassian.com/continuous-delivery/software-testing/types-of-software-testing).

In this exercise, we're focusing on two types:

1. Unit tests
2. Non-unit tests
   1. Integration tests
   2. End-to-end (E2E) tests

Whilst there is a distinction between integration and E2E tests, for now, we'll lump them together under 'non-unit tests', and focus on distinguishing between unit and non-unit tests.

Start by reading [this Google blog on unit vs E2E tests](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html).

Once you have read that, we'll consider how types of test manifest in the codebase.

### Testing walking a digipet

Let's look at how we're testing "walking a digipet".

The desired behaviour of walking a digipet is:

1. If we have a digipet, we should be able to walk our digipet through the `/digipet/walk` endpoint
   1. _Data change_: Walking a digipet should increase its happiness by `10` and decrease its nutrition by `5` (to model needing to replenish energy)
      1. Happiness can increase only as far as to `100`
      2. Nutrition can decrease only as far as to `0`
   2. _Server response_: The endpoint should respond with a message indicating that the digipet has been taken for a walk
2. If we don't have a digipet, the `/digipet/walk` endpoint doesn't walk any digipet
   1. _Server response_: The endpoint should respond with a message indicating that it isn't possible to walk a non-existent digipet

Server response and data change are two different jobs, so it is helpful to reason about them and write them as separate bits of functionality.

It also makes sense to therefore test them separately. If the overall 'walking a digipet' behaviour is not working as expected, it's helpful to have focused tests which tell us more precisely which part of it is not working as expected.

We might divide up the tests as follows:

**1. _Data change:_ Does the `walkDigipet` controller function change Digipet stats as expected?**

We could test a `walkDigipet` function that should:

1. Increases the digipet's happiness by `10`, up to ceiling of `100`
2. Decreases the digipet's nutrition by `5`, down to a floor of `0`

This is tested as isolated behaviour in `src/digipet/controller.test.ts`.

> 🧠 Make sure that you can find the relevant test.

This is _unit testing_: tightly focused to a single function behaviour, and not dependent on the behaviour of other functions.

**2. _Server response:_ Does the server's `/digipet/walk` endpoint give back a sensible response?**

We could test a `/digipet/walk` endpoint that should:

1. Sends back an acknowledgement message about walking the digipet when we have one
2. Sends back a helpful message explaining that we can't walk a digipet when we don't have one
3. Delegates actual data change to the `walkDigipet` function

This is tested as isolated behaviour in `src/server.test.ts`.

> 🧠 Make sure that you can find the relevant test.

This is, again, _unit testing_: tightly focused to a single endpoint, and not dependent on the behaviour of other endpoints or functions.

(Importantly: this unit test _does not care at all_ about the implementation or behaviour of `walkDigipet`. It tests that `walkDigipet` gets _called_, but it would be possible for us to entirely change the behaviour of `walkDigipet` and our endpoint unit test would not break.)

**3. Does this come together as expected?**

There are three sets of tests related to this, in three different files:

- `src/server.test.ts` - unit tests for server endpoints
- `src/digipet/controller.test.ts` - unit tests for controller functions
- `src/__tests__/walking.e2e.test.ts` - E2E tests

We're

EXERCISES

- Make training pass - controller first, then server
- Make feeding pass - server first, then controller
- Add tests for ignoring (E2E and unit)
-

## Exercise 6: Commentary and reflection

**Success criterion:** documented reflections.
