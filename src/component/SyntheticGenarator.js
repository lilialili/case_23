import React, { useState } from 'react';
import Faker from '@faker-js/faker';


const SyntheticDataButton = () => {
    const [syntheticData, setSyntheticData] = useState(null);

    const generateSyntheticData = () => {
        // Create a new faker instance
        const faker = new Faker();

        // Using the methods directly on the created instance
        const data = {
            name: faker.name(),
            email: faker.email(),
            address: faker.address(),
            companyName: faker.company(),
            // ... add more fields as needed
        };

        setSyntheticData(data);
    };

    return (
        <div>
            <button onClick={generateSyntheticData}>
                Generate Synthetic Data
            </button>

            {syntheticData && (
                <div style={{ marginTop: '20px' }}>
                    <strong>Generated Data:</strong>
                    <pre>{JSON.stringify(syntheticData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};
export default SyntheticDataButton;
