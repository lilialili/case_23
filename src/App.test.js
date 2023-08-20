import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DataGenerator from './DataGenerator';

describe('DataGenerator', () => {

  it('renders without crashing', () => {
    render(<DataGenerator />);
  });

  it('has a Generate Data button', () => {
    const { getByText } = render(<DataGenerator />);
    expect(getByText('Generate Data')).toBeInTheDocument();
  });

  it('generates data on button click', async () => {
    const { getByText } = render(<DataGenerator />);
    fireEvent.click(getByText('Generate Data'));
    await waitFor(() => expect(getByText('Download Titles')).toBeInTheDocument());
  });

  it('shows download buttons after generating data', () => {
    const { getByText } = render(<DataGenerator />);
    fireEvent.click(getByText('Generate Data'));
    expect(getByText('Download Titles')).toBeInTheDocument();
    expect(getByText('Download Credits')).toBeInTheDocument();
  });

  it('titles and credits have 100 records each after generating data', async () => {
    const { getByText, getByTestId } = render(<DataGenerator />);

    fireEvent.click(getByText('Generate Data'));

    await waitFor(() => {
      expect(getByTestId('titles-count').textContent).toBe('100');
      expect(getByTestId('credits-count').textContent).toBe('1000'); // Since there are 10 credits per title.
    });
  });
});

