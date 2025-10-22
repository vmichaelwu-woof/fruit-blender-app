'use client'

import { useState, useEffect } from 'react';
import { API_URL } from '../config';

const DetailCard = ({ title, children, className = '' }) => (
  <div className={`fruit-detail-card ${className}`}>
    {title && <h2 className="fruit-detail-section-title">{title}</h2>}
    {children}
  </div>
);

export default function FruitDetailPage({ fruitId }) {
  const [fruit, setFruit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/fruits/${fruitId}`)
      .then(res => res.json())
      .then(data => setFruit(data.fruit))
      .catch(err => console.error('Failed to load fruit:', err))
      .finally(() => setLoading(false));
  }, [fruitId]);

  if (loading) {
    return <div className="loading-container"><p>Loading...</p></div>;
  }

  if (!fruit) {
    return <div className="loading-container"><p>Fruit not found</p></div>;
  }

  const randomFact = fruit.facts[Math.floor(Math.random() * fruit.facts.length)];

  const sections = [
    { title: 'Origin', content: fruit.origin },
    { title: 'Fun Fact', content: `"${randomFact}"`, className: 'italic' },
    { title: 'History', content: fruit.history },
    { title: 'Nutrition', content: fruit.nutrition },
    { title: 'Season', content: fruit.season }
  ];

  return (
    <div className="fruit-detail">
      <DetailCard className="fruit-detail-header">
        <h1 className="fruit-detail-title">{fruit.name}</h1>
        <p className="fruit-detail-price">${fruit.price.toFixed(2)}</p>
      </DetailCard>

      {sections.map(section => (
        <DetailCard key={section.title} title={section.title}>
          <p className={`fruit-detail-text ${section.className || ''}`}>
            {section.content}
          </p>
        </DetailCard>
      ))}

      <DetailCard title="Did You Know?">
        <ul className="fruit-detail-list">
          {fruit.facts.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
      </DetailCard>
    </div>
  );
}
