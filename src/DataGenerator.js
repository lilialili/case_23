// DataGenerator.js

import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import Papa from 'papaparse';

const generateTitles = () => {
    const titles = [];
    const ageCertifications = [
        "G", "PG", "PG-13", "R", "NC-17", "U", "U/A", "A", "S", "AL", "6", "9", "12",
        "12A", "15", "18", "18R", "R18", "R21", "M", "MA15+", "R16", "R18+", "X18",
        "T", "E", "E10+", "EC", "C", "CA", "GP", "M/PG", "TV-Y", "TV-Y7", "TV-G",
        "TV-PG", "TV-14", "TV-MA"
    ];

    for (let i = 1; i <= 100; i++) {
        titles.push({
            id: i,
            title: faker.lorem.words(),
            description: faker.lorem.sentence(),
            release_year: faker.date.past().getFullYear(),
            age_certification: faker.helpers.arrayElement(ageCertifications),
            runtime: faker.number.int({ min: 60, max: 180 }),
            genres: faker.music.genre(),
            production_country: faker.location.countryCode(),
            seasons: faker.number.int({ min: 1, max: 10 })
        });
    }
    return titles;
};

const generateCredits = (titles) => {
    const credits = [];
    const roles = ["Director", "Producer", "Screenwriter", "Actor", "Actress",
        "Cinematographer", "Film Editor", "Production Designer",
        "Costume Designer", "Music Composer"];

    titles.forEach(title => {
        for (let i = 1; i <= 10; i++) {
            credits.push({
                id: (title.id - 1) * 10 + i,
                title_id: title.id,
                real_name: faker.person.fullName(),
                character_name: faker.person.fullName(),
                role: faker.helpers.arrayElement(roles)
            });
        }
    });

    return credits;
};

const DataGenerator = () => {
    const [titles, setTitles] = useState([]);
    const [credits, setCredits] = useState([]);

    const handleGenerate = () => {
        const newTitles = generateTitles();
        const newCredits = generateCredits(newTitles);

        setTitles(newTitles);
        setCredits(newCredits);
    };

    const handleDownload = (data, filename) => {
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', filename);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div>
            <button onClick={handleGenerate}>Generate Data</button>
            {titles.length > 0 && (
                <div>
                    <div data-testid="titles-count">{titles.length}</div>
                    <button onClick={() => handleDownload(titles, 'titles.csv')}>Download Titles</button>

                    <div data-testid="credits-count">{credits.length}</div>
                    <button onClick={() => handleDownload(credits, 'credits.csv')}>Download Credits</button>
                </div>
            )}
        </div>
    );
};

export default DataGenerator;
