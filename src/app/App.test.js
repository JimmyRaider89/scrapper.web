import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import App from './App';

import '@testing-library/jest-dom/extend-expect'

const server = setupServer(
  rest.post(`${process.env.REACT_APP_API_URL}/ranking`, (req, res, ctx) => {
    return res(ctx.json({
      positions: [1, 5, 99],
      searchEngine: 1,
      keyWords: 'online title search'
    }));
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders Search title as H1', () => {
  const { getByText } = render(<App />);
  const element = getByText(/Search/i);
  expect(element).toBeInTheDocument();
  expect(element.tagName).toEqual('H1')
});

test('renders Search bar', () => {
  const { getByTestId } = render(<App />);
  const element = getByTestId(/search-bar/i);
  expect(element).toBeInTheDocument();
});

test('renders error message when response is 500', async () => {
  server.use(
    rest.post(`${process.env.REACT_APP_API_URL}/ranking`, (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )
  render(<App />);
  fireEvent.click(screen.getByTestId(/search-submit/i));
  await waitFor(() => screen.getByRole('alert'));
  expect(screen.getByRole('alert')).toHaveTextContent('Oh Snap!! Something serious went wrong. Please try again.');
});

test('renders error message with validation when response is 400', async () => {
  server.use(
    rest.post(`${process.env.REACT_APP_API_URL}/ranking`, (req, res, ctx) => {
      return res(
        ctx.status(400),
        ctx.json({errors: {KeyWords: ['Search criteria is required.' ]}}))
    })
  )
  render(<App />);
  fireEvent.click(screen.getByTestId(/search-submit/i));
  await waitFor(() => screen.getByTestId('result-validation'));

  const element = screen.getByTestId('result-validation');
  expect(element).toHaveTextContent('Unable to search. Please fix the following errors:');

  const ul = screen.getByTestId('unordered-list');
  expect(ul).toHaveTextContent('Search criteria is required.');  
});

test('renders response message when response is 200 and positions > 0', async () => { 
  render(<App />);
  fireEvent.click(screen.getByTestId(/search-submit/i));
  await waitFor(() => screen.getByTestId('result-loaded'));
  const element = screen.getByTestId('result-loaded');
  const ul = screen.getByTestId('unordered-list');
  expect(element).toHaveTextContent('Results for key word search: "online title search" using search engine GOOGLE');
  expect(ul.tagName).toEqual('UL');
});

test('renders response message when response is 200 and positions = 0', async () => { 
  server.use(
    rest.post(`${process.env.REACT_APP_API_URL}/ranking`, (req, res, ctx) => {
      return res(ctx.json({
        positions: [],
        searchEngine: 1,
        keyWords: 'online title search'
      }));
    })
  )
  render(<App />);
  fireEvent.click(screen.getByTestId(/search-submit/i));
  await waitFor(() => screen.getByTestId('result-loaded'));
  const element = screen.getByTestId('result-loaded');
  expect(element).toHaveTextContent('Results for key word search: "online title search" using search engine GOOGLE');
  expect(element).toHaveTextContent('Unfortunately the InfoTrack did not rank with the entered key words.');  
});
